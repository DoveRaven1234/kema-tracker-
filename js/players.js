/* =========================================================================
   Players & Stances — clickable dossiers
   Each card expands into: quick facts, a dated case file, "how to use in
   committee" for both sides, and live latest-coverage headlines pulled from
   Google News per player (cached once per day, like the article pages).
   Requires app.js (esc, fetchFeed, fmtDate, todayKey) loaded first.
   ========================================================================= */

const PLAYERS = [
  {
    id: 'hybe', emoji: '🏢', name: 'HYBE', color: 'for',
    badge: 'for', badgeText: 'Pro-corporate',
    blurb: `K-pop's biggest company (BigHit, Pledis, ADOR, KOZ, Source Music + US/Japan/Latin arms).
      Champions the multi-label model as creative freedom <em>within</em> structure — then spent
      2024–25 enforcing the ADOR/NewJeans contracts in court. Argues exclusive contracts protect
      the investment that makes global expansion possible.`,
    facts: ['Founded 2005 (as Big Hit) by Bang Si-hyuk', 'IPO 2020 — biggest in years on KOSPI', 'BTS · SEVENTEEN · TXT · ENHYPEN · LE SSERAFIM', 'Multi-label: ADOR, Pledis, KOZ, Source + global arms'],
    cases: [
      ['2020', 'Record-breaking IPO built on BTS — the investor case for the corporate model in one listing.'],
      ['2021', 'Acquires Ithaca Holdings (Justin Bieber, Ariana Grande management) — exports the model to the US.'],
      ['2024', 'Leaked internal reports mocking other companies’ idols trigger a National Assembly grilling.'],
      ['2024–25', 'ADOR/Min Hee-jin conflict and NewJeans termination attempt; courts uphold the contracts.'],
      ['2025–26', 'Pushes into India and Latin America with localized trainee programs.'],
    ],
    useFor: 'The scale argument: only corporate consolidation produces a company that can take K-pop global and absorb billion-won trainee losses.',
    useAgainst: 'The concentration argument: the NewJeans saga and surveillance-report scandal show what happens when one company holds that much power over artists.',
    query: 'HYBE entertainment k-pop',
  },
  {
    id: 'sm', emoji: '🏢', name: 'SM Entertainment', color: 'for',
    badge: 'for', badgeText: 'Pro-corporate',
    blurb: `Built the modern blueprint under Lee Soo-man: total in-house management of training,
      production, and image ("cultural technology"). Target of the 2009 TVXQ "slave contract"
      lawsuit that produced the 7-year cap. Post-Kakao "SM 3.0" splits artists across internal
      production centers — restructured control, not relinquished control.`,
    facts: ['Founded 1995 by Lee Soo-man', 'Kakao-controlled since 2023', 'TVXQ · Girls’ Generation · EXO · aespa · NCT · RIIZE', 'Inventor of the "cultural technology" manual'],
    cases: [
      ['2009', 'TVXQ trio sue over a 13-year contract — the case that created the KFTC 7-year cap and standard contract.'],
      ['2014', 'EXO’s Kris and Luhan file to nullify contracts; Jessica exits Girls’ Generation.'],
      ['2023', 'Founder Lee Soo-man ousted; HYBE–Kakao takeover war ends with Kakao in control.'],
      ['2023–', '"SM 3.0": artists split across internal production centers — decentralized management, same ownership of the creative process.'],
    ],
    useFor: 'Exhibit A that the system self-corrects: the company that caused the 2009 scandal now operates under the reformed standard it forced into existence.',
    useAgainst: 'Exhibit A that reform is cosmetic: three waves of artist exits (2009, 2014, ongoing) from the same company under the same fundamental model.',
    query: '"SM Entertainment"',
  },
  {
    id: 'jyp', emoji: '🏢', name: 'JYP Entertainment', color: 'for',
    badge: 'for', badgeText: 'Pro-corporate (softer)',
    blurb: `Markets itself as the artist-wellbeing major — founder J.Y. Park talks openly about health,
      values, and long-term careers, and the company has an unusual record of amicable contract
      renewals. Production and concepts remain firmly in-house, and the 2026 VCHA lawsuit in the US
      is testing the gap between image and practice.`,
    facts: ['Founded 1997 by Park Jin-young', 'TWICE · Stray Kids · ITZY · NMIXX · NiziU · VCHA', 'Known for full-group contract renewals', 'Localized groups: Japan (NiziU), US (VCHA)'],
    cases: [
      ['2021', 'GOT7 leaves amicably and keeps its group name — the industry’s rare goodwill breakup.'],
      ['2022–25', 'TWICE and Stray Kids renew as full groups — the corporate side’s favorite proof that artists stay when treated well.'],
      ['2020–23', 'Exports the trainee system itself: NiziU formed in Japan, VCHA formed in the US.'],
      ['2026', 'VCHA’s KG sues JYP USA alleging abuse and mistreatment — the K-pop management model meets American labor norms.'],
    ],
    useFor: 'The benchmark argument: renewals and goodwill exits prove the model can be humane without changing its structure.',
    useAgainst: 'The export argument: the KG lawsuit suggests practices that pass in Seoul may be legally indefensible abroad — a problem as the industry globalizes.',
    query: '"JYP Entertainment"',
  },
  {
    id: 'yg', emoji: '🏢', name: 'YG Entertainment', color: 'for',
    badge: 'for', badgeText: 'Pro-corporate (strict)',
    blurb: `Historically the tightest image manager — long hiatuses, heavy gatekeeping, strict
      public-conduct expectations. Yet BLACKPINK's 2023 renewal (group activities with YG, solo
      careers managed independently) became the industry's most-watched experiment in splitting
      corporate control from individual freedom.`,
    facts: ['Founded 1996 by Yang Hyun-suk', 'BIGBANG · BLACKPINK · TREASURE · BABYMONSTER', 'Reputation: strictest image control of the majors'],
    cases: [
      ['2019', 'Burning Sun scandal: Seungri retires, founder Yang Hyun-suk steps down — governance failure at the top.'],
      ['2023', 'BLACKPINK hybrid renewal: group stays with YG, members’ solo careers go independent.'],
      ['2023–24', 'Lisa (LLOUD) and Jennie (ODD ATELIER) launch their own companies while remaining BLACKPINK members.'],
    ],
    useFor: 'The flexibility argument: the BLACKPINK deal shows corporates can adapt and unbundle control when artists earn leverage.',
    useAgainst: 'The leverage argument: only the single most successful girl group in the world could negotiate that deal — everyone below that tier stays fully controlled.',
    query: '"YG Entertainment"',
  },
  {
    id: 'ador', emoji: '💥', name: 'ADOR & Min Hee-jin', color: 'against',
    badge: 'against', badgeText: 'The flashpoint',
    blurb: `The label that was supposed to prove creative independence can live inside a corporation:
      a creative-director-led HYBE subsidiary with its own identity. Its collapse — boardroom
      ouster, shareholder suits, NewJeans siding with their producer against the parent company —
      became the defining test case of whether "autonomy within the system" is real.`,
    facts: ['Founded 2021 as HYBE’s independent label', 'Min Hee-jin: ex-SM creative director', 'NewJeans — biggest debut of its generation'],
    cases: [
      ['2024 Apr', 'HYBE audits Min Hee-jin alleging a takeover plot; her counter press conference goes viral and splits public opinion.'],
      ['2024 Aug–Nov', 'Min Hee-jin removed as CEO, then exits ADOR entirely.'],
      ['2024 Nov', 'NewJeans declare their contracts terminated and attempt to operate as NJZ.'],
      ['2025', 'Courts grant ADOR injunctions and uphold the contracts; the members’ long-term future stays contested.'],
    ],
    useFor: 'Proof that "independence inside a corporation" fails for governance reasons, not artistic ones — shareholders cannot allow subsidiaries to defect.',
    useAgainst: 'Proof that the industry has no working model for creative autonomy: the one serious attempt was crushed within three years.',
    query: 'ADOR OR "Min Hee-jin" k-pop',
  },
  {
    id: 'kema', emoji: '🏛️', name: 'KEMA (the committee itself)', color: 'gold',
    badge: 'balancer', badgeText: 'Balancer, leans corporate',
    blurb: `The Korea Entertainment Management Association represents management companies — it writes
      industry standards, mediates disputes, and has historically defended contract enforcement
      when artists attempt unilateral exits. Critics call it self-regulation by the regulated;
      defenders say only insiders can set workable standards. Your resolution decides which it becomes.`,
    facts: ['Industry association of management companies', 'Issues standards, mediates disputes', 'The body your committee simulates'],
    cases: [
      ['2023', 'Backs ATTRAKT’s position in the Fifty Fifty dispute, warning against third-party "tampering" with contracted artists.'],
      ['2024–25', 'Sides with contract enforcement in the NewJeans/ADOR conflict, cautioning the industry against engaging artists in unresolved disputes.'],
      ['Ongoing', 'Lobbies on industry legislation and runs dispute-mediation channels its critics say lack teeth against member companies.'],
    ],
    useFor: 'Self-regulation preserves flexibility: KEMA can update standards faster than any legislature and understands the economics.',
    useAgainst: 'Structural conflict of interest: an association funded by management companies cannot neutrally arbitrate artist-versus-company disputes.',
    query: '"Korea Entertainment Management Association"',
  },
  {
    id: 'kftc', emoji: '⚖️', name: 'Korea Fair Trade Commission', color: 'gold',
    badge: 'balancer', badgeText: 'Balancer',
    blurb: `The structural referee. Capped exclusive contracts at 7 years after the TVXQ case, publishes
      standard contract templates, and has repeatedly struck down one-sided clauses. Moves slowly and
      case-by-case — which is exactly why each new dispute still lands in civil court first.`,
    facts: ['National competition regulator', '7-year cap on exclusive contracts (2009)', 'Standard exclusive-contract template (2010, revised since)'],
    cases: [
      ['2009', 'Rules TVXQ’s 13-year contract excessive — establishes the 7-year ceiling.'],
      ['2010', 'Publishes the standard exclusive contract all major agencies nominally adopt.'],
      ['2010s–', 'Periodic crackdowns force agencies to fix unfair clauses: excessive penalty fees, automatic renewals, overbroad image rights.'],
    ],
    useFor: 'The guardrails exist and work — disputes are resolved within a legal framework the KFTC already built, so no new bureaucracy is needed.',
    useAgainst: 'Reactive by design: every fix came after a scandal, years late, and enforcement depends on artists risking their careers to litigate first.',
    query: 'Korea "Fair Trade Commission" entertainment',
  },
  {
    id: 'law', emoji: '🏛️', name: 'Lawmakers & Ministry of Culture', color: 'gold',
    badge: 'balancer', badgeText: 'Balancer, drifting pro-artist',
    blurb: `After Lee Seung-gi revealed he'd never been paid music revenue in 18 years, lawmakers
      pushed payment-transparency duties onto agencies; separate rules now protect minor performers.
      The trend line: each scandal converts voluntary industry norms into statute.`,
    facts: ['Popular Culture & Arts Industry Development Act', 'Payment-transparency duties on agencies', 'Working-hour & education protections for minors'],
    cases: [
      ['2014–', 'Minor-performer protections: limits on working hours, guaranteed education and rest for underage entertainers.'],
      ['2022', 'Lee Seung-gi reveals 18 years of unpaid music revenue from Hook Entertainment — national outrage.'],
      ['2023–', '"Lee Seung-gi law" amendments: agencies must provide artists regular settlement statements and accounting access.'],
    ],
    useFor: 'Evidence that targeted statute fixes specific abuses without dismantling the management model — regulate conduct, not structure.',
    useAgainst: 'Evidence the industry never reforms voluntarily: every artist protection on the books exists because a scandal forced it.',
    query: 'South Korea entertainment law artist rights',
  },
  {
    id: 'selfprod', emoji: '🎤', name: 'Self-producing idols', color: 'against',
    badge: 'against', badgeText: 'Pro-artist (market proof)',
    blurb: `BTS, Stray Kids, SEVENTEEN, (G)I-DLE: acts that write and produce their own music are the
      industry's best-selling exports — the strongest <em>commercial</em> argument that creative
      freedom and profit aren't opposites. Corporates counter that these artists earned autonomy
      through the very system being criticized.`,
    facts: ['BTS: members hold hundreds of writing credits', 'Stray Kids: 3RACHA produce in-house, multiple Billboard 200 #1s', '(G)I-DLE: Soyeon writes/produces the group’s hits', 'SEVENTEEN: Woozi leads production'],
    cases: [
      ['2018–', 'BTS’s self-written catalog drives the biggest export run in K-pop history — Grammy nominations included.'],
      ['2022–', 'Stray Kids land consecutive Billboard 200 #1 debuts with fully in-house production.'],
      ['Ongoing', 'Agencies now market "self-producing" as a concept — creative freedom itself has become a sellable product.'],
    ],
    useFor: 'These acts prove the system works: companies identified the talent, funded it for years, then handed over the pen once it was earned.',
    useAgainst: 'These acts prove control is unnecessary: the best commercial outcomes in the industry happened where creative control was loosened.',
    query: 'k-pop self-produced idol songwriting',
  },
  {
    id: 'disputes', emoji: '🔥', name: 'Artists in dispute', color: 'against',
    badge: 'against', badgeText: 'Pro-artist',
    blurb: `NewJeans, Fifty Fifty, Chuu, Omega X, VCHA's KG: the artists who tested the contracts in
      court. The court scoreboard favors companies; the public-opinion scoreboard increasingly doesn't.`,
    facts: ['NewJeans: injunctions upheld ADOR contracts', 'Fifty Fifty: failed breakaway, three members dropped', 'Chuu: won her case vs Blockberry', 'VCHA’s KG: suing JYP USA (2026)'],
    cases: [
      ['2022–23', 'Chuu is expelled from LOONA, fights Blockberry Creative in court — and wins, including against defamation claims.'],
      ['2021–22', 'Omega X members document mistreatment by their agency on camera; the case becomes a window into small-agency conditions.'],
      ['2023', 'Fifty Fifty seek contract suspension weeks after "Cupid" goes global; the injunction fails and three members are dropped.'],
      ['2024–25', 'NewJeans declare termination; courts side with ADOR. Legally decisive, reputationally radioactive.'],
      ['2026', 'VCHA’s KG files against JYP USA — the first major test of idol contracts under US law. Ongoing.'],
    ],
    useFor: 'The pattern is tampering and bad advice, not oppression: courts examined each case and upheld the contracts almost every time.',
    useAgainst: 'The pattern is desperation: artists at their commercial peak keep choosing career destruction over staying — rational people don’t do that in fair systems.',
    query: 'k-pop idol contract lawsuit dispute',
  },
  {
    id: 'fans', emoji: '📣', name: 'Fan collectives', color: 'against',
    badge: 'against', badgeText: 'Pro-artist (conditionally)',
    blurb: `Truck protests outside agency buildings, advertiser boycotts, coordinated statements — fans
      increasingly act as idols' de-facto labor union. The paradox both sides exploit: the same
      parasocial fan economy that gives fans this leverage is what agencies cite to justify
      controlling idols' private lives in the first place.`,
    facts: ['Truck protests: rented LED trucks outside agency HQs', 'Advertiser pressure campaigns', 'Organized mass statements & funding pools'],
    cases: [
      ['2010s–', 'Truck protests become the standard fan tool for demanding member treatment changes, better management, or apologies.'],
      ['2024–25', 'NewJeans fans (Bunnies) run coordinated campaigns against HYBE — ad trucks, official statements, regulatory complaints.'],
      ['Ongoing', 'Fandoms increasingly fund legal analyses and translate court filings — amateur oversight the industry never had.'],
    ],
    useFor: 'Fan economics justify image management: one scandal collapses revenue for the whole group and its staff, so control protects everyone’s livelihood.',
    useAgainst: 'Fans themselves are rejecting that bargain — the people the control supposedly serves are protesting against it.',
    query: 'k-pop fans protest agency',
  },
];

