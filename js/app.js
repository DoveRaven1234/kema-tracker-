/* =========================================================================
   KEMA Debate Tracker - article engine
   Pulls live K-pop industry news from Google News RSS, classifies each
   article as leaning FOR the corporate model or AGAINST it (pro creative
   freedom), ranks them, and caches the result once per day.
   ========================================================================= */

const TOPIC = {
  perSide: 15, // 15 + 15 = top 30
  feeds: [
    // hint: which side this query is more likely to surface
    { q: 'k-pop idol "exclusive contract" OR "contract dispute" OR lawsuit OR termination',        hint: 'against' },
    { q: 'k-pop artist "creative freedom" OR "creative control" OR "artist rights" OR autonomy',   hint: 'against' },
    { q: 'k-pop industry growth OR revenue OR investment OR "global success"',                     hint: 'for' },
    { q: 'k-pop entertainment company HYBE OR SM OR JYP OR YG strategy OR expansion',              hint: 'for' },
  ],
};

/* Hard relevance gate: an article must actually be about the K-pop industry
   (not just match a search loosely) or it's dropped before classification. */
const CORE_RE = /k[\s-]?pop|idol|hybe|ador|newjeans|njz|\bjyp\b|yg entertainment|sm entertainment|big hit|pledis|starship|cube enter|fnc enter|kakao enter|korean (?:music|entertainment|agency|label)|k-?entertainment/i;
const isCore = item => CORE_RE.test(`${item.title} ${item.snippet || ''}`);

/* Keyword scoring. Title hits count double. This is a heuristic - the About
   page explains that "leaning" labels are automated and approximate. */
/* Scoring is deliberately centered on the study-guide question - creative
   freedom vs. corporate control. Adjacent themes (mental health, dating
   bans) no longer drive classification; they only surface when an article
   also carries core contract/control language. */
const KEYWORDS = {
  against: [
    'exploit', 'slave contract', 'lawsuit', 'sue', 'sued', 'dispute',
    'terminate', 'termination', 'breach', 'unfair', 'underpaid', 'unpaid',
    'debt', 'court', 'injunction', 'tribunal', 'allegation', 'abuse',
    'mistreat', 'creative freedom', 'creative control', 'artistic freedom',
    'artist rights', 'autonomy', 'self-expression', 'independence',
    'restriction', 'controlled', 'leave the label', 'exclusive contract',
    'feud', 'protest', 'fined', 'investigation', 'royalt', 'settlement',
  ],
  for: [
    'growth', 'profit', 'revenue', 'billion', 'million albums',
    'record-breaking', 'record sales', 'success', 'investment', 'expansion',
    'strategy', 'partnership', 'soft power', 'export', 'training system',
    'milestone', 'ipo', 'stock', 'earnings', 'agency announces', 'new label',
    'chart-topping', 'sold out', 'tour gross', 'box office', 'global push',
    'multi-label', 'shareholder', 'market cap', 'subsidiary',
  ],
};

const gnewsUrl = q =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;

/* Free feed gateways die individually all the time, so fetchFeed tries four
   different ones in order, each with its own timeout. */
const T = ms => ({ signal: AbortSignal.timeout(ms) });

/* some gateways return titles with HTML entities still encoded */
function unesc(s) {
  if (!s || !s.includes('&')) return s || '';
  const ta = document.createElement('textarea');
  ta.innerHTML = s;
  return ta.value;
}

/* Google News titles end with " - Source Name" */
function mapItem(rawTitle, fallbackSource, link, date, description, hint) {
  rawTitle = unesc(rawTitle);
  description = unesc(description);
  const m = (rawTitle || '').match(/^(.*) - ([^-]+)$/);
  return {
    title: m ? m[1] : rawTitle,
    source: m ? m[2] : (fallbackSource || 'Google News'),
    link,
    date: date || new Date().toUTCString(),
    snippet: (description || '').replace(/<[^>]*>/g, '').slice(0, 180),
    hint,
  };
}

function parseRssXml(text, hint) {
  if (!text || !text.includes('<rss')) throw new Error('not rss');
  const xml = new DOMParser().parseFromString(text, 'text/xml');
  const items = [...xml.querySelectorAll('item')].map(it => {
    const get = tag => it.querySelector(tag)?.textContent?.trim() || '';
    return mapItem(get('title'), get('source'), get('link'), get('pubDate'), get('description'), hint);
  });
  if (!items.length) throw new Error('empty feed');
  return items;
}

