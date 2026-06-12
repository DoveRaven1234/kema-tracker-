/* =========================================================================
   Players & Stances — data + two renderers.
   On stances.html: renders the card grid; each card links to its dossier.
   On player.html:  renders the full 5-section dossier (Stance, Controversies,
   Case Study, Framing, Verdict & Links) for ?id=<player>, including live
   latest-coverage headlines refreshed daily.
   Requires app.js (esc, fetchFeed, fmtDate, todayKey) loaded first.

   NOTE: "Lines you can use" are editorial debate-prep phrasings written for
   this site — they are NOT quotes from the organizations.
   ========================================================================= */

const gsearch = q => `https://news.google.com/search?q=${encodeURIComponent(q)}`;

const PLAYERS = [
  {
    id: 'hybe', emoji: '🏢', name: 'HYBE', color: 'for',
    badge: 'for', badgeText: 'Pro-corporate',
    blurb: `K-pop's biggest company (BigHit, Pledis, ADOR, KOZ, Source Music + US/Japan/Latin arms).
      Champions the multi-label model as creative freedom <em>within</em> structure — then spent
      2024–25 enforcing the ADOR/NewJeans contracts in court.`,
    facts: ['Founded 2005 (as Big Hit) by Bang Si-hyuk', 'IPO 2020 — biggest in years on KOSPI', 'BTS · SEVENTEEN · TXT · ENHYPEN · LE SSERAFIM', 'Multi-label: ADOR, Pledis, KOZ, Source + global arms'],
    query: 'HYBE entertainment k-pop',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> HYBE is the largest entertainment company in K-pop history —
         a holding structure over BigHit Music, Pledis, ADOR, KOZ, Source Music and overseas arms in
         the US, Japan, and Latin America, plus the Weverse platform. It was the industry's biggest
         IPO (2020) and is the only K-pop company whose scale puts it in conversation with Western
         major labels. Whatever HYBE does becomes, by weight alone, industry policy.`,
        `<strong>On creative control.</strong> HYBE's official architecture is "creative independence
         within structure": each label keeps its own producers, identity, and roster, while
         headquarters owns capital allocation, governance, and distribution. The ADOR experiment was
         the showcase of this philosophy — and its collapse demonstrated the fine print: creative
         independence is delegated, revocable, and subordinate to shareholder interest whenever the
         two collide.`,
        `<strong>On contracts and talent.</strong> HYBE treats the exclusive contract as the
         load-bearing wall of the entire business: years of unprofitable trainee investment are only
         rational if the company captures the profitable years that follow. Its renewal record with
         established acts (BTS, SEVENTEEN renewed early and amicably) is genuinely strong — its
         tolerance for unilateral exit is zero, and it litigates exits as existential threats rather
         than personnel matters.`,
        `<strong>In disputes.</strong> The 2024–26 record shows a consistent playbook: audit first,
         remove leadership through board control, enforce contracts through injunctions, and accept
         enormous reputational damage as the cost of preserving precedent. HYBE repeatedly chose the
         legally-winning, publicly-losing move — which tells you it believes the precedent is worth
         more than the public.`,
        `<strong>Trajectory (2026).</strong> Expansion continues outward — India, Latin America,
         US-formed groups, AI ventures — meaning HYBE is exporting not just K-pop but the K-pop
         management model into jurisdictions with stronger labor norms. Simultaneously it faces
         National Assembly scrutiny and regulator attention at home. The company that most benefits
         from the current rules is also the one most likely to trigger their rewriting.`,
      ],
      controversies: [
        { yr: '2024', title: 'Internal monitoring reports', sev: 'high',
          desc: 'Leaked internal documents commenting on other companies’ idols (appearance, private matters) trigger a National Assembly hearing and public apology — fuel for the "idols as assets" critique.' },
        { yr: '2024–25', title: 'ADOR / Min Hee-jin war', sev: 'high',
          desc: 'Audit, ouster, dueling press conferences, shareholder suits. The "creative independence within HYBE" promise collapses in full public view.' },
        { yr: '2024–26', title: 'NewJeans contract enforcement', sev: 'high',
          desc: 'Injunctions block the group from independent activities; ADOR (under HYBE) later terminates Danielle’s contract and pursues a ~₩33bn damages claim. Legally successful, reputationally costly.' },
        { yr: '2024–25', title: 'Founder’s pre-IPO share dealings probed', sev: 'med',
          desc: 'Financial regulators examined Bang Si-hyuk’s pre-IPO arrangements with early investors; HYBE contests wrongdoing. Ongoing — adds a governance question to the corporate-power debate.' },
        { yr: '2023', title: 'SM takeover battle', sev: 'med',
          desc: 'HYBE’s attempt to take over SM (lost to Kakao) raised concentration concerns: one company nearly controlled both of K-pop’s biggest rosters.' },
      ],
      caseStudy: {
        title: 'Case study: the NewJeans war — the multi-label promise on trial',
        intro: `ADOR was created in 2021 as the proof-of-concept: a label inside HYBE led by a creative
          director (Min Hee-jin) with its own identity and roster. NewJeans became the biggest debut of
          its generation. Then the structure was tested.`,
        timeline: [
          ['2024 Apr', 'HYBE audits Min Hee-jin, alleging a plan to take ADOR independent; her press conference splits public opinion.'],
          ['2024 Aug–Nov', 'Min Hee-jin removed as CEO, then exits. NewJeans publicly demand her reinstatement, then declare their contracts terminated.'],
          ['2025', 'Courts grant ADOR injunctions; the members’ attempt to operate as NJZ is blocked. Rulings consistently uphold the contracts.'],
          ['2026', 'ADOR terminates Danielle’s contract over independent activities and sues for ~₩33bn; hearings ongoing.'],
        ],
        outcome: `Legally: a near-total corporate victory — contracts upheld at every stage.
          Reputationally: the most damaging episode in HYBE's history, a global story about
          who owns an artist.`,
        provesFor: 'Courts repeatedly found the contracts valid and the investment-protection logic sound. The system held.',
        provesAgainst: 'The one serious experiment in "autonomy within the corporation" ended in audits and injunctions — suggesting the autonomy was always conditional.',
      },
      relations: {
        stance: `Firmly pro-corporate-control. HYBE is the model's chief institutional defender —
          not out of ideology but exposure: it has more capital invested in exclusive contracts than
          anyone else, so any weakening of contract enforcement costs HYBE the most. Expect it to
          concede artist-welfare process (counseling, transparency) readily, and contract-power
          substance (exit rights, penalty caps) never.`,
        allies: [
          { name: 'KEMA', why: 'The association’s tampering doctrine and contract-enforcement posture protect HYBE’s core interest in every dispute.' },
          { name: 'SM · JYP · YG (the majors)', why: 'Fierce business rivals, doctrinal allies — on contracts, trainee investment, and exit enforcement they vote as a bloc.' },
          { name: 'Institutional investors', why: 'KOSPI shareholders demand contract enforcement; every artist-side concession is a stock-price event (see the 2024–25 volatility).' },
          { name: 'The current legal framework', why: 'Courts applying existing contract law have ruled for HYBE at nearly every step of the NewJeans saga — the status quo is its ally.' },
        ],
        opponents: [
          { name: 'Min Hee-jin & the old ADOR', why: 'The defining internal enemy: the executive whose independence experiment HYBE funded, then dismantled.' },
          { name: 'NewJeans / NJZ & the Bunnies fandom', why: 'The artists who declared its contracts void, and the organized fandom running a permanent pressure campaign.' },
          { name: 'National Assembly scrutiny', why: 'Hearings over the monitoring-report leak and platform power put HYBE first in line for any new legislation.' },
          { name: 'Foreign labor norms', why: 'As HYBE exports the model (US, India, Latin America), it walks into jurisdictions where standard K-pop practices may be unlawful.' },
        ],
      },
      verdict: {
        lean: 8, label: 'Firmly pro-corporate',
        text: `The clearest institutional advocate of corporate control in the industry. Treat its
          successes (global expansion, artist investment) as the FOR side's best evidence, and its
          2024–26 conflicts as the AGAINST side's best evidence — often in the same speech.`,
        links: [
          ['🌐 Official site', 'https://hybecorp.com'],
          ['📖 Wikipedia', 'https://en.wikipedia.org/wiki/Hybe_Corporation'],
          ['📰 Full news coverage', gsearch('HYBE k-pop')],
          ['⚖️ NewJeans dispute coverage', gsearch('NewJeans ADOR HYBE contract dispute')],
        ],
      },
    },
  },

  {
    id: 'sm', emoji: '🏢', name: 'SM Entertainment', color: 'for',
    badge: 'for', badgeText: 'Pro-corporate',
    blurb: `Built the modern blueprint under Lee Soo-man: total in-house management of training,
      production, and image ("cultural technology"). Target of the 2009 TVXQ "slave contract"
      lawsuit that produced the 7-year cap.`,
    facts: ['Founded 1995 by Lee Soo-man', 'Kakao-controlled since 2023', 'TVXQ · Girls’ Generation · EXO · aespa · NCT · RIIZE', 'Inventor of the "cultural technology" manual'],
    query: '"SM Entertainment"',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> SM is the architect: founded 1995 by Lee Soo-man, it invented
         the idol-production pipeline that defines the industry — systematic casting, multi-year
         training, in-house songwriting camps, total concept design, organized fandom management.
         Every company in this debate, including HYBE, runs on machinery SM built first. Since 2023
         it has been controlled by Kakao after the industry's wildest takeover battle.`,
        `<strong>On creative control.</strong> Lee Soo-man's "cultural technology" doctrine codified
         creative decisions into a corporate manual — famously detailed down to choreography angles
         and concept rollouts. The artist, in this philosophy, is one input into a repeatable
         star-manufacturing process. "SM 3.0" (post-Kakao) decentralizes execution into multiple
         in-house production centers, but ownership of the creative process never leaves the company.`,
        `<strong>On contracts and talent.</strong> SM operates under the reformed standard its own
         scandal created: the 2009 TVXQ lawsuit produced the KFTC's 7-year cap and template contract.
         Its rosters are the industry's longest-running (TVXQ, Girls' Generation, EXO, NCT's
         open-member experiment), which it cites as proof of stability; its critics cite the same
         longevity as proof exit is functionally impossible.`,
        `<strong>In disputes.</strong> Three waves of artist conflict — TVXQ/JYJ (2009), EXO's Kris,
         Luhan and Tao plus Jessica (2014–15), and periodic fan-led revolts since — taught SM to
         settle quietly and avoid courtroom spectacle. The alleged informal blacklisting of JYJ after
         their legal win remains the industry's defining cautionary tale about the price of winning.`,
        `<strong>Trajectory (2026).</strong> The founder is gone (ousted amid the Kakao takeover and
         his own royalty-contract controversy), yet the model runs on without him — the strongest
         evidence that the control architecture is institutional, not personal. SM now answers to a
         platform conglomerate (Kakao) with its own regulatory baggage, adding a second layer of
         corporate interest above the artists.`,
      ],
      controversies: [
        { yr: '2009', title: 'TVXQ "slave contract" lawsuit', sev: 'high',
          desc: 'Three members sue over a 13-year contract with punishing terms. The fallout produces the KFTC’s 7-year cap and standard contract — the legal foundation of the entire modern debate.' },
        { yr: '2014', title: 'EXO exits & Jessica’s removal', sev: 'med',
          desc: 'Kris and Luhan file to nullify their contracts citing health and unequal treatment; Jessica exits Girls’ Generation. Proof the 2009 reforms didn’t end the conflict.' },
        { yr: '2023', title: 'Founder ousted; HYBE–Kakao takeover war', sev: 'med',
          desc: 'Lee Soo-man’s side deals (Like Planning royalties) exposed; a hostile takeover battle ends with Kakao in control. Governance, not artistry, decided who runs the creative process.' },
      ],
      caseStudy: {
        title: 'Case study: TVXQ 2009 — the case that built the rulebook',
        intro: `Three members of K-pop's then-biggest group sued SM over a 13-year exclusive contract with
          income splits and penalty clauses they argued made exit impossible. It became the founding
          case of K-pop contract law.`,
        timeline: [
          ['2009', 'Members file for contract injunction; court partially sides with them, calling terms excessively long and one-sided.'],
          ['2009–10', 'KFTC responds: 7-year ceiling on exclusive contracts and a standard contract template all majors nominally adopt.'],
          ['2012', 'Settlement; the trio continue as JYJ but face years of alleged broadcast blacklisting — the unwritten cost of winning.'],
        ],
        outcome: `Artists won the legal principle, the industry adapted around it: contracts shortened,
          but training-cost recoupment, renewal pressure, and informal blacklisting preserved most of
          the leverage. The pattern — scandal → narrow reform → adaptation — repeats ever since.`,
        provesFor: 'The system self-corrects: the worst abuses were outlawed fifteen years ago, and the industry kept thriving under the reformed rules.',
        provesAgainst: 'Winning in court cost JYJ their broadcast careers. The formal rules changed; the power structure that punishes exit did not.',
      },
      relations: {
        stance: `Pro-corporate-control — the historical architect. SM's institutional identity IS the
          production system, so it cannot concede that centralized creative control is the problem
          without conceding itself. Expect process modernization ("3.0", artist "individuality"
          marketing) and zero structural concession on who owns the creative pipeline.`,
        allies: [
          { name: 'Kakao', why: 'Its controlling shareholder — a platform giant whose content strategy depends on SM’s pipeline running exactly as designed.' },
          { name: 'KEMA & the majors', why: 'SM practices became the industry standards KEMA codifies; on contract doctrine the majors defend SM precedents as their own.' },
          { name: 'The trainee pipeline’s beneficiaries', why: 'Generations of successful SM artists and producers whose careers validate the system — the company’s living evidence.' },
        ],
        opponents: [
          { name: 'Its own alumni', why: 'JYJ, Kris/Luhan/Tao, Jessica — the industry’s longest list of artists who fought the same company over the same structural terms.' },
          { name: 'KFTC', why: 'The regulator’s signature rules (7-year cap, standard contract) were written specifically against SM-era practices, and it keeps watching.' },
          { name: 'Lee Soo-man’s shadow', why: 'The ousted founder’s royalty deals and exit fights turned SM’s own governance into a public exhibit of corporate self-dealing.' },
        ],
      },
      verdict: {
        lean: 15, label: 'Pro-corporate (the architect)',
        text: `The company that built the model everyone else copied. Its history is the debate's
          timeline: cite SM for origins, precedents, and the gap between reform announcements and
          structural change.`,
        links: [
          ['🌐 Official site', 'https://www.smentertainment.com'],
          ['📖 Wikipedia', 'https://en.wikipedia.org/wiki/SM_Entertainment'],
          ['📰 Full news coverage', gsearch('"SM Entertainment"')],
          ['⚖️ TVXQ case background', gsearch('TVXQ SM lawsuit slave contract 2009')],
        ],
      },
    },
  },

  {
    id: 'jyp', emoji: '🏢', name: 'JYP Entertainment', color: 'for',
    badge: 'for', badgeText: 'Pro-corporate (softer)',
    blurb: `Markets itself as the artist-wellbeing major — amicable full-group renewals (TWICE,
      Stray Kids), founder talk of health and values. Production stays firmly in-house, and the
      2026 VCHA lawsuit in the US is testing the gap between image and practice.`,
    facts: ['Founded 1997 by Park Jin-young', 'TWICE · Stray Kids · ITZY · NMIXX · NiziU · VCHA', 'Known for full-group contract renewals', 'Localized groups: Japan (NiziU), US (VCHA)'],
    query: '"JYP Entertainment"',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> Founded 1997 by Park Jin-young — the only major whose founder
         is himself a still-active performing artist and producer. Home to TWICE, Stray Kids, ITZY,
         NMIXX, and the localization experiments NiziU (Japan) and VCHA (US). JYP brands itself as
         the values-driven major: "artist first," health over schedules, longevity over peaks.`,
        `<strong>On creative control.</strong> Production and concept authority remain centralized —
         Park Jin-young personally shaped the company's sound for decades — but JYP runs the
         industry's most visible internal exception: Stray Kids debuted *because* its members
         (3RACHA) produce their own music. The company's revealed position: creative input is a
         feature it grants when it sells, not a right it recognizes.`,
        `<strong>On contracts and talent.</strong> The renewal record is the best in the industry —
         TWICE and Stray Kids re-signed as full groups, and GOT7's 2021 exit was amicable enough that
         the members kept using the group name. At the same time, JYP is the major that most openly
         admits private-life policy: a stated 3-year dating ban for new artists, framed as protecting
         both the group and the artist's development.`,
        `<strong>In disputes.</strong> JYP historically avoids public contract wars — until VCHA.
         Facing KG's 2026 abuse and mistreatment allegations in a US court, the company responded
         with firm public denial and legal defense, showing that under its softer brand sits the
         same enforcement instinct as its peers when the model itself is challenged.`,
        `<strong>Trajectory (2026).</strong> JYP's strategic bet is exporting the system itself —
         build local idols with K-pop methodology in Japan, the US, and beyond. That makes the KG
         case existential beyond its size: if the methodology is found abusive under US law, the
         export strategy, not just one group, is what's on trial.`,
      ],
      controversies: [
        { yr: '2026', title: 'VCHA’s KG sues JYP USA', sev: 'high',
          desc: 'A member of JYP’s US-formed group files to terminate her contract alleging abuse and mistreatment — the first major test of the K-pop management model under American labor norms. Ongoing; JYP disputes the allegations.' },
        { yr: 'policy', title: 'Openly acknowledged dating ban', sev: 'med',
          desc: 'JYP has publicly described a 3-year no-dating rule for new artists — the industry’s most candid admission that private-life control is policy, not accident.' },
        { yr: '2010s', title: 'Trainee regime strictness', sev: 'low',
          desc: 'Former trainees and idols describe weight monitoring and intense evaluation culture — standard across the industry, but at odds with the wellbeing brand.' },
      ],
      caseStudy: {
        title: 'Case study: VCHA — the model meets US labor law',
        intro: `VCHA was JYP's attempt to run the full K-pop pipeline on American soil: global auditions,
          a formed-in-public group, debut under JYP USA. In 2026, member KG sued to terminate her
          contract alleging abuse and mistreatment.`,
        timeline: [
          ['2023', 'VCHA formed through the A2K (America2Korea) audition project with Republic Records.'],
          ['2024', 'Debut and promotion under JYP USA; members are mostly minors at formation.'],
          ['2026', 'KG files suit alleging abuse and mistreatment, seeking contract termination; JYP USA publicly disputes the claims. Ongoing.'],
        ],
        outcome: `Undecided — which is exactly why it matters. A US court will effectively rule on
          whether standard K-pop management practices survive a legal system with stronger labor
          protections and minors’ rights.`,
        provesFor: 'One lawsuit among hundreds of artists; if the claims fail in the artist-friendliest legal environment, the model is vindicated.',
        provesAgainst: 'The company with the best reputation in the industry is the one being tested — if even JYP’s export can’t pass US standards, the problem is the model, not the operator.',
      },
      relations: {
        stance: `Pro-corporate-control, softest edge. JYP genuinely invests in artist relations and
          can point to the receipts — but its position in the debate is unambiguous: the company,
          not the artist, decides how much freedom is healthy. It is the corporate bloc's best
          character witness and will defend the model's structure while volunteering welfare reforms.`,
        allies: [
          { name: 'KEMA & the majors', why: 'Full alignment on contract doctrine; JYP’s clean reputation makes it the bloc’s preferred public face.' },
          { name: 'Republic Records & Sony Music', why: 'Western partners (VCHA, NiziU) whose distribution power depends on JYP’s production system delivering.' },
          { name: 'Its renewed artists', why: 'TWICE, Stray Kids, and GOT7 alumni function as voluntary testimonials that staying (or leaving amicably) works.' },
        ],
        opponents: [
          { name: 'VCHA’s KG and US plaintiffs’ counsel', why: 'The lawsuit attacks not JYP’s conduct alone but the legality of the exported trainee-management model itself.' },
          { name: 'US labor norms', why: 'Minor-performer and employment law in the US does not recognize the Seoul-standard contract logic JYP built VCHA on.' },
          { name: 'Private-life-control critics', why: 'JYP’s openly admitted dating ban makes it the citable example for everyone arguing image control is policy, not accident.' },
        ],
      },
      verdict: {
        lean: 30, label: 'Pro-corporate, softest edge',
        text: `Genuinely better artist relations than its peers, inside an unchanged control structure.
          The most useful player for testing whether the debate is about conduct or about architecture.`,
        links: [
          ['🌐 Official site', 'https://www.jype.com'],
          ['📖 Wikipedia', 'https://en.wikipedia.org/wiki/JYP_Entertainment'],
          ['📰 Full news coverage', gsearch('"JYP Entertainment"')],
          ['⚖️ VCHA lawsuit coverage', gsearch('VCHA KG JYP lawsuit')],
        ],
      },
    },
  },

  {
    id: 'yg', emoji: '🏢', name: 'YG Entertainment', color: 'for',
    badge: 'for', badgeText: 'Pro-corporate (strict)',
    blurb: `Historically the tightest image manager — long hiatuses, heavy gatekeeping, strict
      conduct expectations. Yet BLACKPINK's 2023 hybrid renewal became the industry's most-watched
      experiment in splitting corporate control from individual freedom.`,
    facts: ['Founded 1996 by Yang Hyun-suk', 'BIGBANG · BLACKPINK · TREASURE · BABYMONSTER', 'Reputation: strictest image control of the majors'],
    query: '"YG Entertainment"',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> Founded 1996 by Yang Hyun-suk out of Seo Taiji and Boys'
         legacy — the major with a hip-hop "crew" identity and the industry's most curated release
         strategy. Home historically to BIGBANG, 2NE1, and BLACKPINK; currently rebuilding around
         TREASURE and BABYMONSTER after a bruising half-decade.`,
        `<strong>On creative control.</strong> YG's control style is aesthetic and temporal rather
         than micromanagerial: a strong house sound (long anchored by producer Teddy), heavy brand
         gatekeeping, and total control of *when* artists work — the years-long gaps fans call "the
         dungeon." Top-tier artists get real creative input (G-Dragon's auteur status was a selling
         point); everyone below that tier waits.`,
        `<strong>On contracts and talent.</strong> Strict conduct expectations and image discipline
         were the YG brand long before the industry standardized them. Then came the 2023 BLACKPINK
         renewal: group activities under YG, each member's solo career managed by her own company.
         It is the single most important voluntary unbundling of corporate control in K-pop history —
         and YG signed it because the alternative was losing everything.`,
        `<strong>In disputes.</strong> YG's crises have been governance, not contract, disputes: the
         2019 Burning Sun scandal took down Seungri and forced the founder's resignation, followed by
         years of legal proceedings around him. Artist conflicts, by contrast, get handled through
         silence and shelving rather than courtrooms — control exercised by calendar.`,
        `<strong>Trajectory (2026).</strong> The BLACKPINK hybrid is now the precedent every
         negotiating superstar cites, making YG the accidental author of the industry's most
         artist-favorable template. Whether the company repeats it for TREASURE or BABYMONSTER —
         artists without world-historical leverage — is the live test of whether 2023 was evolution
         or a one-time ransom.`,
      ],
      controversies: [
        { yr: '2019', title: 'Burning Sun scandal', sev: 'high',
          desc: 'Seungri retires amid the club scandal; founder Yang Hyun-suk steps down as related allegations pile up. The industry’s biggest governance failure — corporate control failed at controlling the corporation itself.' },
        { yr: '2019–23', title: 'Founder’s legal saga', sev: 'med',
          desc: 'Yang Hyun-suk faces years of proceedings over alleged witness intimidation connected to a trainee’s drug case (initially acquitted, partly overturned on appeal with a suspended sentence). A long shadow over the company’s leadership.' },
        { yr: 'ongoing', title: 'The "YG dungeon" reputation', sev: 'low',
          desc: 'Fan shorthand for years-long gaps between releases — the artist-side complaint that control includes the right to shelve careers.' },
      ],
      caseStudy: {
        title: 'Case study: the BLACKPINK deal — control, unbundled',
        intro: `In 2023, the world's biggest girl group renewed with YG for group activities only, with
          each member's solo career managed outside the company. No major K-pop contract had ever
          split the bundle this way.`,
        timeline: [
          ['2023', 'After prolonged negotiation, YG announces the group-only renewal; its stock swings violently on every rumor in between.'],
          ['2023–24', 'Lisa launches LLOUD, Jennie launches ODD ATELIER; solo music releases route through non-YG channels.'],
          ['2025–', 'Group activities (tour, comeback) proceed under YG — the hybrid holds.'],
        ],
        outcome: `A working precedent: corporate structure for the collective product, individual freedom
          for personal careers. Both sides of the debate now cite it constantly.`,
        provesFor: 'The market solves this without regulation: when artists earn enough leverage, companies adapt voluntarily.',
        provesAgainst: 'Only the single most successful girl group on Earth could buy this freedom — leverage-based liberty is privilege, not policy.',
      },
      relations: {
        stance: `Pro-corporate-control, strictest legacy — with one historic concession. YG defends
          the model as firmly as any major, but having signed the BLACKPINK unbundling, it cannot
          argue total control is non-negotiable. Its real position: control is the default, and
          freedom is something a superstar may purchase at market price.`,
        allies: [
          { name: 'KEMA & the majors', why: 'Standard alignment on contracts and enforcement; YG’s scarcity discipline is the control model in its purest form.' },
          { name: 'BLACKPINK members (negotiated)', why: 'Former leverage opponents converted into structural partners — the hybrid deal binds both sides’ incentives to keep the group alive.' },
          { name: 'The Black Label', why: 'The Teddy-led affiliated label extends YG’s sound and interests while operating with the autonomy YG’s own artists historically lacked.' },
        ],
        opponents: [
          { name: 'Regulators & prosecutors (post-2019)', why: 'Burning Sun made YG the permanent example of entertainment-industry governance failure; scrutiny never fully left.' },
          { name: 'Fans of shelved artists', why: 'The "dungeon" grievance — organized fandoms protesting years of inactivity are protesting control exercised by calendar.' },
          { name: 'Every renegotiating superstar', why: 'The BLACKPINK precedent is now cited against YG itself by any top-tier artist whose renewal comes due.' },
        ],
      },
      verdict: {
        lean: 20, label: 'Pro-corporate, strictest legacy',
        text: `The strictest of the majors by reputation — and, paradoxically, the author of the
          industry's most artist-friendly precedent. Essential for arguments about whether market
          leverage can substitute for regulation.`,
        links: [
          ['🌐 Official site', 'https://www.ygfamily.com'],
          ['📖 Wikipedia', 'https://en.wikipedia.org/wiki/YG_Entertainment'],
          ['📰 Full news coverage', gsearch('"YG Entertainment"')],
          ['⚖️ BLACKPINK renewal coverage', gsearch('BLACKPINK YG contract renewal 2023')],
        ],
      },
    },
  },

  {
    id: 'ador', emoji: '💥', name: 'ADOR & Min Hee-jin', color: 'against',
    badge: 'against', badgeText: 'The flashpoint',
    blurb: `The label that was supposed to prove creative independence can live inside a corporation.
      Its collapse — boardroom ouster, dueling lawsuits, NewJeans siding with their producer against
      the parent company — became the defining test case of whether "autonomy within the system" is real.`,
    facts: ['Founded 2021 as HYBE’s independent label', 'Min Hee-jin: ex-SM creative director', 'NewJeans — biggest debut of its generation'],
    query: 'ADOR OR "Min Hee-jin" k-pop',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> ADOR ("All Doors One Room") was founded in 2021 as a HYBE
         subsidiary built around one person: Min Hee-jin, the former SM creative director who shaped
         the visual identity of K-pop's golden era. Its only group, NewJeans, became the biggest
         debut of its generation. ADOR was explicitly pitched as the answer to this debate —
         creative independence, funded by a corporation.`,
        `<strong>On creative control.</strong> Min Hee-jin's philosophy was auteur-led and
         artist-centered: a single creative vision over committee A&R, "natural" concepts as a rebuke
         of the K-pop template, and unusually close producer-artist bonds. NewJeans' success was
         immediately read as market proof that loosening the formula outperforms it — which made the
         experiment threatening as well as profitable.`,
        `<strong>On contracts and equity.</strong> The structural innovation — and the fuse — was
         that creative independence was supposed to be formalized in governance: Min Hee-jin held an
         ADOR equity stake with a put option, and her side claims the shareholder agreement promised
         operational autonomy. The fight that followed was, at bottom, about whether autonomy written
         into a corporate document means anything when the parent controls the board.`,
        `<strong>In disputes.</strong> The 2024–26 war ran through every venue at once: a HYBE audit
         and takeover allegations, a viral press conference, her removal and exit, NewJeans declaring
         their contracts terminated, injunctions enforcing them, Danielle's termination and the ~₩33bn
         claim, and prosecutors declining her criminal complaint against HYBE in 2026. Both sides
         escalated publicly at every step — by design.`,
        `<strong>Trajectory (2026).</strong> ADOR-the-label continues under HYBE management; ADOR-the-
         experiment is dead, and the name now means the dispute. Min Hee-jin's next move is the most
         watched free-agency question in the industry: an independent label by the era's most proven
         creative director would re-run the experiment outside corporate walls — the version the
         debate never got to see.`,
      ],
      controversies: [
        { yr: '2024 Apr', title: 'Audit and viral press conference', sev: 'high',
          desc: 'HYBE alleges a takeover plot; Min Hee-jin’s emotional, profanity-laced press conference becomes a cultural event and splits public opinion along exactly the lines of this debate.' },
        { yr: '2024', title: '"Shamanic management" allegations', sev: 'med',
          desc: 'HYBE alleges business decisions were influenced by a shaman adviser; her side calls it character assassination. Emblematic of how personal the corporate conflict became.' },
        { yr: '2024 Nov', title: 'NewJeans declare termination', sev: 'high',
          desc: 'The group publicly sides with their ousted producer and declares their contracts void — the most dramatic artist revolt in modern K-pop.' },
        { yr: '2025–26', title: 'Injunctions, terminations, ₩33bn suit', sev: 'high',
          desc: 'Courts uphold the contracts; ADOR (post-Min) terminates Danielle’s deal over independent activities and sues for ~₩33bn. In 2026, prosecutors also declined to pursue Min Hee-jin’s criminal complaint against HYBE.' },
      ],
      caseStudy: {
        title: 'Case study: three years from experiment to cautionary tale',
        intro: `No single entity packs more of this debate into less time. ADOR is simultaneously the
          best evidence that creative autonomy produces commercial results, and the best evidence
          that corporate structures cannot tolerate it.`,
        timeline: [
          ['2021', 'HYBE creates ADOR as an "independent" label under Min Hee-jin.'],
          ['2022–23', 'NewJeans debut and become a generational phenomenon with a distinct, auteur-driven identity.'],
          ['2024', 'Audit → press war → CEO removal → her full exit → NewJeans’ termination declaration.'],
          ['2025–26', 'Injunctions enforce the contracts; member departures and damages claims follow; criminal complaints fizzle.'],
        ],
        outcome: `The experiment is dead; the precedent is alive. Every future "creative independence"
          promise inside a K-pop conglomerate will be measured against ADOR.`,
        provesFor: 'Governance reality: shareholders cannot allow subsidiaries to defect, and courts agreed at every step. Independence was never the deal — investment was.',
        provesAgainst: 'The industry’s one serious attempt at internal creative autonomy was dismantled within three years of succeeding. The system cannot host what the debate asks of it.',
      },
      relations: {
        stance: `Pro-creative-freedom — by position, if not by purity. Min Hee-jin's fight mixed
          genuine creative-autonomy principle with an equity-and-power dispute, but functionally the
          old ADOR stands as the era's creative-freedom standard-bearer: it is the only case where
          autonomy was promised in writing, demonstrated commercially, and then revoked.`,
        allies: [
          { name: 'NewJeans / NJZ', why: 'The artists chose her over the corporation at catastrophic personal cost — the alliance that defines both parties.' },
          { name: 'The Bunnies fandom', why: 'Ran (and runs) the sustained public-pressure campaign keeping the dispute alive after the courts closed it.' },
          { name: 'Creative-industry sympathizers', why: 'Producers, directors, and commentators who read the saga as every creative’s fight with every holding company.' },
        ],
        opponents: [
          { name: 'HYBE & Bang Si-hyuk', why: 'The funder, auditor, and ultimate dismantler of the experiment — and the winner of nearly every court round.' },
          { name: 'Current ADOR management', why: 'The post-Min label enforcing the contracts, terminating Danielle’s deal, and pursuing the ₩33bn claim.' },
          { name: 'KEMA’s tampering doctrine', why: 'Industry norms that froze the members’ market options during the dispute operate squarely against the artists’ side.' },
          { name: 'The court record', why: 'Injunctions, upheld contracts, and a declined criminal complaint — the legal system has consistently read the saga HYBE’s way.' },
        ],
      },
      verdict: {
        lean: 78, label: 'Creative-freedom symbol (contested)',
        text: `Not a clean hero — the leadership fight was also a money-and-power fight — but
          functionally the creative-freedom side's defining case. Cite the artists' behavior, not the
          executives', and the argument stays clean.`,
        links: [
          ['🌐 Official site', 'https://ador.world'],
          ['📖 Wikipedia', 'https://en.wikipedia.org/wiki/ADOR'],
          ['📰 Full news coverage', gsearch('ADOR "Min Hee-jin"')],
          ['⚖️ NewJeans case coverage', gsearch('NewJeans NJZ contract court')],
        ],
      },
    },
  },

  {
    id: 'kema', emoji: '🏛️', name: 'KEMA (the committee itself)', color: 'gold',
    badge: 'balancer', badgeText: 'Balancer, leans corporate',
    blurb: `The Korea Entertainment Management Association represents management companies — it writes
      industry standards, mediates disputes, and has historically defended contract enforcement when
      artists attempt unilateral exits. Your resolution decides what it becomes.`,
    facts: ['Industry association of management companies', 'Issues standards, mediates disputes', 'The body your committee simulates'],
    query: '"Korea Entertainment Management Association"',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> The Korea Entertainment Management Association is the trade
         body of the management industry: its members are the agencies, its dues come from them, and
         its officers come from their executive ranks. It writes industry standards, runs mediation
         channels, certifies managers, and speaks publicly for the management side in every major
         dispute. It is also the body your committee simulates.`,
        `<strong>On creative control.</strong> KEMA takes no formal position on who should own the
         art — and that silence is a position. Its standards govern contracts, payments, and conduct;
         creative decision rights appear nowhere in them, which leaves the default (the company
         decides) untouched. An association that standardizes everything except creative authority
         has effectively standardized creative authority.`,
        `<strong>On contracts.</strong> KEMA's core doctrine is contract sanctity plus anti-tampering:
         exclusive contracts must be honored until formally resolved, and third parties who engage a
         disputing artist threaten the whole industry's investment logic. In practice this extends a
         company's leverage beyond the courtroom — an artist who challenges a contract faces an
         industry-wide chill, not just a lawsuit.`,
        `<strong>In disputes.</strong> The track record reads consistently company-side: backing
         ATTRAKT's position during Fifty Fifty (2023), cautioning the industry against engaging
         NewJeans during their conflict (2024–25). KEMA frames these as neutral standard-keeping;
         no equivalent public warnings against agency over-reach exist to balance the ledger.`,
        `<strong>Trajectory (2026).</strong> Pressure on KEMA is rising from both directions:
         lawmakers cite its toothless mediation when proposing statutes, and fandoms now file
         complaints and publicity campaigns against its interventions. The association faces the
         classic self-regulator's fork — reform into a genuinely neutral arbiter (artist members,
         independent funding, binding arbitration) or watch its functions migrate to the state.`,
      ],
      controversies: [
        { yr: '2023', title: 'Fifty Fifty intervention', sev: 'med',
          desc: 'Backs ATTRAKT’s position and warns the industry against third-party tampering — read by critics as the association choosing its member over the artists by default.' },
        { yr: '2024–25', title: 'NewJeans dispute posture', sev: 'med',
          desc: 'Cautions companies against engaging artists in unresolved disputes — effectively narrowing the members’ employment options while litigation runs.' },
        { yr: 'structural', title: 'Self-regulation conflict', sev: 'high',
          desc: 'The standing critique: an association funded by management companies cannot neutrally arbitrate artist-versus-company conflicts. Its mediation has no binding power over members.' },
      ],
      caseStudy: {
        title: 'Case study: the tampering doctrine',
        intro: `KEMA's most consequential tool isn't a rule — it's a norm. By framing artist-side exits
          as "tampering" risks for anyone who might work with the artist, the association extends a
          company's contractual leverage into the artist's entire future market.`,
        timeline: [
          ['2023', 'Fifty Fifty dispute: KEMA’s warnings help freeze the members’ prospects during litigation; three are eventually dropped and return is impossible.'],
          ['2024–25', 'Similar posture in the NewJeans conflict: advertisers, broadcasters, and agencies grow wary of touching the members while contracts are contested.'],
        ],
        outcome: `Artists who challenge contracts face not just a lawsuit but an industry-wide chill.
          Whether that's responsible standard-keeping or a cartel enforcing discipline is, almost
          verbatim, the question before your committee.`,
        provesFor: 'Tampering norms protect the integrity of every contract in the industry — without them, rich rivals could simply shop for unhappy artists.',
        provesAgainst: 'The chill is the punishment: an artist can win in court and still lose their career, because the association coordinates the market against them.',
      },
      relations: {
        stance: `Balancer by mandate, pro-corporate by structure. KEMA's stated mission is industry
          health and dispute resolution; its funding, membership, and track record align it with the
          management side in every contested case. Treat its official neutrality as the open question
          your committee exists to answer.`,
        allies: [
          { name: 'The major agencies', why: 'HYBE, SM, JYP, YG anchor the membership — KEMA’s doctrine on contracts and tampering is their collective interest, codified.' },
          { name: 'Small and mid-tier agencies', why: 'Depend on KEMA standards and tampering norms even more than the majors — they can’t afford to litigate leverage they can get by association rule.' },
          { name: 'Status-quo legal framework', why: 'Courts enforcing contracts as written do KEMA’s doctrinal work for it, letting the association present enforcement as neutral law.' },
        ],
        opponents: [
          { name: 'Artist-side advocates & plaintiff lawyers', why: 'View KEMA mediation as structurally captured; push disputes into courts and legislatures where the association has no home advantage.' },
          { name: 'Organized fandoms', why: 'Treat KEMA interventions (Fifty Fifty, NewJeans) as the industry closing ranks, and campaign against it directly.' },
          { name: 'Reform-minded lawmakers', why: 'Every statute that binds agencies is an implicit verdict that KEMA’s self-regulation failed — the association’s relevance shrinks with each one.' },
        ],
      },
      verdict: {
        lean: 30, label: 'Balancer in name, corporate in instinct',
        text: `Treat its stated mission (balance) as the committee's goal and its track record
          (company-protective) as the committee's problem. Reform proposals aimed at KEMA itself are
          the most on-mandate resolutions available.`,
        links: [
          ['🔍 About the association', 'https://www.google.com/search?q=%ED%95%9C%EA%B5%AD%EC%97%B0%EC%98%88%EB%A7%A4%EB%8B%88%EC%A7%80%EB%A8%BC%ED%8A%B8%ED%98%91%ED%9A%8C'],
          ['📰 News coverage', gsearch('"Korea Entertainment Management Association"')],
          ['⚖️ Fifty Fifty dispute coverage', gsearch('Fifty Fifty ATTRAKT dispute')],
        ],
      },
    },
  },

  {
    id: 'kftc', emoji: '⚖️', name: 'Korea Fair Trade Commission', color: 'gold',
    badge: 'balancer', badgeText: 'Balancer',
    blurb: `The structural referee. Capped exclusive contracts at 7 years after the TVXQ case,
      publishes standard contract templates, and has repeatedly struck down one-sided clauses.
      Moves slowly and case-by-case.`,
    facts: ['National competition regulator', '7-year cap on exclusive contracts (2009)', 'Standard exclusive-contract template (2010, revised since)'],
    query: 'Korea "Fair Trade Commission" entertainment',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> South Korea's national competition and consumer-protection
         regulator — the only body in this debate with statutory power over contract terms across the
         whole industry at once. Entertainment is a small fraction of its portfolio, which shapes
         everything about how (and how slowly) it engages.`,
        `<strong>On creative control.</strong> Outside its jurisdiction, and deliberately so: the
         KFTC polices whether contract terms are unfair, not who decides the concept or writes the
         songs. This boundary is why fifteen years of KFTC intervention reformed contract length and
         penalty math while leaving the lived experience of creative control essentially untouched.`,
        `<strong>On contracts.</strong> Its interventions form the actual legal floor of the industry:
         the 7-year ceiling on exclusive contracts (2009, after TVXQ), the standard exclusive-contract
         template (2010, revised since), and recurring crackdowns on excessive penalty clauses,
         automatic renewals, and overbroad image rights. Every artist's baseline protection traces to
         a KFTC document.`,
        `<strong>In disputes.</strong> The KFTC does not referee individual fights — Fifty Fifty and
         NewJeans went to civil court, not to the regulator. Its pattern is to wait for a scandal to
         expose a clause type, then strike that clause industry-wide: systematic, retrospective, and
         always one scandal behind the frontier of dispute.`,
        `<strong>Trajectory (2026).</strong> Each new conflict renews calls for the KFTC to revisit
         the standard contract — penalty formulas, recoupment transparency, post-termination
         restrictions. As the industry globalizes, it also faces a jurisdiction problem: the model's
         newest battlegrounds (US courts, foreign trainees) sit outside its reach entirely.`,
      ],
      controversies: [
        { yr: '2009–10', title: 'The founding intervention', sev: 'med',
          desc: 'The TVXQ fallout produces the 7-year cap and the standard exclusive contract — the most consequential regulatory act in K-pop history.' },
        { yr: '2010s–', title: 'Whack-a-mole enforcement', sev: 'med',
          desc: 'Repeated crackdowns force agencies to fix excessive penalty fees, automatic renewals, and overbroad image rights — and similar clauses keep reappearing in new forms.' },
        { yr: 'structural', title: 'Template without teeth', sev: 'low',
          desc: 'The standard contract is voluntary; deviations surface only when an artist risks litigation. Protection depends on the protected suing first.' },
      ],
      caseStudy: {
        title: 'Case study: the 7-year cap — what one rule did and didn’t do',
        intro: `The cap is the debate's best natural experiment: a real, binding limit on corporate
          contract power, in force for fifteen years.`,
        timeline: [
          ['2009', 'TVXQ ruling: 13-year terms held excessive.'],
          ['2010', 'Standard exclusive contract published; majors nominally adopt it.'],
          ['2010s–20s', 'Contracts shorten and renewals become negotiation events (TWICE, BLACKPINK) — artist leverage moments that didn’t exist before.'],
          ['2020s', 'Disputes migrate to what the cap doesn’t cover: penalty math, recoupment, control during the term, and post-exit blacklisting.'],
        ],
        outcome: `The cap genuinely shifted leverage at renewal time — and left in-term control untouched.
          Proof that targeted regulation works, and proof of how much it leaves unregulated.`,
        provesFor: 'The guardrails exist and work; disputes are resolved within a framework the KFTC already built. Extend the framework, don’t replace the industry.',
        provesAgainst: 'Fifteen years on, artists still choose career destruction over staying — the cap fixed contract length, not the experience of being controlled.',
      },
      relations: {
        stance: `Structural balancer — the closest thing to a neutral actor in the debate. The KFTC
          sides with whoever the law puts it against: agencies when terms are unfair, implicitly
          companies when its template legitimizes the reformed status quo. It has no stake in the
          model itself, only in its terms.`,
        allies: [
          { name: 'Artists seeking structural limits', why: 'Every binding protection artists actually have (7-year cap, standard contract) is a KFTC product — it is their only proven institutional channel.' },
          { name: 'Reform-minded lawmakers', why: 'Statutes and KFTC rules reinforce each other; the Assembly legislates the principle, the regulator operationalizes the terms.' },
          { name: 'Compliant agencies', why: 'Counter-intuitively: companies that adopt the template gain a legitimacy shield — "our contracts follow the KFTC standard" is the industry’s favorite defense.' },
        ],
        opponents: [
          { name: 'Agencies’ contract drafters', why: 'A standing cat-and-mouse: struck-down clause types keep reappearing in new forms, and each crackdown targets the latest workaround.' },
          { name: 'Its own mandate limits', why: 'Less an enemy than a ceiling — voluntary templates, case-by-case enforcement, and no jurisdiction over creative control or foreign disputes.' },
        ],
      },
      verdict: {
        lean: 50, label: 'The neutral floor',
        text: `The closest thing to a neutral actor in the debate. Both sides should claim it: FOR as
          evidence the system is already policed, AGAINST as the engine future protections should run on.`,
        links: [
          ['🌐 Official site (ftc.go.kr)', 'https://www.ftc.go.kr'],
          ['📖 Wikipedia', 'https://en.wikipedia.org/wiki/Fair_Trade_Commission_(South_Korea)'],
          ['📰 News coverage', gsearch('Korea Fair Trade Commission entertainment contract')],
        ],
      },
    },
  },

  {
    id: 'law', emoji: '🏛️', name: 'Lawmakers & Ministry of Culture', color: 'gold',
    badge: 'balancer', badgeText: 'Balancer, drifting pro-artist',
    blurb: `After Lee Seung-gi revealed he'd never been paid music revenue in 18 years, lawmakers
      pushed payment-transparency duties onto agencies; separate rules protect minor performers.
      Each scandal converts voluntary norms into statute.`,
    facts: ['Popular Culture & Arts Industry Development Act', 'Payment-transparency duties on agencies', 'Working-hour & education protections for minors'],
    query: 'South Korea entertainment law artist rights',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> The National Assembly and the Ministry of Culture, Sports and
         Tourism — the actors who turn industry norms into binding law. The Ministry carries a genuine
         double mandate: it promotes K-pop as a strategic national export (Hallyu policy, soft-power
         budgets) while bearing responsibility for the welfare of the people who produce it.`,
        `<strong>On creative control.</strong> No Korean statute regulates who owns creative
         decisions, and none is seriously proposed — lawmakers treat creative control as a private
         contractual matter. Their entry points are adjacent: minors' welfare, payment transparency,
         working conditions. Creative freedom reaches the Assembly only when it arrives dressed as a
         labor or consumer issue.`,
        `<strong>On contracts and welfare.</strong> The statutory record is real and growing: the
         Popular Culture and Arts Industry Development Act framework, working-hour and education
         protections for minor performers, and the post-2022 "Lee Seung-gi law" amendments requiring
         agencies to provide regular settlement statements and accounting access. Transparency and
         child protection are the two fronts where Korean law actually binds agencies.`,
        `<strong>In disputes.</strong> Lawmakers don't adjudicate, they dramatize: National Assembly
         hearings (HYBE's 2024 appearance over the monitoring reports) convert industry conflicts
         into political theater and political theater into legislative momentum. Every major scandal
         since 2009 has produced at least a bill proposal within a session.`,
        `<strong>Trajectory (2026).</strong> The direction of travel is one-way — protections
         accumulate and never repeal — but the pace is scandal-clocked. The open questions on the
         table: penalty-fee caps, mandatory arbitration, trainee-contract standards, and whether the
         tampering norm itself restrains trade. Whichever passes first will be the industry's
         biggest forced change since the 7-year cap.`,
      ],
      controversies: [
        { yr: '2014–', title: 'Minor-performer rules', sev: 'low',
          desc: 'Working-hour limits, education and rest guarantees for underage entertainers — the quiet baseline most of the trainee debate builds on.' },
        { yr: '2022', title: 'The Lee Seung-gi revelation', sev: 'high',
          desc: 'A top star learns he was never paid music revenue across 18 years; national outrage makes agency accounting a political issue overnight.' },
        { yr: '2023–', title: '"Lee Seung-gi law" amendments', sev: 'med',
          desc: 'Agencies must provide regular settlement statements and accounting access. Transparency, though, is not bargaining power — statements reveal the split without changing it.' },
      ],
      caseStudy: {
        title: 'Case study: the Lee Seung-gi law — scandal becomes statute',
        intro: `The cleanest demonstration of how artist protections actually get made in Korea:
          not by design, but by outrage.`,
        timeline: [
          ['2004–22', 'Lee Seung-gi releases hit music for 18 years; his agency tells him his music activities ran at a loss.'],
          ['2022', 'He audits, goes public, and is vindicated; the agency pays out under massive public pressure.'],
          ['2023', 'The National Assembly amends the Popular Culture and Arts Industry Development Act: mandatory settlement statements and accounting access.'],
        ],
        outcome: `A real, binding transparency duty now exists — created by one celebrity's audit, not by
          systemic review. The mechanism works; the mechanism is also clearly not a system.`,
        provesFor: 'Targeted statute fixed a specific abuse without touching the management model — regulate conduct, not structure.',
        provesAgainst: 'It took 18 years and a superstar to surface one missing payment. How many artists without his platform never find out?',
      },
      relations: {
        stance: `Balancer drifting pro-artist. The legislature has no quarrel with the management
          model as a business — it has a one-way ratchet of artist protections driven by public
          outrage. Functionally, lawmakers are the artist side's slowest but only binding weapon,
          and the industry's strongest argument for pre-emptive self-reform.`,
        allies: [
          { name: 'Public opinion', why: 'The actual engine: no entertainment statute has ever passed without a scandal supplying the votes.' },
          { name: 'Artist advocates & unions', why: 'Supply the testimony, case files, and bill drafts that convert outrage into legislative text.' },
          { name: 'KFTC', why: 'The enforcement partner — the Assembly sets duties, the regulator polices terms, and each cites the other’s gaps to justify acting.' },
        ],
        opponents: [
          { name: 'The industry lobby', why: 'Agencies and KEMA argue every bill threatens export competitiveness — the sky-is-falling defense that has lost, slowly, every time.' },
          { name: 'The Ministry’s own export mandate', why: 'Hallyu promotion budgets depend on the industry’s success, building a brake against regulation into the very ministry responsible for welfare.' },
          { name: 'Legislative attention spans', why: 'Scandal-clocked lawmaking means reform stalls the moment headlines move on — the industry’s most reliable defense is time.' },
        ],
      },
      verdict: {
        lean: 58, label: 'Balancer, drifting pro-artist',
        text: `The slow-moving force that ultimately sets the floor. Committee resolutions that
          pre-empt likely legislation (transparency, arbitration, minors) are the most realistic
          kind of "balance" available.`,
        links: [
          ['🌐 Ministry of Culture', 'https://www.mcst.go.kr'],
          ['📖 Ministry — Wikipedia', 'https://en.wikipedia.org/wiki/Ministry_of_Culture,_Sports_and_Tourism'],
          ['📰 News coverage', gsearch('South Korea entertainment law artist rights')],
        ],
      },
    },
  },

  {
    id: 'selfprod', emoji: '🎤', name: 'Self-producing idols', color: 'against',
    badge: 'against', badgeText: 'Pro-artist (market proof)',
    blurb: `BTS, Stray Kids, SEVENTEEN, (G)I-DLE: acts that write and produce their own music are the
      industry's best-selling exports — the strongest <em>commercial</em> argument that creative
      freedom and profit aren't opposites.`,
    facts: ['BTS: members hold hundreds of writing credits', 'Stray Kids: 3RACHA produce in-house, multiple Billboard 200 #1s', '(G)I-DLE: Soyeon writes/produces the group’s hits', 'SEVENTEEN: Woozi leads production'],
    query: 'k-pop self-produced idol songwriting',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> Not an organization but a market fact: the cohort of idols
         with substantive creative authorship — BTS (members hold hundreds of KOMCA-registered
         writing credits), Stray Kids (3RACHA produce the catalog in-house), SEVENTEEN (Woozi leads
         production), (G)I-DLE (Soyeon writes and produces the hits). They are simultaneously
         products of the trainee system and the strongest evidence against its creative premises.`,
        `<strong>On creative control.</strong> Their existence redefines the question. The classical
         model assumed professional A&R outperforms artist instinct; this cohort's commercial record —
         the biggest export run in K-pop history (BTS), consecutive Billboard 200 #1 debuts (Stray
         Kids) — inverts the assumption at the top of the market. Authorship also compounds: artists
         who write own publishing income and narrative identity that management can't replace.`,
        `<strong>On contracts.</strong> Notably, the self-producers are also the great renewers: BTS,
         SEVENTEEN, and Stray Kids all re-signed with their companies, early and publicly. Creative
         stake appears to do what enforcement cannot — make staying rational. No self-producing
         flagship act has ever litigated an exit; the dispute docket is populated entirely by artists
         without creative authority.`,
        `<strong>In disputes.</strong> They stay out of them — and that absence is the data. Their
         leverage operates invisibly, through renegotiated terms and creative latitude rather than
         courtrooms. Agencies, in turn, now market "self-producing" as a debut concept, an admission
         that the industry's own consumers price creative authenticity at a premium.`,
        `<strong>Trajectory (2026).</strong> The fourth and fifth generations launch with writing
         credits from day one, normalizing what was once exceptional. The open question is depth
         versus branding: credits are public record, but creative control over concepts, schedules,
         and image remains contractual — and that's where the next version of this debate lives.`,
      ],
      controversies: [
        { yr: 'framing', title: '"Self-producing" as marketing', sev: 'med',
          desc: 'Agencies now sell creative freedom as a concept — raising the question of how much input is real versus brand. Credits are public; creative control over concepts and schedules is not.' },
        { yr: 'survivorship', title: 'The graduation problem', sev: 'med',
          desc: 'Every celebrated self-producer earned autonomy through the standard trainee system first. The model claims their successes as its own — and the failures are invisible.' },
      ],
      caseStudy: {
        title: 'Case study: 3RACHA — in-house production as the product',
        intro: `Stray Kids debuted with members (3RACHA) already producing the music, under JYP's
          corporate roof — the clearest test of whether artist-driven creation can thrive inside
          the standard structure.`,
        timeline: [
          ['2017–18', 'Debut built explicitly around the members’ self-production identity.'],
          ['2022–24', 'Consecutive Billboard 200 #1 debuts — peak commercial performance for fully in-house artist production.'],
          ['ongoing', 'JYP markets the autonomy itself; the group renews as a full unit.'],
        ],
        outcome: `Creative input, corporate infrastructure, and commercial dominance coexisting —
          the strongest evidence that the binary at the heart of this debate is escapable.`,
        provesFor: 'The system at its best: company scouting and infrastructure plus artist creativity. No regulation produced this — alignment of interests did.',
        provesAgainst: 'If artist-driven production is this profitable, the industry’s default of centralized control is a choice — and the burden of justifying it flips.',
      },
      relations: {
        stance: `Pro-creative-freedom by demonstration, not declaration. This cohort never campaigns —
          their renewals, credits, and sales do the arguing. They are the artist side's economic
          exhibit and, simultaneously, the corporate side's favorite adoption story ("the system
          made them"). Both blocs will claim them; neither fully owns them.`,
        allies: [
          { name: 'Their own agencies', why: 'Genuine alignment: HYBE, JYP, and Pledis profit enormously from their autonomy, which is exactly why these artists renew instead of litigate.' },
          { name: 'Global fandoms', why: 'Authorship is central to these fandoms’ loyalty — the audience pays a premium for creative authenticity and defends it politically.' },
          { name: 'Artist-side debaters', why: 'Every argument that creative freedom is commercially superior cites this cohort as its data set.' },
        ],
        opponents: [
          { name: 'No direct enemies — structural ones', why: 'Nobody fights them; the control-model’s defenders simply reframe them as system outputs rather than counter-examples.' },
          { name: 'The "graduation" narrative', why: 'The argument that autonomy must be earned through the standard pipeline uses their trainee origins to defend the very control they outgrew.' },
        ],
      },
      verdict: {
        lean: 72, label: 'Pro-artist, by market evidence',
        text: `The debate's most useful neutral-sounding evidence: pure commercial data that the
          artist side can cite without sentiment and the corporate side must co-opt rather than deny.`,
        links: [
          ['📰 Coverage: self-producing idols', gsearch('k-pop self-produced idol songwriting')],
          ['📖 3RACHA — Wikipedia', 'https://en.wikipedia.org/wiki/3Racha'],
          ['📰 BTS songwriting coverage', gsearch('BTS members songwriting credits')],
        ],
      },
    },
  },

  {
    id: 'disputes', emoji: '🔥', name: 'Artists in dispute', color: 'against',
    badge: 'against', badgeText: 'Pro-artist',
    blurb: `NewJeans, Fifty Fifty, Chuu, Omega X, VCHA's KG: the artists who tested the contracts in
      court. The court scoreboard favors companies; the public-opinion scoreboard increasingly doesn't.`,
    facts: ['NewJeans: injunctions upheld ADOR contracts', 'Fifty Fifty: failed breakaway, three members dropped', 'Chuu: won her case vs Blockberry', 'VCHA’s KG: suing JYP USA (2026)'],
    query: 'k-pop idol contract lawsuit dispute',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> The litigation cohort: NewJeans/NJZ (and now Danielle
         individually), Fifty Fifty, Chuu, Omega X, and VCHA's KG — the artists who tested the
         exclusive-contract system in court rather than serving it out. They span the industry's
         full range: its biggest new act, a viral one-hit phenomenon, a top-tier soloist, a
         small-agency boy group, and a US-formed rookie.`,
        `<strong>On creative control.</strong> Their common testimony is that the system offers no
         internal path: grievances about management, autonomy, or treatment have no mechanism short
         of exit, and exit means war. Notably, none of them litigated over songwriting credits —
         they litigated over the structure that makes every other grievance unresolvable. Creative
         freedom arrives in court dressed as contract law.`,
        `<strong>On contracts.</strong> Their cases map the system's actual boundaries. Chuu proved
         contracts void when agency misconduct is extreme and documented. Fifty Fifty proved that
         ambiguous claims fail and carry career death. NewJeans proved that even maximal fame,
         public sympathy, and global attention do not move Korean courts off the contract text.
         KG is now testing whether US law reads the same text differently.`,
        `<strong>In disputes.</strong> The pattern across all five: courts usually side with
         companies; the industry's informal machinery (tampering norms, casting chill, advertiser
         caution) punishes even the winners; and public opinion increasingly breaks for the artists
         regardless of the legal outcome. The legal scoreboard and the legitimacy scoreboard have
         fully diverged.`,
        `<strong>Trajectory (2026).</strong> The frontier is jurisdictional and individual: Danielle's
         ₩33bn countersuit saga tests what an artist owes after termination, and KG's US case tests
         whether the model survives foreign employment law. Every future artist's lawyer is reading
         these dockets — the next dispute starts where these end.`,
      ],
      controversies: [
        { yr: '2021–22', title: 'Omega X — mistreatment on camera', sev: 'med',
          desc: 'Members document their agency’s conduct; the case opens a window into small-agency conditions the majors’ PR never shows.' },
        { yr: '2022–23', title: 'Chuu vs Blockberry — the artist win', sev: 'med',
          desc: 'Expelled from LOONA amid agency claims, she fights and wins, including against defamation claims. Proof the system can find for artists — when conduct is extreme and documented.' },
        { yr: '2023', title: 'Fifty Fifty — the cautionary tale', sev: 'high',
          desc: 'Weeks after "Cupid" goes global, the group seeks contract suspension; the injunction fails, three members are dropped. The corporate side’s favorite tampering parable.' },
        { yr: '2024–26', title: 'NewJeans / Danielle — the era case', sev: 'high',
          desc: 'Termination declared, injunctions granted, a member’s contract terminated, ~₩33bn claimed. Legally decisive for companies; reputationally radioactive.' },
        { yr: '2026', title: 'VCHA’s KG — the jurisdiction test', sev: 'high',
          desc: 'The fight moves to US courts, where the management model meets stronger labor law. Ongoing.' },
      ],
      caseStudy: {
        title: 'Case study: two endings — Chuu and Fifty Fifty',
        intro: `Run the same playbook — artist challenges agency — through two cases two years apart,
          and the system's actual rules become visible.`,
        timeline: [
          ['2022', 'Chuu: expelled and accused publicly; she litigates with documented evidence of the agency’s conduct.'],
          ['2023', 'Chuu wins — contract void, defamation claims defeated, career continues.'],
          ['2023', 'Fifty Fifty: at their global peak, seek suspension alleging mismanagement; evidence is contested.'],
          ['2023–24', 'Injunction denied; three members dropped and effectively erased; public sympathy lands with the agency.'],
        ],
        outcome: `The system finds for artists only at the extremes of documented mistreatment — and
          punishes ambiguous challenges with career death. Rational artists hear the message:
          don't litigate unless your evidence is overwhelming.`,
        provesFor: 'Courts weigh each case on facts and sometimes side with artists — the process works, and frivolous exits fail as they should.',
        provesAgainst: 'A system where the price of a 50/50 case is your entire career doesn’t have a justice problem — it has a deterrence design.',
      },
      relations: {
        stance: `Pro-creative-freedom — the evidence base in human form. These artists are not a
          movement and never coordinated; their stance is revealed by action: each concluded that
          exit, at any cost, beat staying. Collectively they are the primary sources every abstract
          claim in this debate eventually cites.`,
        allies: [
          { name: 'Their fandoms', why: 'Fund, amplify, translate court filings, and pressure advertisers — the only sustained institutional support disputing artists have.' },
          { name: 'Public opinion (increasingly)', why: 'Legal losses keep converting into legitimacy wins; global coverage now defaults to the artist’s framing of these disputes.' },
          { name: 'Plaintiff-side entertainment lawyers', why: 'A growing specialist bar building case law, case by case, on the artist side of the docket.' },
        ],
        opponents: [
          { name: 'Their agencies', why: 'ADOR, ATTRAKT, Blockberry, JYP USA — the direct adversaries, with the contract text and (usually) the courts behind them.' },
          { name: 'KEMA’s tampering doctrine', why: 'Industry norms freeze a disputing artist’s market options, turning every lawsuit into a siege the company can usually outlast.' },
          { name: 'The court record', why: 'Korean civil courts enforce the contracts as written almost every time — the structural headwind every new case faces.' },
        ],
      },
      verdict: {
        lean: 88, label: 'Pro-artist (the evidence base)',
        text: `The debate's primary sources. Every abstract claim about contracts, freedom, and power
          eventually cites one of these cases — know all five cold.`,
        links: [
          ['📰 Live dispute coverage', gsearch('k-pop idol contract lawsuit')],
          ['⚖️ NewJeans case', gsearch('NewJeans ADOR court ruling')],
          ['⚖️ Fifty Fifty case', gsearch('Fifty Fifty ATTRAKT injunction')],
          ['⚖️ Chuu case', gsearch('Chuu Blockberry lawsuit ruling')],
        ],
      },
    },
  },

  {
    id: 'fans', emoji: '📣', name: 'Fan collectives', color: 'against',
    badge: 'against', badgeText: 'Pro-artist (conditionally)',
    blurb: `Truck protests, advertiser boycotts, coordinated statements — fans increasingly act as
      idols' de-facto labor union. The paradox: the same parasocial fan economy that gives fans this
      leverage is what agencies cite to justify controlling idols' private lives.`,
    facts: ['Truck protests: rented LED trucks outside agency HQs', 'Advertiser pressure campaigns', 'Organized mass statements & funding pools'],
    query: 'k-pop fans protest agency',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> Organized fandoms — ARMYs, Bunnies, ONCEs and their peers —
         operating as coordinated political actors: funded, multilingual, legally literate, and
         permanently online. They are simultaneously the industry's revenue base and its only
         non-state check that companies demonstrably fear.`,
        `<strong>On creative control.</strong> Fandom opinion increasingly prices authenticity:
         self-produced and artist-driven work commands deeper loyalty than template output, and fans
         reward labels that visibly grant latitude. At the same time, fandoms enforce their own
         creative expectations — concept changes and image shifts can trigger revolts as fierce as
         any company directive. Fans contest who controls the artist; they don't propose the artist
         be uncontrolled.`,
        `<strong>On contracts.</strong> Fan collectives have no legal standing and total practical
         standing: they fund legal analyses, translate filings, file consumer and regulatory
         complaints, and run advertiser-pressure campaigns during disputes. In the NewJeans conflict,
         fan organization kept a legally settled matter reputationally open for years — a power no
         statute grants and none can revoke.`,
        `<strong>In disputes.</strong> The toolkit is institutionalized: LED protest trucks outside
         headquarters, coordinated mass statements, boycott and refund campaigns, stock-forum and
         shareholder-meeting appearances. The same machinery cuts both ways — it has defended
         artists from agencies, and it has policed artists' dating lives and demanded member
         removals. Fan power points wherever fans aim it.`,
        `<strong>Trajectory (2026).</strong> Fandom action is professionalizing — legal funds,
         press contacts, regulatory literacy — and its targets are escalating from artist treatment
         to corporate governance itself. The industry built its economics on organized parasocial
         devotion; that organization is now the closest thing artists have to a union, and the
         closest thing companies have to an uncontrollable shareholder.`,
      ],
      controversies: [
        { yr: '2010s–', title: 'Truck protests become standard', sev: 'low',
          desc: 'LED trucks outside agency buildings demanding management changes, better treatment, or apologies — institutionalized fan pressure with no legal status.' },
        { yr: '2024–25', title: 'Bunnies vs HYBE', sev: 'med',
          desc: 'NewJeans fans run coordinated campaigns — ad trucks, official statements, complaints to regulators — the closest thing to organized labor action the industry has seen, run by customers.' },
        { yr: 'structural', title: 'The parasocial paradox', sev: 'med',
          desc: 'Fan spending power is exactly what makes an idol’s private life a "commercial asset" — the justification for dating bans. The artist side’s strongest ally created the artist side’s oldest grievance.' },
      ],
      caseStudy: {
        title: 'Case study: the Bunnies campaign — customers as a union',
        intro: `During the NewJeans–ADOR conflict, the group's fandom ran a sustained, organized
          pressure campaign against one of the most powerful companies in Korean entertainment.`,
        timeline: [
          ['2024', 'Protest trucks deployed at HYBE headquarters; coordinated statements demand Min Hee-jin’s reinstatement and member protection.'],
          ['2024–25', 'Complaints filed with regulators; advertiser and broadcaster pressure campaigns; court filings translated and distributed globally.'],
          ['2025–26', 'Campaign persists through every ruling — losing legally while keeping the reputational cost permanently high.'],
        ],
        outcome: `No injunction was reversed — and yet HYBE's brand damage, political scrutiny, and the
          global framing of the dispute all trace substantially to fan organization. Power without
          authority, sustained longer than most unions could manage.`,
        provesFor: 'Mob dynamics with no accountability: campaigns run on emotion and selective information, and companies must answer to courts, not hashtags.',
        provesAgainst: 'When the customers themselves organize against the control model, the "we restrict idols to protect fan revenue" justification collapses.',
      },
      relations: {
        stance: `Pro-artist, conditionally and unpredictably. Fan collectives defend artists against
          companies more often than the reverse in the current era — but their loyalty is to their
          artist and their own expectations, not to creative-freedom principle. They are a power
          bloc both sides can recruit and neither can command.`,
        allies: [
          { name: 'Artists (usually)', why: 'In nearly every recent dispute the organized fandom backed the artist against the agency — funding, amplifying, and outlasting the news cycle.' },
          { name: 'Global media', why: 'Fan translation and documentation pipelines are how Korean industry disputes become international stories framed the artist’s way.' },
          { name: 'Disputing artists’ legal teams', why: 'Crowdsourced evidence-gathering, filing translations, and public-pressure timing that no plaintiff could afford to buy.' },
        ],
        opponents: [
          { name: 'Agencies under campaign', why: 'HYBE, ATTRAKT, Blockberry and others have all faced the trucks, the boycotts, and the regulatory complaints.' },
          { name: 'Artists’ private lives (historically)', why: 'The same machinery has policed dating, demanded apologies, and forced member removals — the paradox that justifies agencies’ image control.' },
          { name: 'KEMA & industry bodies', why: 'Fan campaigns now target association statements and industry norms directly, treating them as the cartel’s public voice.' },
        ],
      },
      verdict: {
        lean: 80, label: 'Pro-artist, conditionally',
        text: `A power bloc, not a principle — historically it has enforced control (dating scandals)
          as often as it has fought it. Cite its recent artist-side turn as evidence of shifting
          legitimacy, and handle with care.`,
        links: [
          ['📰 Fan protest coverage', gsearch('k-pop fans truck protest agency')],
          ['📰 Bunnies campaign coverage', gsearch('NewJeans fans HYBE protest')],
        ],
      },
    },
  },
];

/* ===================== renderer: stances.html grid ===================== */

function playerCardHTML(p) {
  const border = p.color === 'gold' ? 'var(--gold)' : `var(--${p.color})`;
  return `
  <a class="player-card clickable" href="player.html?id=${p.id}" style="border-top:3px solid ${border};display:block;color:var(--text);text-decoration:none">
    <div class="row"><h3>${p.emoji} ${p.name}</h3><span class="badge ${p.badge}">${p.badgeText}</span></div>
    <p>${p.blurb}</p>
    <span class="open-hint">📂 Open full dossier →</span>
  </a>`;
}

/* ===================== renderer: player.html dossier ===================== */

function dossierHTML(p) {
  const d = p.dossier;
  const sev = s => `<span class="sev-tag ${s}">${{ high: 'major', med: 'notable', low: 'context' }[s]}</span>`;
  return `
  <div class="hero" style="text-align:left;padding-bottom:6px">
    <span class="kicker">Player Dossier · ${p.badgeText}</span>
    <h1 style="font-size:clamp(1.5rem,4vw,2.2rem)">${p.emoji} ${p.name}</h1>
    <p class="sub" style="margin-left:0">${p.blurb}</p>
  </div>

  <div class="tabs" role="tablist">
    <button class="on" data-tab="t1">📋 Stance</button>
    <button data-tab="t2">⚡ Controversies</button>
    <button data-tab="t3">📚 Case Study</button>
    <button data-tab="t4">🤝 Allies & Opponents</button>
    <button data-tab="t5">⚖️ Verdict & Links</button>
  </div>

  <section class="dossier-section on" id="t1">
    <h2 class="sec"><span class="bar"></span>Summary of Stance</h2>
    ${d.stance.map(s => `<p class="sec-sub" style="font-size:.93rem;line-height:1.7">${s}</p>`).join('')}
    <div class="facts">${p.facts.map(f => `<span class="fact">${f}</span>`).join('')}</div>
  </section>

  <section class="dossier-section" id="t2">
    <h2 class="sec"><span class="bar"></span>Controversies & Flashpoints</h2>
    <p class="sec-sub">Severity reflects weight in the corporate-control vs. creative-freedom debate, not general newsworthiness.</p>
    ${d.controversies.map(c => `
      <div class="controversy sev-${c.sev}">
        <h4><span class="yr">${c.yr}</span> ${c.title} ${sev(c.sev)}</h4>
        <p>${c.desc}</p>
      </div>`).join('')}
  </section>

  <section class="dossier-section" id="t3">
    <h2 class="sec"><span class="bar"></span>${d.caseStudy.title}</h2>
    <div class="cs-block"><p class="sec-sub" style="font-size:.93rem">${d.caseStudy.intro}</p></div>
    <div class="cs-block">
      <h4>📅 What happened</h4>
      <ul class="case-list">${d.caseStudy.timeline.map(t => `<li><span class="yr">${t[0]}</span> — ${t[1]}</li>`).join('')}</ul>
    </div>
    <div class="cs-block"><h4>🏁 Outcome</h4><p>${d.caseStudy.outcome}</p></div>
    <div class="positions">
      <div class="pos for"><strong>What it proves — pro-corporate</strong>${d.caseStudy.provesFor}</div>
      <div class="pos against"><strong>What it proves — creative freedom</strong>${d.caseStudy.provesAgainst}</div>
    </div>
  </section>

  <section class="dossier-section" id="t4">
    <h2 class="sec"><span class="bar"></span>Stance, Allies & Opponents</h2>
    <div class="cs-block"><h4>🧭 Determined stance</h4><p>${d.relations.stance}</p></div>
    <span class="rel-h a">🤝 Allies — who stands with them, and why</span>
    <div class="rel-grid">${d.relations.allies.map(a =>
      `<div class="rel-card ally"><strong>${a.name}</strong>${a.why}</div>`).join('')}</div>
    <span class="rel-h o">⚔️ Opponents — who stands against them, and why</span>
    <div class="rel-grid">${d.relations.opponents.map(o =>
      `<div class="rel-card opp"><strong>${o.name}</strong>${o.why}</div>`).join('')}</div>
  </section>

  <section class="dossier-section" id="t5">
    <h2 class="sec"><span class="bar"></span>Verdict: ${d.verdict.label}</h2>
    <div class="panel">
      <div class="lean-wrap">
        <div class="lean-meter"></div>
        <div class="lean-dot" style="left:${d.verdict.lean}%"></div>
      </div>
      <div class="lean-labels"><span class="l">◀ CORPORATE CONTROL</span><span class="r">CREATIVE FREEDOM ▶</span></div>
      <p style="font-size:.9rem;color:var(--text-dim);margin-top:14px">${d.verdict.text}</p>
    </div>
    <h4 style="margin:18px 0 4px">🔗 Go deeper</h4>
    <div class="link-grid">
      ${d.verdict.links.map(l => `<a class="link-card" href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`).join('')}
    </div>
    <h4 style="margin:24px 0 6px">📰 Latest coverage — updated daily</h4>
    <div class="mini-news" data-id="${p.id}" data-q="${esc(p.query)}">
      <div class="loader" style="padding:8px 0"><div class="spinner" style="width:22px;height:22px"></div></div>
    </div>
  </section>`;
}

async function loadPlayerNews(slot) {
  if (!slot || slot.dataset.done) return;
  slot.dataset.done = '1';
  const { id, q } = slot.dataset;
  const key = `kema-player-${id}-${todayKey()}`;
  const searchLink = `<a href="${gsearch(q)}" target="_blank" rel="noopener">Open full coverage on Google News →</a>`;

  let items = null;
  try { items = JSON.parse(localStorage.getItem(key)); } catch { /* re-fetch */ }
  if (!items) {
    try {
      items = (await fetchFeed({ q, hint: '' }))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map(({ title, source, link, date }) => ({ title, source, link, date }));
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

/* ===================== boot ===================== */

document.addEventListener('DOMContentLoaded', () => {
  // stances.html: card grid
  const grid = document.getElementById('player-grid');
  if (grid) grid.innerHTML = PLAYERS.map(playerCardHTML).join('');

  // player.html: full dossier
  const root = document.getElementById('dossier-root');
  if (!root) return;
  const id = new URLSearchParams(location.search).get('id');
  const idx = PLAYERS.findIndex(p => p.id === id);
  if (idx === -1) {
    root.innerHTML = `<div class="hero" style="text-align:left"><h1>Pick a dossier</h1></div>
      <div class="article-list">${PLAYERS.map(p =>
        `<a class="article-card" href="player.html?id=${p.id}"><h3>${p.emoji} ${p.name}</h3></a>`).join('')}</div>`;
    return;
  }
  const p = PLAYERS[idx];
  document.title = `${p.name} — Dossier — KEMA Debate Tracker`;
  root.innerHTML = dossierHTML(p);

  // tab switching
  root.querySelector('.tabs').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    root.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b === btn));
    root.querySelectorAll('.dossier-section').forEach(s =>
      s.classList.toggle('on', s.id === btn.dataset.tab));
    if (btn.dataset.tab === 't5') loadPlayerNews(root.querySelector('.mini-news'));
  });

  // prev/next pager
  const prev = PLAYERS[(idx - 1 + PLAYERS.length) % PLAYERS.length];
  const next = PLAYERS[(idx + 1) % PLAYERS.length];
  document.getElementById('dossier-pager').innerHTML = `
    <a href="player.html?id=${prev.id}">← ${prev.emoji} ${prev.name}</a>
    <a href="stances.html">All players</a>
    <a href="player.html?id=${next.id}">${next.emoji} ${next.name} →</a>`;
});