/* ---------- render ---------- */

function playerCardHTML(p) {
  const border = p.color === 'gold' ? 'var(--gold)' : `var(--${p.color})`;
  return `
  <div class="player-card clickable" id="pc-${p.id}" role="button" tabindex="0" aria-expanded="false"
       style="border-top:3px solid ${border}">
    <div class="row"><h3>${p.emoji} ${p.name}</h3><span class="badge ${p.badge}">${p.badgeText}</span><span class="chev">▾</span></div>
    <p>${p.blurb}</p>
    <div class="player-detail">
      <div class="facts">${p.facts.map(f => `<span class="fact">${f}</span>`).join('')}</div>
      <h4>📁 Case file</h4>
      <ul class="case-list">${p.cases.map(c => `<li><span class="yr">${c[0]}</span> — ${c[1]}</li>`).join('')}</ul>
      <h4>🎯 How to use in committee</h4>
      <div class="positions">
        <div class="pos for"><strong>If you argue pro-corporate</strong>${p.useFor}</div>
        <div class="pos against"><strong>If you argue creative freedom</strong>${p.useAgainst}</div>
      </div>
      <h4>📰 Latest coverage — updated daily</h4>
      <div class="mini-news" data-id="${p.id}" data-q="${esc(p.query)}">
        <div class="loader" style="padding:8px 0"><div class="spinner" style="width:22px;height:22px"></div></div>
      </div>
    </div>
  </div>`;
}

