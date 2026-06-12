/* =========================================================================
   Trends - narrative momentum over time.
   Merges localStorage history (built every day this browser opens the site)
   with data/history.json (built daily by the GitHub Action when deployed),
   then charts coverage tilt, issue movement, and diversity stats.
   Requires app.js loaded first.
   ========================================================================= */

async function loadHistory() {
  let local = [];
  try { local = JSON.parse(localStorage.getItem('kema-history') || '[]'); } catch { /* none */ }
  let remote = [];
  try {
    const r = await fetch('data/history.json', { cache: 'no-store' });
    if (r.ok) remote = await r.json();
  } catch { /* not deployed / offline */ }
  const byDate = {};
  [...remote, ...local].forEach(h => { if (h && h.date) byDate[h.date] = h; });
  return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
}

/* ---------- tilt line chart ---------- */

function tiltChart(hist) {
  const W = 700, H = 240, L = 46, R = 16, TOP = 18, B = 34;
  const pw = W - L - R, ph = H - TOP - B;
  const y = v => TOP + ph - (v / 100) * ph;
  const x = i => hist.length === 1 ? L + pw / 2 : L + (i / (hist.length - 1)) * pw;

  const gridLines = [0, 25, 50, 75, 100].map(v => `
    <line x1="${L}" y1="${y(v)}" x2="${W - R}" y2="${y(v)}" stroke="rgba(255,255,255,${v === 50 ? '.22' : '.07'})" stroke-width="1" ${v === 50 ? 'stroke-dasharray="5 4"' : ''}/>
    <text x="${L - 8}" y="${y(v) + 4}" font-size="10" fill="#9aa0c3" text-anchor="end">${v}%</text>`).join('');

  const pts = hist.map((h, i) => `${x(i)},${y(h.tilt)}`).join(' ');
  const dots = hist.map((h, i) => `
    <circle cx="${x(i)}" cy="${y(h.tilt)}" r="4.5" fill="${h.tilt >= 50 ? '#38bdf8' : '#fb7185'}">
      <title>${h.date}: ${h.tilt}% pro-corporate</title>
    </circle>`).join('');

  // x labels: first, last, and up to 3 in between
  const step = Math.max(1, Math.ceil(hist.length / 5));
  const labels = hist.map((h, i) =>
    (i % step === 0 || i === hist.length - 1)
      ? `<text x="${x(i)}" y="${H - 12}" font-size="10" fill="#9aa0c3" text-anchor="middle">${h.date.slice(5)}</text>`
      : '').join('');

  return `
  <svg class="chart-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img"
       aria-label="Coverage tilt over time, percent pro-corporate per day">
    <text x="${L}" y="12" font-size="10" fill="#38bdf8" font-weight="700">▲ PRO-CORPORATE</text>
    <text x="${W - R}" y="${H - 40}" font-size="10" fill="#fb7185" font-weight="700" text-anchor="end">▼ CREATIVE FREEDOM</text>
    ${gridLines}
    ${hist.length > 1 ? `<polyline points="${pts}" fill="none" stroke="#7c6cff" stroke-width="2.5" stroke-linejoin="round"/>` : ''}
    ${dots}
    ${labels}
  </svg>`;
}

/* ---------- issue movement ---------- */

function issueMovement(hist) {
  const latest = hist[hist.length - 1];
  const prev = hist.length > 1 ? hist[hist.length - 2] : null;
  const rows = ISSUES.map(issue => {
    const now = latest.issues?.[issue.id] || 0;
    const before = prev ? (prev.issues?.[issue.id] || 0) : null;
    let delta = '<span class="delta flat">-</span>';
    if (before !== null) {
      const d = now - before;
      delta = d > 0 ? `<span class="delta up">▲ +${d}</span>`
            : d < 0 ? `<span class="delta down">▼ ${d}</span>`
            : '<span class="delta flat">＝</span>';
    }
    return { issue, now, delta };
  }).filter(r => r.now > 0).sort((a, b) => b.now - a.now);

  const max = rows[0]?.now || 1;
  return rows.map(r => `
    <div class="hbar">
      <span class="lbl">${r.issue.emoji} ${r.issue.label}</span>
      <div class="track"><div class="fill" style="width:${(r.now / max) * 100}%"></div></div>
      <span class="num">${r.now} ${r.delta}</span>
    </div>`).join('')
    + (prev ? '' : '<p class="hint" style="margin-top:10px">Movement arrows appear from your second day of history.</p>');
}

/* ---------- page ---------- */

document.addEventListener('DOMContentLoaded', async () => {
  const chartEl = document.getElementById('tilt-chart');
  if (!chartEl) return;

  // make sure today is recorded before reading history
  const data = await loadArticles();
  renderStatus(data);
  recordHistory(data);

  const hist = await loadHistory();
  if (!hist.length) {
    chartEl.innerHTML = '<p class="loader">No history yet - visit any article page once and come back.</p>';
    return;
  }

  chartEl.innerHTML = tiltChart(hist);
  document.getElementById('issue-movement').innerHTML = issueMovement(hist);

  const latest = hist[hist.length - 1];
  const avg = Math.round(hist.reduce((n, h) => n + h.tilt, 0) / hist.length);
  document.getElementById('trend-stats').innerHTML = `
    <div class="stat"><div class="big">${hist.length}</div><div class="lbl">days on record</div></div>
    <div class="stat"><div class="big">${latest.tilt}%</div><div class="lbl">today's pro-corporate tilt</div></div>
    <div class="stat"><div class="big">${avg}%</div><div class="lbl">average tilt, all days</div></div>
    <div class="stat"><div class="big">${latest.sources || '-'}</div><div class="lbl">distinct sources today</div></div>`;

  const note = document.getElementById('history-note');
  if (note && hist.length === 1) {
    note.innerHTML = `<div class="notice">📈 First snapshot recorded (${latest.date}). The chart grows
      one point per day - open the site daily, or deploy it with the GitHub Action so history builds
      automatically even when nobody visits.</div>`;
  }
});