const FEED_SOURCES = [
  // full feed (~100 items) when the proxy is up
  async (q, hint) => {
    const r = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(gnewsUrl(q))}`, T(6000));
    return parseRssXml((await r.json()).contents, hint);
  },
  // dedicated RSS→JSON service, very reliable but caps at ~10 items
  async (q, hint) => {
    const r = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(gnewsUrl(q))}`, T(10000));
    const d = await r.json();
    if (d.status !== 'ok' || !d.items?.length) throw new Error('rss2json failed');
    return d.items.map(it => mapItem(it.title, it.author, it.link, it.pubDate, it.description, hint));
  },
  async (q, hint) => {
    const r = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(gnewsUrl(q))}`, T(8000));
    return parseRssXml(await r.text(), hint);
  },
  async (q, hint) => {
    const r = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(gnewsUrl(q))}`, T(8000));
    return parseRssXml(await r.text(), hint);
  },
];

const todayKey = () => new Date().toISOString().slice(0, 10);
const CACHE_PREFIX = 'kema-articles-';

/* ---------- classification & ranking ---------- */

function scoreText(title, desc) {
  const t = (title || '').toLowerCase();
  const d = (desc || '').toLowerCase();
  const count = (words, txt) =>
    words.reduce((n, w) => n + (txt.includes(w) ? 1 : 0), 0);
  return {
    against: count(KEYWORDS.against, t) * 2 + count(KEYWORDS.against, d),
    for: count(KEYWORDS.for, t) * 2 + count(KEYWORDS.for, d),
  };
}

function classify(item) {
  const s = scoreText(item.title, item.snippet);
  let side, confidence;
  if (s.against > s.for) { side = 'against'; confidence = s.against; }
  else if (s.for > s.against) { side = 'for'; confidence = s.for; }
  else { side = item.hint; confidence = 0; } // tie → trust the query that found it
  return { ...item, side, confidence };
}

function rank(item) {
  const days = Math.max(0, (Date.now() - new Date(item.date).getTime()) / 86400000);
  const recency = Math.max(0, 7 - days); // up to +7 for articles from today
  return item.confidence * 2 + recency;
}

/* ---------- fetching ---------- */

async function fetchFeed(feed) {
  for (const source of FEED_SOURCES) {
    try { return await source(feed.q, feed.hint); }
    catch { /* gateway down - try the next one */ }
  }
  throw new Error('all feed sources failed');
}