async function loadPlayerNews(slot) {
  if (slot.dataset.done) return;
  slot.dataset.done = '1';
  const { id, q } = slot.dataset;
  const key = `kema-player-${id}-${todayKey()}`;
  const searchLink = `<a href="https://news.google.com/search?q=${encodeURIComponent(q)}" target="_blank" rel="noopener">Open full coverage on Google News →</a>`;

  let items = null;
  try { items = JSON.parse(localStorage.getItem(key)); } catch { /* re-fetch */ }
  if (!items) {
    try {
      items = (await fetchFeed({ q, hint: '' }))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4)
        .map(({ title, source, link, date }) => ({ title, source, link, date }));
      // drop older days' player caches, then save today's
      Object.keys(localStorage)
        .filter(k => k.startsWith('kema-player-') && !k.endsWith(todayKey()))
        .forEach(k => localStorage.removeItem(k));
      localStorage.setItem(key, JSON.stringify(items));
    } catch {
      slot.innerHTML = searchLink;
      return;
    }
  }
  slot.innerHTML = items.length
    ? items.map(n => `<a href="${esc(n.link)}" target="_blank" rel="noopener">${esc(n.title)}
        <span class="mn-meta"> — ${esc(n.source)}${n.date ? ', ' + fmtDate(n.date) : ''}</span></a>`).join('') + searchLink
    : 'No fresh coverage today. ' + searchLink;
}

function togglePlayer(card) {
  const open = card.classList.toggle('open');
  card.setAttribute('aria-expanded', open);
  if (open) loadPlayerNews(card.querySelector('.mini-news'));
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('player-grid');
  if (!grid) return;
  grid.innerHTML = PLAYERS.map(playerCardHTML).join('');
  grid.addEventListener('click', e => {
    if (e.target.closest('a')) return; // let news links navigate
    const card = e.target.closest('.player-card');
    if (card) togglePlayer(card);
  });
  grid.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('player-card')) {
      e.preventDefault();
      togglePlayer(e.target);
    }
  });
});
