/* =========================================================================
   Press Room — real articles straight from named outlets (no Google
   redirects), English and Korean, refreshed daily. Debate-relevant items
   are flagged and sorted first; everything links directly to the outlet.
   Requires app.js (esc, unesc, fmtDate, todayKey, T) loaded first.
   ========================================================================= */

const OUTLETS = [
  { name: 'Soompi',        lang: 'EN', rss: 'https://www.soompi.com/feed',                                            home: 'https://www.soompi.com' },
  { name: 'Koreaboo',      lang: 'EN', rss: 'https://www.koreaboo.com/feed/',                                         home: 'https://www.koreaboo.com' },
  { name: 'NME',           lang: 'EN', rss: 'https://www.nme.com/news/music/feed',                                    home: 'https://www.nme.com' },
  { name: '연합뉴스 (Yonhap)', lang: 'KR', rss: 'https://www.yna.co.kr/rss/entertainment.xml',                            home: 'https://www.yna.co.kr' },
  { name: 'SBS 연예뉴스',     lang: 'KR', rss: 'https://news.sbs.co.kr/news/SectionRssFeed.do?sectionId=14&plink=RSSREADER', home: 'https://news.sbs.co.kr' },
  { name: '한겨레 (Hankyoreh)', lang: 'KR', rss: 'https://www.hani.co.kr/rss/culture/',                                  home: 'https://www.hani.co.kr' },
];

/* Items matching these are flagged "debate-relevant" and sorted first.
   General feeds carry lots of off-topic celebrity news — this is the sieve. */
const TOPIC_WORDS = {
  EN: ['k-pop', 'kpop', 'idol', 'agency', 'contract', 'lawsuit', 'sue', 'court',
       'dispute', 'trainee', 'debut', 'hybe', 'newjeans', 'njz', 'ador', 'jyp',
       'sm entertainment', 'yg entertainment', 'min hee-jin', 'entertainment company',
       'exclusive contract', 'termination', 'injunction', 'fandom', 'comeback'],
  KR: ['케이팝', 'K팝', '아이돌', '소속사', '엔터테인먼트', '전속계약', '계약', '소송',
       '법원', '하이브', '뉴진스', '어도어', '민희진', '연습생', '분쟁', '위약금',
       '데뷔', '팬덤', '기획사', '가처분', 'JYP', 'SM', 'YG'],
};

function topicScore(item, lang) {
  const text = `${item.title} ${item.snippet}`.toLowerCase();
  return TOPIC_WORDS[lang].reduce((n, w) => n + (text.includes(w.toLowerCase()) ? 1 : 0), 0);
}

/* gateway chain for arbitrary feed URLs (press feeds aren't Google News) */
async function fetchOutlet(outlet) {
  const sources = [
    async () => {
      const r = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(outlet.rss)}`, T(12000));
      const d = await r.json();
      if (d.status !== 'ok' || !d.items?.length) throw new Error('rss2json failed');
      return d.items.map(it => ({ title: unesc(it.title), link: it.link, date: it.pubDate, snippet: unesc((it.description || '').replace(/<[^>]*>/g, '')).slice(0, 170) }));
    },
    async () => {
      const r = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(outlet.rss)}`, T(8000));
      const text = (await r.json()).contents;
      if (!text || !text.includes('<rss')) throw new Error('not rss');
      const xml = new DOMParser().parseFromString(text, 'text/xml');
      return [...xml.querySelectorAll('item')].map(it => {
        const get = tag => it.querySelector(tag)?.textContent?.trim() || '';
        return { title: get('title'), link: get('link'), date: get('pubDate'), snippet: get('description').replace(/<[^>]*>/g, '').slice(0, 170) };
      });
    },
  ];
  for (const s of sources) {
    try {
      return (await s()).map(it => ({
        ...it,
        outlet: outlet.name,
        lang: outlet.lang,
        home: outlet.home,
      }));
    } catch { /* next gateway */ }
  }
  return []; // outlet down today — others still render
}

async function loadPress() {
  const key = 'kema-press-' + todayKey();
  try {
    const hit = localStorage.getItem(key);
    if (hit) return JSON.parse(hit);
  } catch { /* re-fetch */ }

  const results = await Promise.all(OUTLETS.map(fetchOutlet));
  const items = results.flat().map(it => ({ ...it, topic: topicScore(it, it.lang) }));
  if (items.length) {
    try {
      Object.keys(localStorage).filter(k => k.startsWith('kema-press-')).forEach(k => localStorage.removeItem(k));
      localStorage.setItem(key, JSON.stringify(items));
    } catch { /* storage full — fine */ }
  }
  return items;
}

/* ---------- rendering ---------- */

function pressCard(item) {
  const date = fmtDate(item.date);
  const cite = esc(`"${item.title}" — ${item.outlet}, ${date || 'n.d.'}. ${item.link}`);
  return `
    <a class="article-card" href="${esc(item.link)}" target="_blank" rel="noopener">
      <div class="meta">
        <span class="badge ${item.lang.toLowerCase()}">${item.lang === 'KR' ? '한국어' : 'English'}</span>
        ${item.topic > 0 ? '<span class="badge topic">Debate-relevant</span>' : ''}
        <span class="src">${esc(item.outlet)}</span>
        ${date ? `<span>${date}</span>` : ''}
        <span class="cite-btn" data-cite="${cite}" title="Copy citation for committee">⧉ cite</span>
      </div>
      <h3>${esc(item.title)}</h3>
      ${item.snippet ? `<p class="snippet">${esc(item.snippet)}</p>` : ''}
    </a>`;
}

let pressItems = [];
let pressFilter = 'ALL';

function renderPress() {
  const list = document.getElementById('press-list');
  if (!list) return;
  let items = pressItems.filter(i => pressFilter === 'ALL' || i.lang === pressFilter);
  items = items.sort((a, b) =>
    (b.topic > 0) - (a.topic > 0) || new Date(b.date) - new Date(a.date));
  list.innerHTML = items.length
    ? items.map(pressCard).join('')
    : `<p class="loader">All outlets unreachable right now — try the ↻ button, or visit them directly:<br><br>
       ${OUTLETS.map(o => `<a href="${o.home}" target="_blank" rel="noopener">${o.name}</a>`).join(' · ')}</p>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('press-list');
  if (!list) return;
  list.innerHTML = '<div class="loader"><div class="spinner"></div>Contacting the press room…</div>';

  document.querySelectorAll('.filters button').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filters button').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      pressFilter = btn.dataset.lang;
      renderPress();
    }));

  const refresh = document.getElementById('btn-refresh-press');
  if (refresh) refresh.addEventListener('click', () => {
    Object.keys(localStorage).filter(k => k.startsWith('kema-press-')).forEach(k => localStorage.removeItem(k));
    location.reload();
  });

  pressItems = await loadPress();
  const chip = document.getElementById('status-chip');
  if (chip) {
    const live = new Set(pressItems.map(i => i.outlet)).size;
    chip.querySelector('.label').textContent =
      pressItems.length ? `${live} of ${OUTLETS.length} outlets live — ${todayKey()}` : 'Outlets unreachable';
    if (!pressItems.length || live < 3) chip.classList.add('warn');
  }
  renderPress();
});