function dedupe(items) {
  const seen = new Set();
  return items.filter(it => {
    const key = it.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchLive() {
  const results = await Promise.allSettled(TOPIC.feeds.map(fetchFeed));
  const items = results.flatMap(r => (r.status === 'fulfilled' ? r.value : []));
  if (!items.length) throw new Error('all feeds failed');
  const classified = dedupe(items).filter(isCore).map(classify);
  // confident stance matches first; hint-only ties are fill-in, never above them
  const pick = side =>
    classified
      .filter(i => i.side === side)
      .sort((a, b) => (b.confidence > 0) - (a.confidence > 0) || rank(b) - rank(a))
      .slice(0, TOPIC.perSide);
  return { generatedAt: todayKey(), mode: 'live', for: pick('for'), against: pick('against') };
}

/* Pre-generated file written by the GitHub Action (deployed mode). Only
   trusted when it was generated today, otherwise we fall through to live. */
async function fetchStatic() {
  const res = await fetch('data/articles.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('no static data');
  const data = await res.json();
  if (data.generatedAt !== todayKey()) throw new Error('static data is stale');
  return { ...data, mode: 'static' };
}

function readCache(anyDate = false) {
  try {
    if (!anyDate) {
      const hit = localStorage.getItem(CACHE_PREFIX + todayKey());
      return hit ? JSON.parse(hit) : null;
    }
    // newest cache from any previous day
    const keys = Object.keys(localStorage)
      .filter(k => k.startsWith(CACHE_PREFIX))
      .sort()
      .reverse();
    return keys.length ? JSON.parse(localStorage.getItem(keys[0])) : null;
  } catch { return null; }
}

function writeCache(data) {
  try {
    // keep storage tidy: drop older days
    Object.keys(localStorage)
      .filter(k => k.startsWith(CACHE_PREFIX))
      .forEach(k => localStorage.removeItem(k));
    localStorage.setItem(CACHE_PREFIX + data.generatedAt, JSON.stringify(data));
  } catch { /* storage full or blocked - fine, live fetch still works */ }
}

/* Offline fallback: links go to Google News searches for well-documented
   stories, so they never 404 and always show current coverage. */
const FALLBACK = {
  generatedAt: 'offline',
  mode: 'fallback',
  for: [
    { title: 'K-pop industry exports and global revenue growth', source: 'Google News search', link: 'https://news.google.com/search?q=k-pop%20industry%20revenue%20growth', date: '', snippet: 'Coverage of K-pop as a billion-dollar export industry and its corporate engine.', side: 'for', confidence: 1 },
    { title: 'How the K-pop training system manufactures global stars', source: 'Google News search', link: 'https://news.google.com/search?q=k-pop%20training%20system%20success', date: '', snippet: 'Reporting on the agency trainee model as the foundation of K-pop quality and consistency.', side: 'for', confidence: 1 },
    { title: 'HYBE, SM, JYP, YG: the big four entertainment strategies', source: 'Google News search', link: 'https://news.google.com/search?q=HYBE%20SM%20JYP%20YG%20strategy', date: '', snippet: 'Corporate competition, multi-label structures, and global expansion plans.', side: 'for', confidence: 1 },
  ],
  against: [
    { title: 'K-pop "slave contracts" and the fight for artist rights', source: 'Google News search', link: 'https://news.google.com/search?q=k-pop%20slave%20contract%20artist%20rights', date: '', snippet: 'Long-running coverage of restrictive exclusive contracts in the industry.', side: 'against', confidence: 1 },
    { title: 'NewJeans vs. ADOR/HYBE: the contract dispute that shook K-pop', source: 'Google News search', link: 'https://news.google.com/search?q=NewJeans%20ADOR%20contract%20dispute', date: '', snippet: 'The highest-profile recent battle over artist autonomy and management control.', side: 'against', confidence: 1 },
    { title: 'Creative control in K-pop: who really owns the music?', source: 'Google News search', link: 'https://news.google.com/search?q=k-pop%20creative%20control%20artist', date: '', snippet: 'Coverage of centralized concept and production decisions versus self-producing artists.', side: 'against', confidence: 1 },
  ],
};

/* ---------- orchestration ---------- */

async function loadArticles() {
  const cached = readCache();
  if (cached) return { ...cached, mode: 'cache' };

  try { const s = await fetchStatic(); writeCache(s); return s; } catch { /* next */ }
  try { const l = await fetchLive(); writeCache(l); return l; } catch { /* next */ }

  const stale = readCache(true);
  if (stale) return { ...stale, mode: 'stale' };
  return FALLBACK;
}

/* ---------- daily history (Trends page) ----------
   One snapshot per day: coverage tilt, issue counts, source diversity.
   Local visits build history in localStorage; the GitHub Action builds the
   shared data/history.json. The Trends page merges both. */

function recordHistory(data) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.generatedAt || '')) return; // skip offline fallback
  try {
    const hist = JSON.parse(localStorage.getItem('kema-history') || '[]');
    if (hist.some(h => h.date === data.generatedAt)) return;
    const sum = side => data[side].reduce((n, i) => n + i.confidence, 0) || 1;
    const f = sum('for'), a = sum('against');
    const all = [...data.for, ...data.against];
    const issues = {};
    all.forEach(i => { const id = tagIssue(i).id; issues[id] = (issues[id] || 0) + 1; });
    hist.push({
      date: data.generatedAt,
      tilt: Math.round((f / (f + a)) * 100),
      issues,
      sources: new Set(all.map(i => i.source)).size,
    });
    hist.sort((x, y) => x.date.localeCompare(y.date));
    localStorage.setItem('kema-history', JSON.stringify(hist.slice(-120)));
  } catch { /* storage blocked - trends just won't accumulate */ }
}

/* ---------- issue tagging (Daily Brief) ---------- */

/* Maps each article to one of the Key Issues battlegrounds, with a
   "why this matters in committee" line. Numbers refer to issues.html. */
const ISSUES = [
  { id: 'contracts', label: 'Contracts & Disputes', emoji: '📜',
    words: ['contract', 'lawsuit', 'sue', 'sued', 'dispute', 'termination', 'terminate', 'injunction', 'court', 'tribunal', 'penalty', 'renewal', 'breach'],
    why: 'Goes to the heart of the exclusive-contract and 7-year-rule fight (Issue 1) - the most litigated line in the whole debate.' },
  { id: 'trainee', label: 'Trainee System', emoji: '🎓',
    words: ['trainee', 'training system', 'audition', 'debut', 'debt', 'minor'],
    why: 'Evidence on how the trainee pipeline treats future idols before they have any leverage (Issue 2).' },
  { id: 'creative', label: 'Creative Control', emoji: '🎨',
    words: ['creative', 'self-produc', 'songwrit', 'producer', 'artistic', 'concept', 'freedom'],
    why: 'Directly tests who owns the art - the exact line the KEMA study guide asks delegates to police (Issue 3).' },
  { id: 'private', label: 'Image & Private Life', emoji: '🔒',
    words: ['dating', 'privacy', 'private life', 'image', 'relationship', 'weight'],
    why: 'Supporting context on how far management control reaches (Issue 4) - check your study-guide scope before leading with it.' },
  { id: 'health', label: 'Mental Health', emoji: '🧠',
    words: ['mental health', 'depression', 'burnout', 'anxiety', 'hiatus', 'harassment', 'bullying', 'overwork'],
    why: 'Supporting human-cost context (Issue 5) - adjacent to the core control question; check your study-guide scope.' },
  { id: 'economy', label: 'Industry Economics', emoji: '💰',
    words: ['revenue', 'profit', 'earnings', 'stock', 'ipo', 'billion', 'investment', 'market', 'export', 'growth', 'expansion', 'sales', 'chart', 'tour', 'soft power', 'partnership', 'deal'],
    why: 'Quantifies the economic stakes - the corporate side’s strongest exhibit (Issue 7).' },
  { id: 'regulation', label: 'Regulation & Policy', emoji: '🏛️',
    words: ['regulat', 'law', 'bill', 'ministry', 'government', 'fair trade', 'kftc', 'policy', 'rights', 'union', 'association'],
    why: 'Tracks the policy levers delegates can actually put in a resolution (Issue 8).' },
];

function tagIssue(item) {
  const text = `${item.title} ${item.snippet || ''}`.toLowerCase();
  let best = null, bestHits = 0;
  for (const issue of ISSUES) {
    const hits = issue.words.reduce((n, w) => n + (text.includes(w) ? 1 : 0), 0);
    if (hits > bestHits) { best = issue; bestHits = hits; }
  }
  // nothing matched → sensible default per side
  return best || ISSUES.find(i => i.id === (item.side === 'for' ? 'economy' : 'contracts'));
}

/* ---------- Daily Brief rendering ---------- */

function briefCard(item, index) {
  const issue = tagIssue(item);
  const badge = item.side === 'for'
    ? '<span class="badge for">Pro-corporate lean</span>'
    : '<span class="badge against">Creative-freedom lean</span>';
  const date = fmtDate(item.date);
  return `
    <a class="article-card" href="${esc(item.link)}" target="_blank" rel="noopener">
      <div class="meta">
        <span class="badge rank">Pick #${index + 1}</span>
        ${badge}
        <span class="issue-chip">${issue.emoji} ${issue.label}</span>
        <span class="src">${esc(item.source)}</span>
        ${date ? `<span>${date}</span>` : ''}
        <span class="cite-btn" data-cite="${citeAttr(item)}" title="Copy citation for committee">⧉ cite</span>
      </div>
      <h3>${esc(item.title)}</h3>
      ${usefulSnippet(item) ? `<p class="snippet">${esc(usefulSnippet(item))}</p>` : ''}
      <p class="why"><strong>Why it matters:</strong> ${issue.why}</p>
    </a>`;
}

function renderDaily(data) {
  const all = [...data.for, ...data.against];

  // Coverage tilt - computed from today's actual stance-confidence scores
  const score = side => data[side].reduce((n, i) => n + i.confidence, 0) || 1;
  const f = score('for'), a = score('against');
  const pct = Math.round((f / (f + a)) * 100);
  const gFor = document.getElementById('g-for');
  if (gFor) {
    gFor.style.width = pct + '%';
    document.getElementById('g-against').style.width = (100 - pct) + '%';
    document.getElementById('g-for-label').textContent = `Pro-corporate signal ${pct}%`;
    document.getElementById('g-against-label').textContent = `${100 - pct}% creative-freedom signal`;
  }

  // Which issues dominate today's coverage
  const bars = document.getElementById('issue-bars');
  if (bars) {
    const counts = ISSUES.map(issue => ({
      issue, n: all.filter(i => tagIssue(i).id === issue.id).length,
    })).filter(c => c.n > 0).sort((x, y) => y.n - x.n);
    const max = counts[0]?.n || 1;
    bars.innerHTML = counts.map(c => `
      <div class="hbar">
        <span class="lbl">${c.issue.emoji} ${c.issue.label}</span>
        <div class="track"><div class="fill" style="width:${(c.n / max) * 100}%"></div></div>
        <span class="num">${c.n}</span>
      </div>`).join('');
  }

  const bFor = document.getElementById('brief-for');
  const bAgainst = document.getElementById('brief-against');
  if (bFor) bFor.innerHTML = data.for.slice(0, 5).map(briefCard).join('');
  if (bAgainst) bAgainst.innerHTML = data.against.slice(0, 5).map(briefCard).join('');
}

/* ---------- rendering ---------- */

function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  return isNaN(dt) ? '' : dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* escape feed text before injecting into HTML */
const esc = s => String(s ?? '').replace(/[&<>"']/g,
  c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function citeAttr(item) {
  const date = fmtDate(item.date) || 'n.d.';
  return esc(`"${item.title}" - ${item.source}, ${date}. ${item.link}`);
}

/* Google News descriptions are often just the title again - hide those. */
function usefulSnippet(item) {
  if (!item.snippet) return '';
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return norm(item.snippet).includes(norm(item.title).slice(0, 40)) ? '' : item.snippet;
}

function articleCard(item, index) {
  const badge = item.side === 'for'
    ? '<span class="badge for">Pro-corporate lean</span>'
    : '<span class="badge against">Creative-freedom lean</span>';
  const date = fmtDate(item.date);
  return `
    <a class="article-card" href="${esc(item.link)}" target="_blank" rel="noopener">
      <div class="meta">
        <span class="badge rank">#${index + 1}</span>
        ${badge}
        <span class="src">${esc(item.source)}</span>
        ${date ? `<span>${date}</span>` : ''}
        <span class="cite-btn" data-cite="${citeAttr(item)}" title="Copy citation for committee">⧉ cite</span>
      </div>
      <h3>${esc(item.title)}</h3>
      ${usefulSnippet(item) ? `<p class="snippet">${esc(usefulSnippet(item))}</p>` : ''}
    </a>`;
}

function renderList(el, items) {
  el.innerHTML = items.length
    ? items.map(articleCard).join('')
    : '<p class="loader">No articles matched today - try refreshing.</p>';
}

function renderStatus(data) {
  const chip = document.getElementById('status-chip');
  if (!chip) return;
  const label = {
    live:   `Live - updated ${data.generatedAt}`,
    static: `Updated ${data.generatedAt} (auto-refresh)`,
    cache:  `Updated today (${data.generatedAt})`,
    stale:  `Showing ${data.generatedAt} edition - couldn't reach news feeds`,
    fallback: 'Offline mode - showing curated search links',
  }[data.mode] || data.generatedAt;
  chip.querySelector('.label').textContent = label;
  if (data.mode === 'stale' || data.mode === 'fallback') chip.classList.add('warn');
}

const LOADER = '<div class="loader"><div class="spinner"></div>Compiling today\'s top articles…</div>';

async function initPage() {
  const page = document.body.dataset.page;
  const forEl = document.getElementById('list-for');
  const againstEl = document.getElementById('list-against');
  const briefEls = [document.getElementById('brief-for'), document.getElementById('brief-against')];
  if (!forEl && !againstEl && !briefEls[0] && !briefEls[1]) return; // static page - nothing to load
  [forEl, againstEl, ...briefEls].forEach(el => { if (el) el.innerHTML = LOADER; });

  const data = await loadArticles();
  renderStatus(data);
  recordHistory(data);

  const limit = page === 'home' ? 5 : TOPIC.perSide;
  if (forEl) renderList(forEl, data.for.slice(0, limit));
  if (againstEl) renderList(againstEl, data.against.slice(0, limit));
  if (briefEls[0] || briefEls[1]) renderDaily(data);

  const refresh = document.getElementById('btn-refresh');
  if (refresh) refresh.addEventListener('click', () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith(CACHE_PREFIX))
      .forEach(k => localStorage.removeItem(k));
    location.reload();
  });
}

/* copy-citation chips (delegated; cards are anchors, so suppress navigation) */
function copyText(t) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(t);
  const ta = document.createElement('textarea');
  ta.value = t; document.body.appendChild(ta); ta.select();
  document.execCommand('copy'); ta.remove();
  return Promise.resolve();
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.cite-btn');
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  copyText(btn.dataset.cite).then(() => {
    btn.textContent = '✓ copied';
    btn.classList.add('done');
    setTimeout(() => { btn.textContent = '⧉ cite'; btn.classList.remove('done'); }, 1600);
  });
});

document.addEventListener('DOMContentLoaded', initPage);
