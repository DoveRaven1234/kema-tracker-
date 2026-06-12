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
        `HYBE's public thesis is that scale serves artists: a multi-label structure gives each label
         creative identity while the parent supplies capital, global distribution, and technology
         (Weverse). In this telling, the corporation doesn't constrain creativity — it's the only
         thing that can afford it. Billion-won trainee development, world tours, and US/India/Latin
         America expansion all require a balance sheet no independent artist could carry.`,
        `In practice, the NewJeans conflict revealed where the thesis hits its limit: when a
         subsidiary's creative leadership and its artists tried to act independently, HYBE used
         audits, board control, and injunctions to hold the structure together. The company's
         consistent position: exclusive contracts are the foundation of the entire investment
         model, and unilateral exits cannot be tolerated regardless of public sympathy.`,
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
      framing: {
        angle: `Frame HYBE as the strongest version of the corporate case — if the model is defensible
          anywhere, it's here (biggest investment, biggest results). That also makes it the highest-value
          target: concessions extracted from the HYBE example apply everywhere downstream.`,
        useFor: 'The scale argument: only corporate consolidation produces a company that can take K-pop global and absorb billion-won trainee losses.',
        useAgainst: 'The concentration argument: the NewJeans saga and monitoring-report scandal show what happens when one company holds that much power over artists.',
        counters: [
          { they: 'HYBE won every court case — the system is legitimate.',
            you: 'Legality isn’t legitimacy. The KFTC’s 7-year cap was also preceded by courts enforcing 13-year contracts; law catches up to fairness, not the reverse.' },
          { they: 'Multi-label structure already gives artists creative freedom.',
            you: 'ADOR is the test of that claim, and the test failed — independence lasted exactly as long as it didn’t conflict with the parent’s interests.' },
        ],
        lines: [
          'If creative freedom inside HYBE were real, we would not know Min Hee-jin’s name.',
          'HYBE proves the model’s ceiling and its floor at once: nobody invests more in artists, and nobody has fought harder to keep them.',
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
        `SM invented the thing being debated. Lee Soo-man's "cultural technology" codified every step —
         casting, training, songwriting camps, concept design, fan management — into a corporate
         process that could manufacture stars repeatably. SM's historical stance is that K-pop IS this
         process: the artist is one input into a system that creates value far beyond any individual.`,
        `Post-2023 (Kakao takeover, founder ousted), "SM 3.0" decentralized artists into internal
         production centers and talks more about artist individuality. Structurally, though, the
         company still owns the creative process end-to-end. SM is the best evidence that the industry
         reforms its rhetoric faster than its architecture.`,
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
      framing: {
        angle: `Use SM as the historical spine of any argument: whatever you want to claim about the
          industry, SM has a precedent for it — the original sin (2009), the repeat offenses (2014),
          and the rebranding of control as "3.0".`,
        useFor: 'Exhibit A that the system self-corrects: the company that caused the 2009 scandal now operates under the reformed standard it forced into existence.',
        useAgainst: 'Exhibit A that reform is cosmetic: three waves of artist exits from the same company under the same fundamental model.',
        counters: [
          { they: 'The 7-year cap fixed the contract problem.',
            you: 'Then why did EXO members file in 2014, and why are 2024–26 disputes still about exit penalties and control? The cap shortened the leash; it didn’t remove it.' },
        ],
        lines: [
          'Every rule in K-pop contract law has an SM case number attached to it.',
          '"Cultural technology" is a euphemism with a manual.',
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
        `JYP's stance is that the corporate model and artist wellbeing are compatible — and that JYP
         itself is the proof. Founder Park Jin-young publicly preaches values, health, and longevity;
         the company points to GOT7's amicable exit and serial full-group renewals as evidence that
         artists stay when treated well. It is the corporate side's favorite character witness.`,
        `The fine print: creative direction, production, and concepts remain centralized, dating
         restrictions for young artists are openly acknowledged policy, and the company's signature
         export is the trainee system itself (NiziU in Japan, VCHA in the US). The 2026 KG lawsuit
         alleges the exported model includes its harshest practices — JYP denies the claims.`,
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
      framing: {
        angle: `JYP is the "best-case operator" — use it to isolate the variable. If you argue
          pro-corporate, JYP shows the model run humanely. If you argue creative freedom, JYP shows
          that even the humane version centralizes creativity and polices private lives.`,
        useFor: 'The benchmark argument: renewals and goodwill exits prove the model can be humane without changing its structure.',
        useAgainst: 'The export argument: the KG lawsuit suggests practices that pass in Seoul may be legally indefensible abroad — a problem as the industry globalizes.',
        counters: [
          { they: 'JYP proves the system works when run with good values.',
            you: 'Then the system depends on the benevolence of whoever runs it — which is precisely the definition of unaccountable power. Good kings are not a constitution.' },
        ],
        lines: [
          'JYP is what the industry looks like on its best behavior — note that even its best behavior includes a dating ban.',
          'The VCHA case asks one question: does K-pop management survive contact with employment law?',
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
        `YG's traditional stance is curation through control: fewer comebacks, heavier brand
         management, strict internal discipline — scarcity as strategy. Of the majors, it has
         historically given artists the least scheduling freedom while cultivating a "crew, not
         company" image rooted in its hip-hop origins.`,
        `The BLACKPINK renewal rewired the conversation: group activities stay with YG while members'
         solo careers run through their own companies (Lisa's LLOUD, Jennie's ODD ATELIER). YG
         effectively conceded that at the very top, total control is no longer enforceable — the
         most important voluntary unbundling of corporate control the industry has produced.`,
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
      framing: {
        angle: `YG gives you both extremes in one company: the strictest legacy control culture AND the
          boldest unbundling experiment. Pick whichever face serves your argument, and be ready for
          your opponent to pick the other.`,
        useFor: 'The flexibility argument: the BLACKPINK deal shows corporates can adapt and unbundle control when artists earn leverage.',
        useAgainst: 'The leverage argument: everyone below BLACKPINK’s tier stays fully controlled — rights that must be earned by stardom are not rights.',
        counters: [
          { they: 'BLACKPINK proves the system evolves on its own.',
            you: 'One deal at the absolute apex after seven years of global dominance is not evolution — it’s an exception priced for superstars. Ask what TREASURE’s renewal looks like.' },
        ],
        lines: [
          'YG sells scarcity to fans and calls it strategy; artists experience the same scarcity and call it the dungeon.',
          'The BLACKPINK deal is the industry admitting, in contract form, that total control has a price ceiling.',
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
        `ADOR existed to answer the debate's central question inside one company: give a creative
         director (Min Hee-jin, the visual architect of SM's golden era) her own label, her own
         roster, and creative authority — within HYBE's capital structure. NewJeans' instant,
         enormous success initially looked like proof that artist-centered, auteur-led K-pop
         outperforms the committee-driven kind.`,
        `The 2024 collapse turned ADOR from experiment into evidence. Min Hee-jin's side frames it as
         a corporation crushing creative independence the moment it stopped being convenient; HYBE's
         side frames it as an executive attempting to seize a subsidiary built with corporate money.
         Both framings are now permanent fixtures of the debate — and the courts siding with the
         corporate reading settled the law without settling the argument.`,
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
      framing: {
        angle: `ADOR is your case study regardless of side — the question is what it proves. Decide
          early whether you read it as a governance story (FOR) or a creative-freedom story (AGAINST),
          and pre-empt the other reading.`,
        useFor: 'Proof that "independence inside a corporation" fails for governance reasons, not artistic ones.',
        useAgainst: 'Proof that the industry has no working model for creative autonomy: the one serious attempt was crushed.',
        counters: [
          { they: 'Min Hee-jin tried to steal a subsidiary; this is corporate law, not creative freedom.',
            you: 'Then explain the artists: five members with no equity stake risked everything to follow her. Employees don’t mutiny for a thief — they mutiny for the only autonomy they’ve ever experienced.' },
        ],
        lines: [
          'ADOR was the control group of the entire debate — and the experiment was terminated early by the people who funded it.',
          'Whatever Min Hee-jin’s motives, NewJeans’ choice is the data point: given one taste of artist-centered production, they preferred career destruction to going back.',
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
        `KEMA is a trade association: its members are the management companies, its dues come from
         them, and its institutional instinct is to protect the contract system that its members run
         on. In the industry's biggest disputes (Fifty Fifty, NewJeans), it has consistently warned
         against "tampering" — third parties engaging artists who are in unresolved contract disputes —
         which in practice reinforces the company side's leverage.`,
        `Its defense is real, too: somebody has to set working standards, run mediation, and discipline
         rogue agencies, and a legislature can't react at industry speed. The committee question is
         whether KEMA can be rebuilt into a genuinely neutral arbiter — independent funding, artist
         representation, enforcement teeth — or whether neutrality requires taking those functions
         away from it.`,
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
      framing: {
        angle: `You are not debating ABOUT KEMA — you are KEMA. Every argument should end in what the
          association should do: amend standard contracts? create independent arbitration? cap
          penalties? admit artist representatives as members?`,
        useFor: 'Self-regulation preserves flexibility: KEMA can update standards faster than any legislature and understands the economics.',
        useAgainst: 'Structural conflict of interest: an association funded by management companies cannot neutrally arbitrate their disputes.',
        counters: [
          { they: 'Industry bodies regulate themselves in every field — this is normal.',
            you: 'Normal self-regulators (medicine, law) answer to licensing statutes and admit the regulated profession’s counterparties. KEMA has neither artists as members nor binding enforcement.' },
        ],
        lines: [
          'KEMA’s neutrality is the resolution’s first clause, not its assumption.',
          'An association that only warns against tampering, and never against over-reach, has already chosen a side.',
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
        `The KFTC's stance is procedural, not ideological: entertainment contracts are consumer/
         competition matters, and one-sided terms get struck down when challenged. Its interventions —
         the 7-year cap, the standard contract, periodic crackdowns on penalty clauses and automatic
         renewals — form the actual legal floor under every artist in the industry.`,
        `Its structural weakness is reactivity: it acts after scandals, case-by-case, and its standard
         contract is a template, not a mandate. Each new dispute (Fifty Fifty, NewJeans) still goes to
         civil court first, because the regulator polices terms, not power.`,
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
      framing: {
        angle: `The KFTC is your model for what regulation CAN do — cite it to prove feasibility
          (rules can bind this industry) and to prove insufficiency (look what's still happening).
          Resolutions that extend KFTC mechanisms inherit its credibility.`,
        useFor: 'No new bureaucracy needed: the regulator, the template, and the precedents already exist — sharpen them.',
        useAgainst: 'Reactive by design: every fix came after a scandal, years late, and enforcement depends on artists litigating first.',
        counters: [
          { they: 'More regulation will kill the industry’s competitiveness.',
            you: 'The 7-year cap was supposed to do that in 2009. Instead the most regulated era of K-pop is also its most globally successful.' },
        ],
        lines: [
          'The 7-year cap is proof that the sky doesn’t fall when artist protections bind.',
          'A template you may ignore is a suggestion wearing a uniform.',
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
        `The legislature's revealed stance is scandal-driven incrementalism: it doesn't regulate the
         management model as such, but each high-profile abuse produces a targeted statute — minor
         performer protections, payment-statement duties ("Lee Seung-gi law"), education guarantees.
         The Ministry of Culture sits in a genuine bind: it promotes K-pop as a strategic export
         while being responsible for the welfare of the people who make it.`,
        `The trend line matters more than any single law: protections only move in one direction.
         For the committee, lawmakers are both a tool (statutes can do what KEMA's standards can't —
         bind) and a warning (if the industry doesn't self-correct, correction arrives with less
         nuance and more politics).`,
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
      framing: {
        angle: `Use lawmakers as the committee's BATNA: every resolution implicitly asks "fix this
          within the industry, or wait for the Assembly to fix it for you — more bluntly."`,
        useFor: 'Evidence that precise legislation works and the model survives it — the sky-is-falling argument keeps losing.',
        useAgainst: 'Evidence the industry never reforms voluntarily: every protection on the books exists because a scandal forced it.',
        counters: [
          { they: 'Legislation is too blunt for an industry this fast-moving.',
            you: 'The settlement-statement duty is surgically narrow and works fine. Precision is a drafting choice, not a property of legislatures.' },
        ],
        lines: [
          'In this industry, the law is a scar tissue — every statute marks where someone got hurt first.',
          'The Assembly is the deadline: self-regulate, or be regulated.',
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
        `Not an organization but a market fact: the era's biggest commercial outcomes belong to acts
         with genuine creative input. BTS's self-written catalog drove the largest export run in
         K-pop history; Stray Kids hit consecutive Billboard 200 #1s with fully in-house production;
         Soyeon and Woozi function as their groups' lead producers. "Artists with pens sell more" is
         now a data point, not a hope.`,
        `The contested part is causality. The artist side reads it as proof that creative freedom is
         a growth strategy. The corporate side reads it as proof the system works: companies scouted
         these writers, trained them for years, then handed over the pen once they'd earned it —
         autonomy as graduation, not as right.`,
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
      framing: {
        angle: `This is the AGAINST side's economic exhibit and the FOR side's adoption story. Whoever
          claims it first frames it; whoever claims it second must explain it away.`,
        useFor: 'These acts prove the system works: identify talent, fund it for years, hand over the pen once it’s earned.',
        useAgainst: 'These acts prove control is unnecessary: the best commercial outcomes happened exactly where control was loosened.',
        counters: [
          { they: 'They earned autonomy — trainees haven’t.',
            you: 'Earned by what metric, judged by whom? A right that one party grants for good behavior is a privilege, and privileges get revoked.' },
        ],
        lines: [
          'The most valuable export K-pop ever produced was written by the artists themselves.',
          'If freedom had to be earned, note who got to set the price.',
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
        `The artists who litigated form the debate's casualty list and its evidence base. Their common
         claim: the exclusive-contract system leaves no internal path to autonomy, so exit — however
         ruinous — becomes the only move. Their common fate: courts usually side with companies,
         and the industry's informal machinery (tampering norms, casting chill) punishes even winners.`,
        `The exceptions define the boundaries. Chuu won — her agency's conduct was egregious enough to
         void the relationship and defeat the defamation counterattack. Fifty Fifty lost everything at
         their commercial peak. NewJeans lost legally but moved global opinion. Together they map what
         the current system permits, punishes, and cannot survive being seen doing.`,
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
      framing: {
        angle: `Argue patterns, not personalities: any single case can be explained away, but five
          cases in four years with the same shape is a system describing itself.`,
        useFor: 'The pattern is tampering and bad advice, not oppression: courts examined each case and upheld contracts almost every time.',
        useAgainst: 'The pattern is desperation: artists at their commercial peak keep choosing career destruction over staying.',
        counters: [
          { they: 'Courts keep ruling for companies — the artists were simply wrong.',
            you: 'Courts apply the contracts as written; the debate is whether contracts written by one side, signed by teenagers, should be the last word. Citing the scoreboard assumes the rules.' },
        ],
        lines: [
          'People at the peak of their careers do not jump off it for fun — measure the system by what its stars are willing to lose to leave it.',
          'Chuu’s win tells you where the line is; everything north of that line is legal.',
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
        `Organized fandoms are the industry's only non-state check that companies actually fear.
         Truck protests outside headquarters, advertiser boycott campaigns, mass refund demands,
         translated court filings, regulatory complaints — fan collectives perform oversight,
         advocacy, and punishment functions that no formal institution provides for artists.`,
        `The complication is that fan power points wherever fans aim it: the same machinery defends
         artists from agencies one month and polices artists' dating lives the next. Fans are
         simultaneously the artist side's army and the original reason agencies built private-life
         control — both sides of the committee can recruit them, and both should be nervous doing so.`,
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
      framing: {
        angle: `Cite fans as evidence about legitimacy, not law: courts measure contracts, fandoms
          measure consent of the audience the whole industry monetizes.`,
        useFor: 'Fan economics justify image management: one scandal collapses revenue for the whole group and its staff.',
        useAgainst: 'Fans themselves are rejecting that bargain — the people the control supposedly serves are protesting against it.',
        counters: [
          { they: 'Fan campaigns are emotional noise, not evidence.',
            you: 'That noise is the revenue. An industry built on monetizing fan sentiment doesn’t get to dismiss fan sentiment when it turns critical.' },
        ],
        lines: [
          'The industry’s only effective labor union is made of its customers.',
          'When the people paying for the product protest the treatment of the people making it, the business model is on notice.',
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
    <button data-tab="t4">🎭 Framing</button>
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
    <h2 class="sec"><span class="bar"></span>Committee Framing</h2>
    <div class="cs-block"><h4>🧭 How to frame this player</h4><p>${d.framing.angle}</p></div>
    <div class="positions" style="margin-bottom:18px">
      <div class="pos for"><strong>If you argue pro-corporate</strong>${d.framing.useFor}</div>
      <div class="pos against"><strong>If you argue creative freedom</strong>${d.framing.useAgainst}</div>
    </div>
    <div class="cs-block">
      <h4>🛡️ Counter-arguments</h4>
      ${d.framing.counters.map(c => `
        <div class="counter">
          <div class="they"><strong>If they say:</strong> “${c.they}”</div>
          <div class="you"><strong>You answer:</strong> ${c.you}</div>
        </div>`).join('')}
    </div>
    <div class="cs-block">
      <h4>💬 Lines you can use <span style="font-weight:400;font-size:.74rem;color:var(--text-dim)">(written for this site — not real quotes)</span></h4>
      ${d.framing.lines.map(l => `<div class="soundbite">${l}</div>`).join('')}
    </div>
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
