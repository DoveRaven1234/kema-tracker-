/* =========================================================================
   Players & Stances - data + two renderers.
   On stances.html: renders the card grid; each card links to its dossier.
   On player.html:  renders the full 5-section dossier (Stance, Controversies,
   Case Study, Framing, Verdict & Links) for ?id=<player>, including live
   latest-coverage headlines refreshed daily.
   Requires app.js (esc, fetchFeed, fmtDate, todayKey) loaded first.

   NOTE: "Lines you can use" are editorial debate-prep phrasings written for
   this site - they are NOT quotes from the organizations.
   ========================================================================= */

const gsearch = q => `https://news.google.com/search?q=${encodeURIComponent(q)}`;

const PLAYERS = [
  {
    id: 'hybe', emoji: '🏢', name: 'HYBE', color: 'for',
    badge: 'for', badgeText: 'Pro-corporate',
    blurb: `K-pop's biggest company (BigHit, Pledis, ADOR, KOZ, Source Music + US/Japan/Latin arms).
      Champions the multi-label model as creative freedom <em>within</em> structure - then spent
      2024-25 enforcing the ADOR/NewJeans contracts in court.`,
    facts: ['Founded 2005 (as Big Hit) by Bang Si-hyuk', 'IPO 2020 - biggest in years on KOSPI', 'BTS · SEVENTEEN · TXT · ENHYPEN · LE SSERAFIM', 'Multi-label: ADOR, Pledis, KOZ, Source + global arms'],
    query: 'HYBE entertainment k-pop',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> HYBE is the largest entertainment company in K-pop history -
         a holding structure over BigHit Music, Pledis, ADOR, KOZ, Source Music and overseas arms in
         the US, Japan, and Latin America, plus the Weverse platform. It was the industry's biggest
         IPO (2020) and is the only K-pop company whose scale puts it in conversation with Western
         major labels. Whatever HYBE does becomes, by weight alone, industry policy.`,
        `<strong>On creative control.</strong> HYBE's official architecture is "creative independence
         within structure": each label keeps its own producers, identity, and roster, while
         headquarters owns capital allocation, governance, and distribution. The ADOR experiment was
         the showcase of this philosophy - and its collapse demonstrated the fine print: creative
         independence is delegated, revocable, and subordinate to shareholder interest whenever the
         two collide.`,
        `<strong>On contracts and talent.</strong> HYBE treats the exclusive contract as the
         load-bearing wall of the entire business: years of unprofitable trainee investment are only
         rational if the company captures the profitable years that follow. Its renewal record with
         established acts (BTS, SEVENTEEN renewed early and amicably) is genuinely strong - its
         tolerance for unilateral exit is zero, and it litigates exits as existential threats rather
         than personnel matters.`,
        `<strong>In disputes.</strong> The 2024-26 record shows a consistent playbook: audit first,
         remove leadership through board control, enforce contracts through injunctions, and accept
         enormous reputational damage as the cost of preserving precedent. HYBE repeatedly chose the
         legally-winning, publicly-losing move - which tells you it believes the precedent is worth
         more than the public.`,
        `<strong>Trajectory (2026).</strong> Expansion continues outward - India, Latin America,
         US-formed groups, AI ventures - meaning HYBE is exporting not just K-pop but the K-pop
         management model into jurisdictions with stronger labor norms. Simultaneously it faces
         National Assembly scrutiny and regulator attention at home. The company that most benefits
         from the current rules is also the one most likely to trigger their rewriting.`,
      ],
      controversies: [
        { yr: '2024', title: 'Internal monitoring reports', sev: 'high',
          desc: 'Leaked internal documents commenting on other companies’ idols trigger a National Assembly hearing and a public apology. Fuel for the "idols as assets" critique.',
          detail: `<p>In late 2024, Korean media published excerpts from internal HYBE industry reports
            that contained blunt, often crude commentary on idols from rival companies and even
            HYBE's own labels: assessments of appearance, speculation about private matters, and
            cold evaluations of commercial viability. The documents had circulated to executives as
            routine market intelligence, which was precisely the problem: this was not a rogue
            employee but an institutional habit of describing human beings the way an analyst
            describes inventory.</p>
            <p>The fallout was immediate. Chairman Bang Si-hyuk was summoned before a National
            Assembly audit session, the company apologized publicly, and rival agencies issued rare
            statements of protest. For delegates, the episode matters less for the rudeness than for
            the worldview it documented: the industry's largest company internally categorizing
            artists, including minors, as assets to be graded.</p>
            <p class="kf"><strong>Key framing:</strong> this is the artist side's best evidence that
            "idols as products" is not a metaphor but an operating practice, written down by the
            market leader itself. The corporate counter is that market analysis exists in every
            industry and conduct rules, not structures, should answer for its tone.</p>` },
        { yr: '2024-25', title: 'ADOR / Min Hee-jin war', sev: 'high',
          desc: 'Audit, ouster, dueling press conferences, shareholder suits. The "creative independence within HYBE" promise collapses in full public view.',
          detail: `<p>The conflict began in April 2024 when HYBE launched a surprise audit of ADOR,
            alleging that Min Hee-jin and associates had explored taking the label independent.
            Her response was a press conference unlike anything the industry had seen: raw,
            profanity-laced, accusing HYBE of copying NewJeans' formula with a newer group and of
            treating creative independence as a marketing slogan. Public opinion split overnight,
            and the phrase "multi-label" stopped meaning innovation and started meaning dispute.</p>
            <p>Over the following months HYBE used its board majority to remove her as CEO, settled
            into shareholder litigation over her put option, and watched its own artists side with
            their producer. By the time she exited entirely, the question had escalated from one
            label's governance to the structural one this committee debates: can creative autonomy
            survive inside a conglomerate when it stops being convenient?</p>
            <p class="kf"><strong>Key framing:</strong> HYBE won the corporate fight and lost the
            narrative. Cite the mechanics (audit, board vote, injunction) for the corporate
            reading, and the sequence (autonomy revoked the moment it threatened control) for the
            artist reading.</p>` },
        { yr: '2024-26', title: 'NewJeans contract enforcement', sev: 'high',
          desc: 'Injunctions block the group from independent activities; ADOR later terminates Danielle’s contract and pursues a damages claim reported near ₩33bn.',
          detail: `<p>After NewJeans declared their exclusive contracts terminated in November 2024,
            ADOR (by then fully under HYBE-appointed management) went to court and won: injunctions
            barred the members from independent advertising, performing, and recording, and the
            courts subsequently upheld the contracts as valid. The members' attempt to operate
            under the name NJZ was blocked, and the industry, guided by tampering norms, kept its
            distance from them throughout.</p>
            <p>In 2026 the conflict entered a harsher phase: ADOR terminated Danielle's contract
            over independent activities and pursued damages reported at roughly ₩33 billion,
            naming family members in related claims. Whatever the final number, the suit converts
            an abstract principle (contracts must be honored) into a concrete price tag for
            leaving, payable by a single artist in her early twenties.</p>
            <p class="kf"><strong>Key framing:</strong> for the corporate side, predictable
            enforcement of a freely signed deal. For the artist side, the demonstration case that
            exit from a K-pop contract is priced beyond any individual's reach, which is the
            definition of a captive workforce.</p>` },
        { yr: '2024-25', title: 'Founder’s pre-IPO share dealings probed', sev: 'med',
          desc: 'Financial regulators examined Bang Si-hyuk’s pre-IPO arrangements with early investors; HYBE contests wrongdoing. Ongoing.',
          detail: `<p>Korean financial authorities examined arrangements around HYBE's 2020 listing
            under which early investors sold shares before the IPO, with reports alleging the
            founder stood to share in their gains through private agreements that public filings
            did not make clear. HYBE has contested characterizations of wrongdoing, and the
            process has moved slowly through referral and review.</p>
            <p>The relevance to this committee is indirect but real: the company whose central
            argument is "trust the corporate structure, it protects everyone's investment" spent
            these years answering questions about whether its own governance disclosures were
            straight with investors. Credibility is a debate resource, and this story spends it.</p>
            <p class="kf"><strong>Key framing:</strong> use with care and label it contested. Its
            value is the parallel: if corporate governance needs regulators watching, artist
            contracts may too.</p>` },
        { yr: '2023', title: 'SM takeover battle', sev: 'med',
          desc: 'HYBE’s attempt to take over SM (lost to Kakao) raised concentration concerns: one company nearly controlled both of K-pop’s biggest rosters.',
          detail: `<p>In early 2023 HYBE bought founder Lee Soo-man's SM stake and launched a tender
            offer, briefly standing one transaction away from controlling both its own roster and
            SM's. Kakao counter-bid, the price war escalated, and HYBE ultimately withdrew, selling
            its position as Kakao took control. Regulators reviewed the endgame; artists were
            consulted at no point in any of it.</p>
            <p>The episode matters here as a concentration warning: the futures of dozens of
            artists, from BTS to aespa, were negotiated entirely as share blocks. Whichever side
            won, the people whose careers were the actual assets had no seat, no veto, and no
            information beyond the headlines.</p>
            <p class="kf"><strong>Key framing:</strong> the cleanest illustration that in the
            current structure, artists are the object of corporate competition, never a party
            to it.</p>` },
      ],
      caseStudy: {
        title: 'Case study: the NewJeans war, the multi-label promise on trial',
        intro: `ADOR was created in 2021 as the proof-of-concept: a label inside HYBE led by creative
          director Min Hee-jin, with its own visual identity, its own roster, and a public promise of
          operational independence. NewJeans debuted in 2022 and became the biggest new act of its
          generation almost immediately, which made the experiment look like a triumph and made its
          eventual stress test inevitable. When the interests of the parent and the label diverged,
          every layer of the structure (equity, board seats, contracts, fandom, courts) was pulled
          into the fight, which is why this single case touches every issue in the committee binder.`,
        timeline: [
          ['2021', 'HYBE establishes ADOR with Min Hee-jin as CEO and minority shareholder, marketed as proof that creative independence can live inside a conglomerate.'],
          ['2022-23', 'NewJeans debut and dominate: a distinct auteur-led concept, global charting, and the industry reading their success as vindication of artist-centered production.'],
          ['2024 Apr', 'HYBE audits Min Hee-jin alleging a plan to take ADOR independent; her viral press conference splits public opinion and globalizes the dispute.'],
          ['2024 Aug-Nov', 'Min Hee-jin is removed as CEO and then exits entirely. NewJeans publicly demand her reinstatement, then declare their contracts terminated and attempt to operate as NJZ.'],
          ['2025', 'Courts grant ADOR injunctions blocking independent activities and uphold the contracts as valid; the members return to limbo rather than to work.'],
          ['2026', 'ADOR terminates Danielle’s contract over independent activities and pursues damages reported near ₩33bn; prosecutors decline Min Hee-jin’s criminal complaint against HYBE. Hearings continue.'],
        ],
        outcome: `Legally, a near-total corporate victory: the contracts held at every stage, the
          injunctions were granted, and the criminal complaints went nowhere. Reputationally, the most
          damaging episode in HYBE's history: a global, years-long story about who owns an artist,
          taught to an audience that had never previously read about Korean contract law. The
          experiment ADOR was built to run is over, and its result is cited by both sides.`,
        framing: `Decide before committee which reading you will defend, because this case will come up
          regardless of your side. The corporate reading is governance: a subsidiary executive tried to
          take company property, and the system's checks (audit, board, courts) worked exactly as
          designed. The artist reading is structural: the one serious attempt at creative autonomy
          inside a conglomerate was dismantled within three years of succeeding, and five artists with
          no stake in the corporate fight lost years of their careers as collateral. The strongest
          delegates will argue one and pre-empt the other.`,
        provesFor: 'Courts repeatedly found the contracts valid and the investment-protection logic sound. The system held under maximum pressure.',
        provesAgainst: 'The one serious experiment in autonomy within a corporation ended in audits and injunctions, suggesting the autonomy was always conditional.',
      },
      relations: {
        stance: `Firmly pro-corporate-control. HYBE is the model's chief institutional defender -
          not out of ideology but exposure: it has more capital invested in exclusive contracts than
          anyone else, so any weakening of contract enforcement costs HYBE the most. Expect it to
          concede artist-welfare process (counseling, transparency) readily, and contract-power
          substance (exit rights, penalty caps) never.`,
        allies: [
          { name: 'KEMA', why: 'The association’s tampering doctrine and contract-enforcement posture protect HYBE’s core interest in every dispute.' },
          { name: 'SM · JYP · YG (the majors)', why: 'Fierce business rivals, doctrinal allies - on contracts, trainee investment, and exit enforcement they vote as a bloc.' },
          { name: 'Institutional investors', why: 'KOSPI shareholders demand contract enforcement; every artist-side concession is a stock-price event (see the 2024-25 volatility).' },
          { name: 'The current legal framework', why: 'Courts applying existing contract law have ruled for HYBE at nearly every step of the NewJeans saga - the status quo is its ally.' },
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
          2024-26 conflicts as the AGAINST side's best evidence - often in the same speech.`,
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
         the idol-production pipeline that defines the industry - systematic casting, multi-year
         training, in-house songwriting camps, total concept design, organized fandom management.
         Every company in this debate, including HYBE, runs on machinery SM built first. Since 2023
         it has been controlled by Kakao after the industry's wildest takeover battle.`,
        `<strong>On creative control.</strong> Lee Soo-man's "cultural technology" doctrine codified
         creative decisions into a corporate manual - famously detailed down to choreography angles
         and concept rollouts. The artist, in this philosophy, is one input into a repeatable
         star-manufacturing process. "SM 3.0" (post-Kakao) decentralizes execution into multiple
         in-house production centers, but ownership of the creative process never leaves the company.`,
        `<strong>On contracts and talent.</strong> SM operates under the reformed standard its own
         scandal created: the 2009 TVXQ lawsuit produced the KFTC's 7-year cap and template contract.
         Its rosters are the industry's longest-running (TVXQ, Girls' Generation, EXO, NCT's
         open-member experiment), which it cites as proof of stability; its critics cite the same
         longevity as proof exit is functionally impossible.`,
        `<strong>In disputes.</strong> Three waves of artist conflict - TVXQ/JYJ (2009), EXO's Kris,
         Luhan and Tao plus Jessica (2014-15), and periodic fan-led revolts since - taught SM to
         settle quietly and avoid courtroom spectacle. The alleged informal blacklisting of JYJ after
         their legal win remains the industry's defining cautionary tale about the price of winning.`,
        `<strong>Trajectory (2026).</strong> The founder is gone (ousted amid the Kakao takeover and
         his own royalty-contract controversy), yet the model runs on without him - the strongest
         evidence that the control architecture is institutional, not personal. SM now answers to a
         platform conglomerate (Kakao) with its own regulatory baggage, adding a second layer of
         corporate interest above the artists.`,
      ],
      controversies: [
        { yr: '2009', title: 'TVXQ "slave contract" lawsuit', sev: 'high',
          desc: 'Three members sue over a 13-year contract with punishing terms. The fallout produces the KFTC’s 7-year cap and standard contract: the legal foundation of the entire modern debate.',
          detail: `<p>In July 2009, three members of TVXQ (then the biggest boy group in Asia) filed
            for an injunction against SM, arguing their 13-year exclusive contract was effectively
            lifetime servitude: terms ran from signing rather than debut, income splits left the
            members with a small fraction of revenue their work generated, and penalty clauses for
            early exit were set at multiples of total investment plus projected profits. The Seoul
            court agreed in part, calling the duration and penalty structure excessively one-sided.</p>
            <p>The case did what no artist complaint had done before: it forced a structural answer.
            The Korea Fair Trade Commission capped exclusive contracts at 7 years and published a
            standard contract template that the majors nominally adopted. The phrase "slave
            contract" entered global coverage of K-pop and has framed every dispute since.</p>
            <p class="kf"><strong>Key framing:</strong> the founding precedent both sides cite. For
            artists: proof the original architecture was abusive and only litigation fixed it. For
            companies: proof the industry already underwent its great reform and survived.</p>` },
        { yr: '2014', title: 'EXO exits & Jessica’s removal', sev: 'med',
          desc: 'Kris and Luhan file to nullify their contracts citing health and unequal treatment; Jessica exits Girls’ Generation. Proof the 2009 reforms didn’t end the conflict.',
          detail: `<p>Five years after the TVXQ reforms, EXO's Chinese members Kris and Luhan filed
            consecutive suits to nullify their SM contracts, citing health problems, schedule
            overload, and treatment unequal to Korean members. Tao followed in 2015. The same year,
            Jessica was abruptly removed from Girls' Generation amid friction over her business
            activities, learning of aspects of her own situation through the press.</p>
            <p>The cases settled confidentially over years, with the departed members building
            careers in China that SM could not practically police. The lesson the industry took was
            jurisdictional (foreign members are harder to hold); the lesson the artist side took
            was structural: the reformed 7-year contract still produced exits desperate enough to
            litigate, five years into the new rulebook.</p>
            <p class="kf"><strong>Key framing:</strong> the strongest evidence that the 2009 reform
            shortened the leash without changing what the leash is for. When the same company
            generates artist revolts under both rulebooks, the variable is the model, not the
            contract length.</p>` },
        { yr: '2023', title: 'Founder ousted; HYBE-Kakao takeover war', sev: 'med',
          desc: 'Lee Soo-man’s side deals (Like Planning royalties) exposed; a hostile takeover battle ends with Kakao in control. Governance, not artistry, decided who runs the creative process.',
          detail: `<p>The takeover fight began with SM's own management moving against its founder:
            executives publicly broke with Lee Soo-man over Like Planning, his personal company
            that had collected producing royalties from SM for decades, an arrangement critics
            called self-dealing at the artists' expense. Lee sold his stake to HYBE; SM management
            backed Kakao; a tender-offer war followed, and Kakao won control while regulators
            later scrutinized trading around the battle.</p>
            <p>For this debate, the instructive part is what the fight was about and what it was
            never about. Months of warfare over who owns the creative process, conducted entirely
            in the language of share blocks and board seats, with the artists who constitute that
            process informed by press release. The "cultural technology" the founder built proved
            transferable, like any other asset.</p>
            <p class="kf"><strong>Key framing:</strong> when the industry says the company IS the
            creativity, point here: the creativity changed hands in a stock deal, and not one
            artist was consulted.</p>` },
      ],
      caseStudy: {
        title: 'Case study: TVXQ 2009, the case that built the rulebook',
        intro: `Three members of K-pop's then-biggest group sued SM over a 13-year exclusive contract
          whose income splits and penalty clauses, they argued, made leaving economically impossible.
          It became the founding case of K-pop contract law: the source of the 7-year cap, the
          standard contract, and the vocabulary ("slave contract") that the global press still uses.
          Every dispute in the 2020s is, in some sense, an appeal of this case.`,
        timeline: [
          ['2009 Jul', 'Members file for an injunction; the court partially sides with them, calling the 13-year duration and penalty structure excessively one-sided.'],
          ['2009-10', 'The KFTC responds structurally: a 7-year ceiling on exclusive contracts and a standard contract template that all major agencies nominally adopt.'],
          ['2010-12', 'The trio promote as JYJ while litigation continues; broadcasters largely stop booking them, in what is widely described as informal industry blacklisting.'],
          ['2012', 'Settlement ends the suit. JYJ remain commercially active but never return to major music broadcasts; the two remaining members continue as TVXQ under SM.'],
        ],
        outcome: `Artists won the legal principle and paid the career price: contracts shortened
          industry-wide, but training-cost recoupment, renewal-time pressure, and informal blacklisting
          preserved most of the company-side leverage. JYJ's broadcast exile lasted the rest of their
          peak years, and the industry learned that even a winning artist can be made an example of.
          The pattern set here (scandal, narrow reform, adaptation around the reform) has repeated in
          every cycle since.`,
        framing: `Use this case to set the historical frame for whatever you argue. It proves
          simultaneously that regulation of this industry is possible and effective (the cap held for
          fifteen years) and that regulation of terms does not reach the underlying power structure
          (the blacklisting was never punished, and the disputes of 2022-26 are recognizably the same
          fight). Whoever owns the TVXQ story in committee owns the debate's origin myth.`,
        provesFor: 'The system self-corrects: the worst abuses were outlawed fifteen years ago, and the industry kept thriving under the reformed rules.',
        provesAgainst: 'Winning in court cost JYJ their broadcast careers. The formal rules changed; the power structure that punishes exit did not.',
      },
      relations: {
        stance: `Pro-corporate-control - the historical architect. SM's institutional identity IS the
          production system, so it cannot concede that centralized creative control is the problem
          without conceding itself. Expect process modernization ("3.0", artist "individuality"
          marketing) and zero structural concession on who owns the creative pipeline.`,
        allies: [
          { name: 'Kakao', why: 'Its controlling shareholder - a platform giant whose content strategy depends on SM’s pipeline running exactly as designed.' },
          { name: 'KEMA & the majors', why: 'SM practices became the industry standards KEMA codifies; on contract doctrine the majors defend SM precedents as their own.' },
          { name: 'The trainee pipeline’s beneficiaries', why: 'Generations of successful SM artists and producers whose careers validate the system - the company’s living evidence.' },
        ],
        opponents: [
          { name: 'Its own alumni', why: 'JYJ, Kris/Luhan/Tao, Jessica - the industry’s longest list of artists who fought the same company over the same structural terms.' },
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
    blurb: `Markets itself as the artist-wellbeing major - amicable full-group renewals (TWICE,
      Stray Kids), founder talk of health and values. Production stays firmly in-house, and the
      2026 VCHA lawsuit in the US is testing the gap between image and practice.`,
    facts: ['Founded 1997 by Park Jin-young', 'TWICE · Stray Kids · ITZY · NMIXX · NiziU · VCHA', 'Known for full-group contract renewals', 'Localized groups: Japan (NiziU), US (VCHA)'],
    query: '"JYP Entertainment"',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> Founded 1997 by Park Jin-young - the only major whose founder
         is himself a still-active performing artist and producer. Home to TWICE, Stray Kids, ITZY,
         NMIXX, and the localization experiments NiziU (Japan) and VCHA (US). JYP brands itself as
         the values-driven major: "artist first," health over schedules, longevity over peaks.`,
        `<strong>On creative control.</strong> Production and concept authority remain centralized -
         Park Jin-young personally shaped the company's sound for decades - but JYP runs the
         industry's most visible internal exception: Stray Kids debuted *because* its members
         (3RACHA) produce their own music. The company's revealed position: creative input is a
         feature it grants when it sells, not a right it recognizes.`,
        `<strong>On contracts and talent.</strong> The renewal record is the best in the industry -
         TWICE and Stray Kids re-signed as full groups, and GOT7's 2021 exit was amicable enough that
         the members kept using the group name. At the same time, JYP is the major that most openly
         admits private-life policy: a stated 3-year dating ban for new artists, framed as protecting
         both the group and the artist's development.`,
        `<strong>In disputes.</strong> JYP historically avoids public contract wars - until VCHA.
         Facing KG's 2026 abuse and mistreatment allegations in a US court, the company responded
         with firm public denial and legal defense, showing that under its softer brand sits the
         same enforcement instinct as its peers when the model itself is challenged.`,
        `<strong>Trajectory (2026).</strong> JYP's strategic bet is exporting the system itself -
         build local idols with K-pop methodology in Japan, the US, and beyond. That makes the KG
         case existential beyond its size: if the methodology is found abusive under US law, the
         export strategy, not just one group, is what's on trial.`,
      ],
      controversies: [
        { yr: '2026', title: 'VCHA’s KG sues JYP USA', sev: 'high',
          desc: 'A member of JYP’s US-formed group files to terminate her contract alleging abuse and mistreatment: the first major test of the K-pop management model under American labor norms. Ongoing; JYP disputes the allegations.',
          detail: `<p>KG, recruited as a teenager through JYP's televised A2K auditions and debuted in
            the US-based group VCHA, filed suit against JYP USA seeking contract termination. Her
            filings allege a working environment of abuse and mistreatment, describing intense
            weight management, surveillance-level oversight, isolation from support systems, and
            conditions she argues no US employer of minors could lawfully run. She announced her
            departure publicly while the group's activities froze around the litigation.</p>
            <p>JYP USA has disputed the allegations in strong terms and defended its practices.
            What neither side disputes is the stakes: this is the first time a US court will
            examine a standard K-pop training-and-management contract under American employment
            and minor-protection law, with discovery potentially exposing the model's internal
            mechanics to a legal system with no cultural deference to it.</p>
            <p class="kf"><strong>Key framing:</strong> bigger than one rookie group. If the claims
            succeed, every K-pop localization project in the US inherits the precedent; if they
            fail, the industry gains a ruling that its methods pass the strictest available test.</p>` },
        { yr: 'policy', title: 'Openly acknowledged dating ban', sev: 'med',
          desc: 'JYP has publicly described a 3-year no-dating rule for new artists: the industry’s most candid admission that private-life control is policy, not accident.',
          detail: `<p>Where other agencies deny or euphemize private-life rules, Park Jin-young has
            discussed JYP's openly on television: roughly three years of no dating for newly
            debuted artists, framed as protecting both the group's launch and the young artist's
            focus during the most fragile stage of a career. Fans and trainees widely corroborate
            the rule's reality across JYP groups.</p>
            <p>The candor cuts both ways. It spares JYP the hypocrisy charge and lets it argue the
            restriction is disclosed, time-limited, and consented to. It also hands the artist side
            its cleanest exhibit: a major company confirming, on the record, that contracts and
            policy reach into whom an adult employee may love, which no other legal industry would
            say aloud.</p>
            <p class="kf"><strong>Key framing:</strong> cite this whenever a corporate delegate
            claims private-life control is rumor or relic. The friendliest major in the industry
            confirms it as current, deliberate policy.</p>` },
        { yr: '2010s', title: 'Trainee regime strictness', sev: 'low',
          desc: 'Former trainees and idols describe weight monitoring and intense evaluation culture: standard across the industry, but at odds with the wellbeing brand.',
          detail: `<p>Accounts from former JYP trainees and debuted artists over the years describe
            regular weigh-ins, monthly evaluations that determine survival in the program, and the
            constant awareness that years of effort can end in a single review meeting. None of
            this is unique to JYP; much of it is the industry baseline, and JYP's version is often
            described as more humane than most.</p>
            <p>It earns a place in this dossier because of the brand gap: the company that markets
            artist wellbeing most loudly still runs a pipeline in which children compete for years
            under continuous physical evaluation. The defense is real (the training works, and JYP
            invests in health support); the tension with the brand is also real.</p>
            <p class="kf"><strong>Key framing:</strong> useful for calibrating claims. JYP shows the
            system at its best behavior, and its best behavior still includes weigh-ins for
            fourteen-year-olds.</p>` },
      ],
      caseStudy: {
        title: 'Case study: VCHA, the model meets US labor law',
        intro: `VCHA was JYP's attempt to run the complete K-pop pipeline on American soil: televised
          global auditions (A2K, with Republic Records), a multinational group formed in public, and
          debut under JYP USA with Seoul-style training and management transplanted to Los Angeles.
          The bet was that the methodology itself, not just the music, was the export. KG's 2026
          lawsuit turned that bet into a court question, and the answer will bind far more than one
          group: every agency planning Western localization is watching this docket.`,
        timeline: [
          ['2023', 'VCHA formed through the A2K (America2Korea) audition project with Republic Records; members are mostly minors at formation.'],
          ['2024', 'Debut and promotion under JYP USA, marketed explicitly as K-pop methodology applied to a US group.'],
          ['2025', 'Activity slows amid internal strain; the localization experiment is already under quiet pressure before any filing.'],
          ['2026', 'KG files suit alleging abuse and mistreatment and seeking termination; JYP USA disputes the claims publicly. Discovery and hearings ongoing.'],
        ],
        outcome: `Undecided, which is exactly why it matters. A US court will effectively rule on
          whether standard K-pop management practices (training-cost structures, conduct rules,
          schedule control, treatment of minors) survive a legal system with stronger labor
          protections and no cultural deference to the trainee model. Either outcome creates the
          controlling precedent for the industry's entire Western expansion strategy.`,
        framing: `Frame this as the jurisdictional stress test. The Korean legal system co-evolved
          with the management model for thirty years; US employment law did not, and it will read the
          same contract cold. If the model only functions in the legal environment that grew up
          around it, that is itself an answer to the committee's question about whether the balance
          is right. If it passes, the corporate bloc gains its strongest possible validation.`,
        provesFor: 'One lawsuit among hundreds of artists; if the claims fail in the artist-friendliest legal environment, the model is vindicated.',
        provesAgainst: 'The company with the best reputation in the industry is the one being tested. If even JYP’s export can’t pass US standards, the problem is the model, not the operator.',
      },
      relations: {
        stance: `Pro-corporate-control, softest edge. JYP genuinely invests in artist relations and
          can point to the receipts - but its position in the debate is unambiguous: the company,
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
    blurb: `Historically the tightest image manager - long hiatuses, heavy gatekeeping, strict
      conduct expectations. Yet BLACKPINK's 2023 hybrid renewal became the industry's most-watched
      experiment in splitting corporate control from individual freedom.`,
    facts: ['Founded 1996 by Yang Hyun-suk', 'BIGBANG · BLACKPINK · TREASURE · BABYMONSTER', 'Reputation: strictest image control of the majors'],
    query: '"YG Entertainment"',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> Founded 1996 by Yang Hyun-suk out of Seo Taiji and Boys'
         legacy - the major with a hip-hop "crew" identity and the industry's most curated release
         strategy. Home historically to BIGBANG, 2NE1, and BLACKPINK; currently rebuilding around
         TREASURE and BABYMONSTER after a bruising half-decade.`,
        `<strong>On creative control.</strong> YG's control style is aesthetic and temporal rather
         than micromanagerial: a strong house sound (long anchored by producer Teddy), heavy brand
         gatekeeping, and total control of *when* artists work - the years-long gaps fans call "the
         dungeon." Top-tier artists get real creative input (G-Dragon's auteur status was a selling
         point); everyone below that tier waits.`,
        `<strong>On contracts and talent.</strong> Strict conduct expectations and image discipline
         were the YG brand long before the industry standardized them. Then came the 2023 BLACKPINK
         renewal: group activities under YG, each member's solo career managed by her own company.
         It is the single most important voluntary unbundling of corporate control in K-pop history -
         and YG signed it because the alternative was losing everything.`,
        `<strong>In disputes.</strong> YG's crises have been governance, not contract, disputes: the
         2019 Burning Sun scandal took down Seungri and forced the founder's resignation, followed by
         years of legal proceedings around him. Artist conflicts, by contrast, get handled through
         silence and shelving rather than courtrooms - control exercised by calendar.`,
        `<strong>Trajectory (2026).</strong> The BLACKPINK hybrid is now the precedent every
         negotiating superstar cites, making YG the accidental author of the industry's most
         artist-favorable template. Whether the company repeats it for TREASURE or BABYMONSTER -
         artists without world-historical leverage - is the live test of whether 2023 was evolution
         or a one-time ransom.`,
      ],
      controversies: [
        { yr: '2019', title: 'Burning Sun scandal', sev: 'high',
          desc: 'Seungri retires amid the club scandal; founder Yang Hyun-suk steps down as related allegations pile up. The industry’s biggest governance failure.',
          detail: `<p>What began as an assault report at the Burning Sun club in Gangnam unraveled
            into the largest scandal in K-pop history: investigations spanning prostitution
            mediation, illegal filming shared in group chats, drug distribution, and alleged
            police collusion. BIGBANG's Seungri, a club director, retired from the industry and
            was later convicted on multiple charges. Within months, founder Yang Hyun-suk
            resigned all positions as separate allegations accumulated around him.</p>
            <p>For this committee, Burning Sun is the governance exhibit: the company that
            enforced the industry's strictest conduct rules on its artists proved unable, or
            unwilling, to govern its own leadership. The asymmetry is the point. Contractual
            morality clauses bound twenty-year-old performers while the corporate tier above
            them operated without equivalent constraint until prosecutors arrived.</p>
            <p class="kf"><strong>Key framing:</strong> whenever image-control clauses are
            defended as protecting collective reputation, Burning Sun answers: the greatest
            reputational damage in K-pop history came from the controllers, not the controlled.</p>` },
        { yr: '2019-23', title: 'Founder’s legal saga', sev: 'med',
          desc: 'Yang Hyun-suk faces years of proceedings over alleged witness intimidation connected to a trainee’s drug case. A long shadow over the company’s leadership.',
          detail: `<p>Prosecutors alleged that in 2016 Yang Hyun-suk pressured a trainee to retract
            her statement to police about drug use by then-YG artist B.I, in a meeting she
            described as intimidating. The legal process ran for years: acquittal at first
            instance, partial reversal on appeal with a suspended sentence, and continuing
            argument over what the episode said about how far an agency chief would go to
            manage a narrative.</p>
            <p>The substance matters less here than the power relation it illuminated: a
            teenage trainee, career entirely in the company's hands, summoned to discuss her
            police testimony with the most powerful man in her professional world. Whatever the
            courts concluded about criminality, the structural imbalance was undisputed by
            anyone.</p>
            <p class="kf"><strong>Key framing:</strong> the clearest single illustration of why
            "voluntary" anything (statements, contracts, consent) is a strained concept when
            one party controls the other's entire future.</p>` },
        { yr: 'ongoing', title: 'The "YG dungeon" reputation', sev: 'low',
          desc: 'Fan shorthand for years-long gaps between releases: the artist-side complaint that control includes the right to shelve careers.',
          detail: `<p>"The dungeon" is fandom shorthand for YG's habit of leaving artists
            unreleased and unscheduled for years at a stretch: 2NE1's long freeze before
            disbandment, WINNER and iKON's gaps, solo projects announced and shelved. YG frames
            it as quality control and brand scarcity; for the artists inside it, a shelving is
            functionally a suspension with no appeal process, served in silence under an
            exclusive contract that forbids working elsewhere.</p>
            <p>The dungeon matters because it shows that control operates through the calendar
            as much as the contract. An agency never needs to breach or terminate to end a
            career; it only needs to schedule nothing, and the 7-year clock runs out on its
            own.</p>
            <p class="kf"><strong>Key framing:</strong> exclusivity without an obligation to
            actually use the artist is an option, not a partnership. Any reform debate about
            contracts should ask what the company owes back.</p>` },
      ],
      caseStudy: {
        title: 'Case study: the BLACKPINK deal, control unbundled',
        intro: `In 2023, after a negotiation the entire industry watched through YG's swinging stock
          price, the world's biggest girl group renewed with YG for group activities only. Each
          member's solo career (music, brands, acting) moved to her own structure: Lisa's LLOUD,
          Jennie's ODD ATELIER, independent management for Jisoo and Rosé. No major K-pop contract
          had ever split the bundle this way, and the deal instantly became the reference point for
          every superstar renewal that followed. It is the industry's one large-scale experiment in
          partial creative freedom, running live.`,
        timeline: [
          ['2023', 'After prolonged negotiation and months of speculation, YG announces the group-only renewal; its stock had swung violently on every rumor in between.'],
          ['2023-24', 'Lisa launches LLOUD and Jennie launches ODD ATELIER; solo music and brand work route through non-YG channels, including Western labels.'],
          ['2025-', 'Group activities (world tour, group releases) proceed under YG while solo careers flourish independently. The hybrid holds under commercial pressure.'],
        ],
        outcome: `A working precedent with real revenue behind it: corporate structure for the
          collective product, individual freedom for personal careers, and both sides visibly
          profiting. YG retained the group asset it could not afford to lose; the members gained the
          autonomy the standard contract never offers. Both blocs in this debate now cite the same
          deal as proof of their position.`,
        framing: `The deal is a natural experiment in what companies actually need versus what they
          customarily take. YG conceded solo-career control and the sky did not fall, which suggests
          much of the standard bundle is habit rather than necessity. The unresolved question is
          distributive: this freedom was priced at BLACKPINK's leverage, the highest in the world.
          A reform argument turns the deal into a template available at standard renewals; a
          corporate argument keeps it an exception that proves the market self-corrects at the top.`,
        provesFor: 'The market solves this without regulation: when artists earn enough leverage, companies adapt voluntarily.',
        provesAgainst: 'Only the single most successful girl group on Earth could buy this freedom. Leverage-based liberty is privilege, not policy.',
      },
      relations: {
        stance: `Pro-corporate-control, strictest legacy - with one historic concession. YG defends
          the model as firmly as any major, but having signed the BLACKPINK unbundling, it cannot
          argue total control is non-negotiable. Its real position: control is the default, and
          freedom is something a superstar may purchase at market price.`,
        allies: [
          { name: 'KEMA & the majors', why: 'Standard alignment on contracts and enforcement; YG’s scarcity discipline is the control model in its purest form.' },
          { name: 'BLACKPINK members (negotiated)', why: 'Former leverage opponents converted into structural partners - the hybrid deal binds both sides’ incentives to keep the group alive.' },
          { name: 'The Black Label', why: 'The Teddy-led affiliated label extends YG’s sound and interests while operating with the autonomy YG’s own artists historically lacked.' },
        ],
        opponents: [
          { name: 'Regulators & prosecutors (post-2019)', why: 'Burning Sun made YG the permanent example of entertainment-industry governance failure; scrutiny never fully left.' },
          { name: 'Fans of shelved artists', why: 'The "dungeon" grievance - organized fandoms protesting years of inactivity are protesting control exercised by calendar.' },
          { name: 'Every renegotiating superstar', why: 'The BLACKPINK precedent is now cited against YG itself by any top-tier artist whose renewal comes due.' },
        ],
      },
      verdict: {
        lean: 20, label: 'Pro-corporate, strictest legacy',
        text: `The strictest of the majors by reputation - and, paradoxically, the author of the
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
      Its collapse - boardroom ouster, dueling lawsuits, NewJeans siding with their producer against
      the parent company - became the defining test case of whether "autonomy within the system" is real.`,
    facts: ['Founded 2021 as HYBE’s independent label', 'Min Hee-jin: ex-SM creative director', 'NewJeans - biggest debut of its generation'],
    query: 'ADOR OR "Min Hee-jin" k-pop',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> ADOR ("All Doors One Room") was founded in 2021 as a HYBE
         subsidiary built around one person: Min Hee-jin, the former SM creative director who shaped
         the visual identity of K-pop's golden era. Its only group, NewJeans, became the biggest
         debut of its generation. ADOR was explicitly pitched as the answer to this debate -
         creative independence, funded by a corporation.`,
        `<strong>On creative control.</strong> Min Hee-jin's philosophy was auteur-led and
         artist-centered: a single creative vision over committee A&R, "natural" concepts as a rebuke
         of the K-pop template, and unusually close producer-artist bonds. NewJeans' success was
         immediately read as market proof that loosening the formula outperforms it - which made the
         experiment threatening as well as profitable.`,
        `<strong>On contracts and equity.</strong> The structural innovation - and the fuse - was
         that creative independence was supposed to be formalized in governance: Min Hee-jin held an
         ADOR equity stake with a put option, and her side claims the shareholder agreement promised
         operational autonomy. The fight that followed was, at bottom, about whether autonomy written
         into a corporate document means anything when the parent controls the board.`,
        `<strong>In disputes.</strong> The 2024-26 war ran through every venue at once: a HYBE audit
         and takeover allegations, a viral press conference, her removal and exit, NewJeans declaring
         their contracts terminated, injunctions enforcing them, Danielle's termination and the ~₩33bn
         claim, and prosecutors declining her criminal complaint against HYBE in 2026. Both sides
         escalated publicly at every step - by design.`,
        `<strong>Trajectory (2026).</strong> ADOR-the-label continues under HYBE management; ADOR-the-
         experiment is dead, and the name now means the dispute. Min Hee-jin's next move is the most
         watched free-agency question in the industry: an independent label by the era's most proven
         creative director would re-run the experiment outside corporate walls - the version the
         debate never got to see.`,
      ],
      controversies: [
        { yr: '2024 Apr', title: 'Audit and viral press conference', sev: 'high',
          desc: 'HYBE alleges a takeover plot; Min Hee-jin’s emotional, profanity-laced press conference becomes a cultural event and splits public opinion along exactly the lines of this debate.',
          detail: `<p>HYBE's audit of ADOR landed without warning: laptops seized, executives
            questioned, and briefings to press alleging Min Hee-jin had explored taking the label
            independent with outside investors. Her answer, days later, was a two-hour live press
            conference in a baseball cap that broke Korean internet records: she accused HYBE of
            manufacturing the plot to seize her put option cheaply, of copying NewJeans' formula
            with a newer in-house group, and of treating the independence it had marketed as
            disposable.</p>
            <p>The performance mattered as much as the claims. A corporate dispute normally
            conducted through filings became a cultural event with memes, merchandise, and
            polling. For the first time, the Korean public at large took sides on a question of
            label governance, and a substantial share sided against the conglomerate. The debate
            this committee simulates went mainstream in a single afternoon.</p>
            <p class="kf"><strong>Key framing:</strong> the moment the creative-freedom argument
            acquired a face and a megaphone. Whatever her motives, she made "who owns the work"
            a dinner-table question, which permanently raised the reputational price of
            enforcement.</p>` },
        { yr: '2024', title: '"Shamanic management" allegations', sev: 'med',
          desc: 'HYBE alleges business decisions were influenced by a shaman adviser; her side calls it character assassination. Emblematic of how personal the corporate conflict became.',
          detail: `<p>Among HYBE's audit disclosures were chat logs suggesting Min Hee-jin consulted
            a shaman adviser on business matters, which the press dubbed "shamanic management."
            Her side answered that the chats were private conversations with a friend,
            weaponized selectively to paint her as unfit, and noted how rarely male executives'
            private counsel becomes an audit headline.</p>
            <p>The episode is included not for its substance but for its function: it marked the
            point where the dispute became a character war. Both sides thereafter litigated in
            the press as much as in court, and the underlying governance questions (what the
            shareholder agreement promised, what independence meant) got buried under
            personality coverage. Delegates should notice the technique; committee debates can
            be derailed the same way.</p>
            <p class="kf"><strong>Key framing:</strong> a caution label, not an argument. When a
            structural debate turns personal, the side with the bigger PR apparatus usually
            wins, and the structural question goes unanswered.</p>` },
        { yr: '2024 Nov', title: 'NewJeans declare termination', sev: 'high',
          desc: 'The group publicly sides with their ousted producer and declares their contracts void: the most dramatic artist revolt in modern K-pop.',
          detail: `<p>After months of public ultimatums (including a live-streamed demand that HYBE
            restore Min Hee-jin to ADOR's leadership), the five members held their own press
            conference and declared their exclusive contracts terminated, citing breach of trust
            and mistreatment, including testimony one member gave about being told to be ignored
            by a manager of another label's artist. They announced they would continue as a group
            without ADOR, later attempting the name NJZ.</p>
            <p>The significance is hard to overstate: the most commercially valuable young group
            in the industry, at the peak of its earning power, chose open war with the largest
            company in K-pop, knowing the contractual penalties. Idols had sued before, quietly,
            through lawyers. NewJeans did it on camera, as a collective, in the language of
            workers describing an employer. Nothing in the industry's playbook had prepared it
            for that.</p>
            <p class="kf"><strong>Key framing:</strong> the revealed-preference argument in its
            purest form. Whatever the contracts said, five people who knew the system from
            inside judged that no future under it was worth more than the cost of leaving.</p>` },
        { yr: '2025-26', title: 'Injunctions, terminations, ₩33bn suit', sev: 'high',
          desc: 'Courts uphold the contracts; ADOR (post-Min) terminates Danielle’s deal over independent activities and sues for a sum reported near ₩33bn. Prosecutors decline Min Hee-jin’s criminal complaint against HYBE.',
          detail: `<p>The legal machinery then did its work. Courts granted ADOR injunctions barring
            independent activities, ruled the contracts valid, and fined attempted NJZ activity.
            In 2026, ADOR terminated Danielle's contract over independent work and filed damages
            claims reported near ₩33 billion, extending to a family member. Separately,
            prosecutors declined to pursue Min Hee-jin's criminal complaint against HYBE,
            closing another front in her favor's column of losses.</p>
            <p>The scoreboard reads as a corporate sweep, and that completeness is itself the
            story. Every institution the artists' side appealed to (civil courts, prosecutors,
            the market) returned the same answer: the contract text governs. Whatever moral
            reading one takes, the system contains no venue in which the artists' grievances,
            as grievances, were ever adjudicated.</p>
            <p class="kf"><strong>Key framing:</strong> for the corporate bloc, finality: the law
            has spoken repeatedly. For the artist bloc, the gap itself: when every venue answers
            "the contract governs" and none answers "was this fair," the missing venue is the
            reform proposal.</p>` },
      ],
      caseStudy: {
        title: 'Case study: three years from experiment to cautionary tale',
        intro: `No single entity packs more of this debate into less time. ADOR was founded as the
          industry's official answer to the creative-freedom question, succeeded beyond any
          projection, and was dismantled the moment its independence became inconvenient to its
          owner. It is simultaneously the best evidence that creative autonomy produces commercial
          results and the best evidence that conglomerate structures cannot tolerate it. Treat the
          full arc, not any single episode, as the unit of analysis: the founding promise, the
          success, the audit, the revolt, and the enforcement are one story.`,
        timeline: [
          ['2021', 'HYBE creates ADOR as an "independent" label under Min Hee-jin, with an equity stake and (her side claims) contractual promises of operational autonomy.'],
          ['2022-23', 'NewJeans debut and become a generational phenomenon with a distinct, auteur-driven identity; ADOR is hailed as the multi-label model’s crown jewel.'],
          ['2024 Apr-Nov', 'Audit, press war, CEO removal, her full exit, and NewJeans’ public termination declaration follow in eight months.'],
          ['2025', 'Injunctions enforce the contracts; the NJZ attempt is blocked; courts uphold ADOR’s position at every stage.'],
          ['2026', 'Danielle’s contract terminated; damages claims reported near ₩33bn proceed; prosecutors decline the criminal complaint against HYBE.'],
        ],
        outcome: `The experiment is dead; the precedent is alive and binding in both directions.
          Corporations learned that promised autonomy creates litigation risk, so future label deals
          will promise less. Artists learned that even written independence evaporates against board
          control, so future creative leaders will demand equity and exit terms up front, or stay
          outside conglomerates entirely. Every "creative independence" announcement in K-pop now
          gets read against ADOR, which may be the dispute's most lasting effect.`,
        framing: `ADOR is the committee's controlled experiment: one variable (autonomy inside a
          conglomerate), run at maximum funding and maximum talent, with a clean result. Argue about
          what the result means, not what happened; the facts are largely undisputed. The corporate
          reading says governance worked and an executive overreached. The artist reading says the
          experiment was never real because revocable autonomy is not autonomy. Your resolution
          should answer the question ADOR left open: what structure would have let this succeed?`,
        provesFor: 'Governance reality: shareholders cannot allow subsidiaries to defect, and courts agreed at every step. Independence was never the deal; investment was.',
        provesAgainst: 'The industry’s one serious attempt at internal creative autonomy was dismantled within three years of succeeding. The system cannot host what the debate asks of it.',
      },
      relations: {
        stance: `Pro-creative-freedom - by position, if not by purity. Min Hee-jin's fight mixed
          genuine creative-autonomy principle with an equity-and-power dispute, but functionally the
          old ADOR stands as the era's creative-freedom standard-bearer: it is the only case where
          autonomy was promised in writing, demonstrated commercially, and then revoked.`,
        allies: [
          { name: 'NewJeans / NJZ', why: 'The artists chose her over the corporation at catastrophic personal cost - the alliance that defines both parties.' },
          { name: 'The Bunnies fandom', why: 'Ran (and runs) the sustained public-pressure campaign keeping the dispute alive after the courts closed it.' },
          { name: 'Creative-industry sympathizers', why: 'Producers, directors, and commentators who read the saga as every creative’s fight with every holding company.' },
        ],
        opponents: [
          { name: 'HYBE & Bang Si-hyuk', why: 'The funder, auditor, and ultimate dismantler of the experiment - and the winner of nearly every court round.' },
          { name: 'Current ADOR management', why: 'The post-Min label enforcing the contracts, terminating Danielle’s deal, and pursuing the ₩33bn claim.' },
          { name: 'KEMA’s tampering doctrine', why: 'Industry norms that froze the members’ market options during the dispute operate squarely against the artists’ side.' },
          { name: 'The court record', why: 'Injunctions, upheld contracts, and a declined criminal complaint - the legal system has consistently read the saga HYBE’s way.' },
        ],
      },
      verdict: {
        lean: 78, label: 'Creative-freedom symbol (contested)',
        text: `Not a clean hero - the leadership fight was also a money-and-power fight - but
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
    blurb: `The Korea Entertainment Management Association represents management companies - it writes
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
         art - and that silence is a position. Its standards govern contracts, payments, and conduct;
         creative decision rights appear nowhere in them, which leaves the default (the company
         decides) untouched. An association that standardizes everything except creative authority
         has effectively standardized creative authority.`,
        `<strong>On contracts.</strong> KEMA's core doctrine is contract sanctity plus anti-tampering:
         exclusive contracts must be honored until formally resolved, and third parties who engage a
         disputing artist threaten the whole industry's investment logic. In practice this extends a
         company's leverage beyond the courtroom - an artist who challenges a contract faces an
         industry-wide chill, not just a lawsuit.`,
        `<strong>In disputes.</strong> The track record reads consistently company-side: backing
         ATTRAKT's position during Fifty Fifty (2023), cautioning the industry against engaging
         NewJeans during their conflict (2024-25). KEMA frames these as neutral standard-keeping;
         no equivalent public warnings against agency over-reach exist to balance the ledger.`,
        `<strong>Trajectory (2026).</strong> Pressure on KEMA is rising from both directions:
         lawmakers cite its toothless mediation when proposing statutes, and fandoms now file
         complaints and publicity campaigns against its interventions. The association faces the
         classic self-regulator's fork - reform into a genuinely neutral arbiter (artist members,
         independent funding, binding arbitration) or watch its functions migrate to the state.`,
      ],
      controversies: [
        { yr: '2023', title: 'Fifty Fifty intervention', sev: 'med',
          desc: 'Backs ATTRAKT’s position and warns the industry against third-party tampering: read by critics as the association choosing its member over the artists by default.',
          detail: `<p>When Fifty Fifty moved against ATTRAKT at the height of "Cupid," KEMA did not
            stay neutral: it issued statements supporting the agency's position and warning the
            industry about external forces inducing contracted artists to breach. The framing
            preceded any judicial finding about who was right; the association's posture was set
            while the facts were still in dispute.</p>
            <p>Defenders note the warning proved prescient (the injunction failed, and courts
            later examined the role of outside advisers). Critics answer that the sequence is
            the problem: an industry body declaring effective guilt-by-framing before a court
            ruled, against four young artists, on behalf of a dues-paying member. Whichever
            reading you take, the case established what KEMA does when a dispute breaks: it
            speaks, early, and for the company.</p>
            <p class="kf"><strong>Key framing:</strong> the test case for whether KEMA can be a
            neutral arbiter. Reform proposals that give it adjudication powers must answer this
            precedent.</p>` },
        { yr: '2024-25', title: 'NewJeans dispute posture', sev: 'med',
          desc: 'Cautions companies against engaging artists in unresolved disputes: effectively narrowing the members’ employment options while litigation runs.',
          detail: `<p>During the NewJeans conflict the association repeated the Fifty Fifty playbook
            at larger scale: public cautions that engaging artists in unresolved contract
            disputes threatens industry order, signals read clearly by advertisers, broadcasters,
            and agencies. The members spent the litigation years in a professional freeze that no
            court ordered; the market, coordinated by norms, imposed it on its own.</p>
            <p>This is the mechanism delegates should understand precisely: KEMA never blacklists
            anyone, which would be legally actionable. It articulates a norm, members and
            adjacent businesses apply it voluntarily, and the result is indistinguishable from a
            sanction while remaining unreviewable by any court. Power exercised as guidance is
            still power.</p>
            <p class="kf"><strong>Key framing:</strong> when assessing any KEMA reform, ask what
            happens to the artist between filing and verdict. Right now the answer is: the
            association's norms decide, and nobody appointed it judge.</p>` },
        { yr: 'structural', title: 'Self-regulation conflict', sev: 'high',
          desc: 'The standing critique: an association funded by management companies cannot neutrally arbitrate artist-versus-company conflicts. Its mediation has no binding power over members.',
          detail: `<p>The deepest controversy is not an event but the org chart. KEMA's members are
            management companies; its budget is their dues; its leadership rotates through their
            executive ranks. It contains no artist members, no independent directors, and no
            external oversight of its standards. Its mediation outcomes are non-binding on the
            companies that fund it, and binding in practice on artists who cannot afford the
            alternative.</p>
            <p>Comparable self-regulators in other fields (medicine, law, finance) operate under
            statutory charters, admit the regulated profession's counterparties, and carry real
            sanction powers. KEMA has none of these. That does not make it useless (its
            standards work raises the industry's floor), but it makes "let KEMA handle it"
            structurally equivalent to "let the companies handle it," which is the position one
            side of this debate already holds.</p>
            <p class="kf"><strong>Key framing:</strong> the committee's own legitimacy problem,
            stated as a controversy. Any resolution that leaves KEMA's structure untouched is
            answering the debate's question with its premise.</p>` },
      ],
      caseStudy: {
        title: 'Case study: the tampering doctrine',
        intro: `KEMA's most consequential tool is not a rule but a norm. By framing artist-side exits
          as "tampering" risks for anyone who might subsequently work with the artist, the
          association extends a company's contractual leverage far beyond the courtroom and into the
          artist's entire future market: advertisers, broadcasters, casting directors, and rival
          agencies all become enforcement nodes without ever receiving an order. Studying how this
          doctrine operated in two disputes shows the committee exactly where private governance
          currently substitutes for law.`,
        timeline: [
          ['2023', 'Fifty Fifty dispute: KEMA’s early statements frame the exit attempt as externally induced; the members’ commercial prospects freeze industry-wide during litigation, and three are eventually dropped.'],
          ['2024-25', 'NewJeans conflict: the same posture at global scale. Advertisers, broadcasters, and agencies keep their distance from the members while the contracts are contested, despite worldwide demand.'],
          ['Ongoing', 'The doctrine becomes anticipatory: artists and their lawyers now price the freeze into any decision to challenge a contract, deterring disputes before they begin.'],
        ],
        outcome: `Artists who challenge contracts face not just a lawsuit but an industry-wide chill
          that begins on filing day and ends, if ever, years later. The deterrent works: for every
          litigated dispute, an unknown number of grievances are swallowed because the price of
          raising them is the freeze. Whether that is responsible standard-keeping or a cartel
          enforcing discipline is, almost verbatim, the question before your committee.`,
        framing: `Treat the doctrine as the committee's central reform target, because it is the one
          mechanism entirely within KEMA's own power to change. No statute or court created it; the
          association's statements and members' coordination sustain it. A resolution could replace
          it with a neutral-status rule (artists in dispute may work under escrow pending judgment),
          which protects contract integrity without market exile. Forcing the corporate bloc to
          defend the current doctrine on its merits is the artist bloc's highest-percentage play.`,
        provesFor: 'Tampering norms protect the integrity of every contract in the industry. Without them, rich rivals could simply shop for unhappy artists.',
        provesAgainst: 'The chill is the punishment: an artist can win in court and still lose their career, because the association coordinates the market against them.',
      },
      relations: {
        stance: `Balancer by mandate, pro-corporate by structure. KEMA's stated mission is industry
          health and dispute resolution; its funding, membership, and track record align it with the
          management side in every contested case. Treat its official neutrality as the open question
          your committee exists to answer.`,
        allies: [
          { name: 'The major agencies', why: 'HYBE, SM, JYP, YG anchor the membership - KEMA’s doctrine on contracts and tampering is their collective interest, codified.' },
          { name: 'Small and mid-tier agencies', why: 'Depend on KEMA standards and tampering norms even more than the majors - they can’t afford to litigate leverage they can get by association rule.' },
          { name: 'Status-quo legal framework', why: 'Courts enforcing contracts as written do KEMA’s doctrinal work for it, letting the association present enforcement as neutral law.' },
        ],
        opponents: [
          { name: 'Artist-side advocates & plaintiff lawyers', why: 'View KEMA mediation as structurally captured; push disputes into courts and legislatures where the association has no home advantage.' },
          { name: 'Organized fandoms', why: 'Treat KEMA interventions (Fifty Fifty, NewJeans) as the industry closing ranks, and campaign against it directly.' },
          { name: 'Reform-minded lawmakers', why: 'Every statute that binds agencies is an implicit verdict that KEMA’s self-regulation failed - the association’s relevance shrinks with each one.' },
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
         regulator - the only body in this debate with statutory power over contract terms across the
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
        `<strong>In disputes.</strong> The KFTC does not referee individual fights - Fifty Fifty and
         NewJeans went to civil court, not to the regulator. Its pattern is to wait for a scandal to
         expose a clause type, then strike that clause industry-wide: systematic, retrospective, and
         always one scandal behind the frontier of dispute.`,
        `<strong>Trajectory (2026).</strong> Each new conflict renews calls for the KFTC to revisit
         the standard contract - penalty formulas, recoupment transparency, post-termination
         restrictions. As the industry globalizes, it also faces a jurisdiction problem: the model's
         newest battlegrounds (US courts, foreign trainees) sit outside its reach entirely.`,
      ],
      controversies: [
        { yr: '2009-10', title: 'The founding intervention', sev: 'med',
          desc: 'The TVXQ fallout produces the 7-year cap and the standard exclusive contract: the most consequential regulatory act in K-pop history.',
          detail: `<p>The KFTC's response to the TVXQ scandal remains the high-water mark of
            structural intervention in this industry: a hard 7-year ceiling on exclusive
            contracts and a published standard contract template covering revenue splits,
            settlement duties, and termination terms. It was regulation born of one case but
            written for the whole market, and the majors adopted the template publicly because
            refusing it after the scandal was commercially impossible.</p>
            <p>Fifteen years on, the intervention's dual legacy is the debate's best evidence
            about regulation itself. The cap held: no major agency runs 13-year contracts
            anymore, and renewal negotiations now happen at moments when artists hold real
            leverage. And the industry thrived after, which permanently weakened the argument
            that artist protections kill competitiveness.</p>
            <p class="kf"><strong>Key framing:</strong> the existence proof. Whenever the
            corporate bloc argues reform is unworkable, the answer is one word long: 2009.</p>` },
        { yr: '2010s-', title: 'Whack-a-mole enforcement', sev: 'med',
          desc: 'Repeated crackdowns force agencies to fix excessive penalty fees, automatic renewals, and overbroad image rights. Similar clauses keep reappearing in new forms.',
          detail: `<p>Since the founding intervention, the KFTC has run periodic sweeps of agency
            contracts and repeatedly ordered corrections: penalty fees calculated from projected
            revenue rather than actual costs, automatic renewal clauses that quietly extended
            the 7-year cap, image rights that survived contract expiry, and overbroad
            non-compete language. Each sweep finds the same species of clause wearing new
            drafting.</p>
            <p>The pattern reveals the limit of term-policing: agencies employ specialist
            drafters whose job is to recreate struck-down leverage in compliant language, and
            the regulator's review cycle runs years behind the drafting cycle. Enforcement
            works, clause by clause, and the underlying asymmetry regenerates faster than it
            can be pruned.</p>
            <p class="kf"><strong>Key framing:</strong> evidence for both blocs. The system is
            policed (corporate reading) and the policing is a treadmill that never reaches the
            power imbalance generating the clauses (artist reading).</p>` },
        { yr: 'structural', title: 'Template without teeth', sev: 'low',
          desc: 'The standard contract is voluntary; deviations surface only when an artist risks litigation. Protection depends on the protected suing first.',
          detail: `<p>The standard exclusive contract is a template, not a mandate: agencies may
            deviate, and deviations come to light only when a dispute puts a contract in front
            of a judge or the regulator. There is no filing requirement, no proactive audit of
            executed contracts, and no penalty for non-adoption. Compliance is real among the
            listed majors, whose contracts face scrutiny, and unknowable among the hundreds of
            small agencies where, the dispute record suggests, the worst terms live.</p>
            <p>The structural consequence: protection correlates inversely with need. Artists at
            major agencies, with lawyers and leverage, enjoy template-compliant terms; trainees
            at small agencies, with neither, depend on a document their employer was free to
            ignore. Omega X and Chuu both fought non-major agencies, which is not a
            coincidence.</p>
            <p class="kf"><strong>Key framing:</strong> the cheapest reform on the table. Making
            template adoption mandatory for KEMA membership requires no new law, only the
            association deciding its standards bind its members.</p>` },
      ],
      caseStudy: {
        title: 'Case study: the 7-year cap, what one rule did and did not do',
        intro: `The cap is the debate's best natural experiment: a real, binding limit on corporate
          contract power, in force for fifteen years across an entire industry, with measurable
          before-and-after states. Almost every claim either bloc makes about regulation can be
          tested against it: whether rules can bind this industry, whether protections damage
          competitiveness, and whether regulating terms ever reaches the experience of being managed.
          Delegates who know this case in detail can fact-check half the committee in real time.`,
        timeline: [
          ['2009', 'TVXQ ruling: 13-year terms held excessive and one-sided; the KFTC announces the 7-year ceiling on exclusive contracts.'],
          ['2010', 'Standard exclusive contract published, covering splits, settlement, and termination; the majors adopt it publicly under post-scandal pressure.'],
          ['2010s-20s', 'Contracts shorten industry-wide and renewals become genuine negotiation events (TWICE, BLACKPINK, Stray Kids): artist leverage moments that did not exist before the cap.'],
          ['2020s', 'Disputes migrate to what the cap does not cover: penalty math, training-cost recoupment, in-term control, and post-exit blacklisting. The 2022-26 case wave is entirely about uncapped terrain.'],
        ],
        outcome: `The cap genuinely shifted leverage at renewal time, created the contract-expiry
          negotiation as an institution, and did so without harming the industry, which grew into its
          most successful era under the new rule. It also left in-term control completely untouched:
          what an artist's daily life looks like during the seven years was never the regulation's
          subject. Both facts are permanent features of the debate.`,
        framing: `Use the cap to discipline the debate's claims. When the corporate bloc says
          regulation threatens the industry, the cap is the counterexample: fifteen years, no damage.
          When the artist bloc demands sweeping structural change, the cap is the caution: the most
          successful intervention in industry history was narrow, specific, and enforceable. The
          winning resolution likely looks like the cap's siblings: a penalty-formula ceiling, a
          recoupment-transparency rule, a neutral-status mechanism. Precise tools, firmly bound.`,
        provesFor: 'The guardrails exist and work; disputes are resolved within a framework the KFTC already built. Extend the framework, don’t replace the industry.',
        provesAgainst: 'Fifteen years on, artists still choose career destruction over staying. The cap fixed contract length, not the experience of being controlled.',
      },
      relations: {
        stance: `Structural balancer - the closest thing to a neutral actor in the debate. The KFTC
          sides with whoever the law puts it against: agencies when terms are unfair, implicitly
          companies when its template legitimizes the reformed status quo. It has no stake in the
          model itself, only in its terms.`,
        allies: [
          { name: 'Artists seeking structural limits', why: 'Every binding protection artists actually have (7-year cap, standard contract) is a KFTC product - it is their only proven institutional channel.' },
          { name: 'Reform-minded lawmakers', why: 'Statutes and KFTC rules reinforce each other; the Assembly legislates the principle, the regulator operationalizes the terms.' },
          { name: 'Compliant agencies', why: 'Counter-intuitively: companies that adopt the template gain a legitimacy shield - "our contracts follow the KFTC standard" is the industry’s favorite defense.' },
        ],
        opponents: [
          { name: 'Agencies’ contract drafters', why: 'A standing cat-and-mouse: struck-down clause types keep reappearing in new forms, and each crackdown targets the latest workaround.' },
          { name: 'Its own mandate limits', why: 'Less an enemy than a ceiling - voluntary templates, case-by-case enforcement, and no jurisdiction over creative control or foreign disputes.' },
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
         Tourism - the actors who turn industry norms into binding law. The Ministry carries a genuine
         double mandate: it promotes K-pop as a strategic national export (Hallyu policy, soft-power
         budgets) while bearing responsibility for the welfare of the people who produce it.`,
        `<strong>On creative control.</strong> No Korean statute regulates who owns creative
         decisions, and none is seriously proposed - lawmakers treat creative control as a private
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
        `<strong>Trajectory (2026).</strong> The direction of travel is one-way - protections
         accumulate and never repeal - but the pace is scandal-clocked. The open questions on the
         table: penalty-fee caps, mandatory arbitration, trainee-contract standards, and whether the
         tampering norm itself restrains trade. Whichever passes first will be the industry's
         biggest forced change since the 7-year cap.`,
      ],
      controversies: [
        { yr: '2014-', title: 'Minor-performer rules', sev: 'low',
          desc: 'Working-hour limits, education and rest guarantees for underage entertainers: the quiet baseline most of the trainee debate builds on.',
          detail: `<p>Amendments to the Popular Culture and Arts Industry Development Act through
            the mid-2010s built the statutory floor for underage performers: capped working
            hours scaled by age, guaranteed education access, mandated rest, and bans on
            overnight schedules for the youngest. The rules came after documentaries and
            hearings on child performers' conditions, and apply to trainees and debuted minors
            alike, in principle.</p>
            <p>The "in principle" is the controversy. Enforcement relies on complaints, and the
            structurally least-able-to-complain population in Korea is a trainee whose agency
            decides her future weekly. Audits are rare, violations surface mostly in later
            lawsuits (the KG case alleges conditions these rules should have prevented), and no
            agency has been made an example of. The floor exists; the inspection regime
            largely does not.</p>
            <p class="kf"><strong>Key framing:</strong> proof that protective text without
            enforcement machinery is decoration. Reform proposals should specify the audit
            mechanism, not just the standard.</p>` },
        { yr: '2022', title: 'The Lee Seung-gi revelation', sev: 'high',
          desc: 'A top star learns he was never paid music revenue across 18 years; national outrage makes agency accounting a political issue overnight.',
          detail: `<p>Lee Seung-gi was among Korea's most bankable stars for nearly two decades:
            chart-topping albums, top variety shows, leading drama roles. In 2022 it emerged
            that across 18 years and 27 albums, Hook Entertainment had paid him nothing for his
            music, telling him his recordings ran at a perpetual loss while the company
            collected the revenue. He audited, went public, and was vindicated; the agency paid
            a settlement under crushing public pressure, and its CEO faced legal consequences.</p>
            <p>The detail that made the scandal legislative rather than merely personal: he only
            learned the truth because a whistleblower contacted him. Nothing in the system
            (no statement duty, no audit right, no regulator) would ever have surfaced it.
            The public understood immediately that if this could happen to a superstar with
            maximal leverage, it was happening, silently, down the entire industry.</p>
            <p class="kf"><strong>Key framing:</strong> the information-asymmetry exhibit. The
            dispute wasn't about the split; it was about one party controlling all the books
            and the other having no right to look.</p>` },
        { yr: '2023-', title: '"Lee Seung-gi law" amendments', sev: 'med',
          desc: 'Agencies must provide regular settlement statements and accounting access. Transparency, though, is not bargaining power: statements reveal the split without changing it.',
          detail: `<p>The National Assembly's response was fast by legislative standards:
            amendments requiring agencies to provide artists with periodic settlement
            statements and supporting accounting on request, with penalties for
            non-compliance. For the first time, an artist's right to see where the money went
            became statutory rather than contractual, unwaivable by any agency's paperwork.</p>
            <p>The limits are equally instructive. A statement reveals the split; it does not
            change it. Recoupment categories remain agency-defined, audit costs still fall on
            the artist who wants to dig deeper, and nothing in the amendments touches control,
            creative or otherwise. The law fixed the exact scandal that produced it, and only
            that, which is precisely how scandal-driven lawmaking works.</p>
            <p class="kf"><strong>Key framing:</strong> the template for what the Assembly will
            do next time: a narrow, enforceable duty aimed at the last scandal. Reformers
            should draft accordingly; opponents should note the model survived it easily.</p>` },
      ],
      caseStudy: {
        title: 'Case study: the Lee Seung-gi law, scandal becomes statute',
        intro: `The cleanest demonstration of how artist protections actually get made in Korea: not
          by systemic design but by outrage, one scandal at a time. The sequence (hidden abuse,
          accidental discovery, public fury, narrow statute) is the legislature's standing operating
          procedure for this industry, and both blocs in committee should treat it as the realistic
          baseline against which their proposals compete. Anything the industry will not fix
          voluntarily eventually arrives in this form, late and blunt.`,
        timeline: [
          ['2004-22', 'Lee Seung-gi releases hit music across 18 years; Hook Entertainment tells him his music activities run at a loss and pays him nothing for them.'],
          ['2022', 'A whistleblower tip triggers his audit; he goes public and is vindicated. The agency pays a settlement under massive public pressure and faces legal consequences.'],
          ['2023', 'The National Assembly amends the Popular Culture and Arts Industry Development Act: mandatory periodic settlement statements and accounting access, with penalties.'],
          ['2023-', 'Compliance becomes routine at majors; the amendments’ silence on recoupment definitions and audit costs becomes the next generation of dispute material.'],
        ],
        outcome: `A real, binding transparency duty now exists, created by one celebrity's audit
          rather than by any systemic review. Artists industry-wide gained a right their contracts
          never offered. The mechanism demonstrably works; the mechanism is also clearly not a
          system: it required eighteen years, a whistleblower, and a superstar's platform to produce
          one paragraph of law.`,
        framing: `Frame the Assembly as the committee's deadline rather than its rival. Every
          unaddressed grievance in this industry is a future statute waiting for its scandal, and
          statutes arrive without industry input on drafting. The corporate bloc's strongest reason
          to accept KEMA-level reform is preemption: self-regulation adopted now is written by the
          industry; regulation adopted after the next scandal is written by politicians during an
          election cycle. Cite this case as proof the clock is real.`,
        provesFor: 'Targeted statute fixed a specific abuse without touching the management model. Regulate conduct, not structure.',
        provesAgainst: 'It took 18 years and a superstar to surface one missing payment. How many artists without his platform never find out?',
      },
      relations: {
        stance: `Balancer drifting pro-artist. The legislature has no quarrel with the management
          model as a business - it has a one-way ratchet of artist protections driven by public
          outrage. Functionally, lawmakers are the artist side's slowest but only binding weapon,
          and the industry's strongest argument for pre-emptive self-reform.`,
        allies: [
          { name: 'Public opinion', why: 'The actual engine: no entertainment statute has ever passed without a scandal supplying the votes.' },
          { name: 'Artist advocates & unions', why: 'Supply the testimony, case files, and bill drafts that convert outrage into legislative text.' },
          { name: 'KFTC', why: 'The enforcement partner - the Assembly sets duties, the regulator polices terms, and each cites the other’s gaps to justify acting.' },
        ],
        opponents: [
          { name: 'The industry lobby', why: 'Agencies and KEMA argue every bill threatens export competitiveness - the sky-is-falling defense that has lost, slowly, every time.' },
          { name: 'The Ministry’s own export mandate', why: 'Hallyu promotion budgets depend on the industry’s success, building a brake against regulation into the very ministry responsible for welfare.' },
          { name: 'Legislative attention spans', why: 'Scandal-clocked lawmaking means reform stalls the moment headlines move on - the industry’s most reliable defense is time.' },
        ],
      },
      verdict: {
        lean: 58, label: 'Balancer, drifting pro-artist',
        text: `The slow-moving force that ultimately sets the floor. Committee resolutions that
          pre-empt likely legislation (transparency, arbitration, minors) are the most realistic
          kind of "balance" available.`,
        links: [
          ['🌐 Ministry of Culture', 'https://www.mcst.go.kr'],
          ['📖 Ministry - Wikipedia', 'https://en.wikipedia.org/wiki/Ministry_of_Culture,_Sports_and_Tourism'],
          ['📰 News coverage', gsearch('South Korea entertainment law artist rights')],
        ],
      },
    },
  },

  {
    id: 'selfprod', emoji: '🎤', name: 'Self-producing idols', color: 'against',
    badge: 'against', badgeText: 'Pro-artist (market proof)',
    blurb: `BTS, Stray Kids, SEVENTEEN, (G)I-DLE: acts that write and produce their own music are the
      industry's best-selling exports - the strongest <em>commercial</em> argument that creative
      freedom and profit aren't opposites.`,
    facts: ['BTS: members hold hundreds of writing credits', 'Stray Kids: 3RACHA produce in-house, multiple Billboard 200 #1s', '(G)I-DLE: Soyeon writes/produces the group’s hits', 'SEVENTEEN: Woozi leads production'],
    query: 'k-pop self-produced idol songwriting',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> Not an organization but a market fact: the cohort of idols
         with substantive creative authorship - BTS (members hold hundreds of KOMCA-registered
         writing credits), Stray Kids (3RACHA produce the catalog in-house), SEVENTEEN (Woozi leads
         production), (G)I-DLE (Soyeon writes and produces the hits). They are simultaneously
         products of the trainee system and the strongest evidence against its creative premises.`,
        `<strong>On creative control.</strong> Their existence redefines the question. The classical
         model assumed professional A&R outperforms artist instinct; this cohort's commercial record -
         the biggest export run in K-pop history (BTS), consecutive Billboard 200 #1 debuts (Stray
         Kids) - inverts the assumption at the top of the market. Authorship also compounds: artists
         who write own publishing income and narrative identity that management can't replace.`,
        `<strong>On contracts.</strong> Notably, the self-producers are also the great renewers: BTS,
         SEVENTEEN, and Stray Kids all re-signed with their companies, early and publicly. Creative
         stake appears to do what enforcement cannot - make staying rational. No self-producing
         flagship act has ever litigated an exit; the dispute docket is populated entirely by artists
         without creative authority.`,
        `<strong>In disputes.</strong> They stay out of them - and that absence is the data. Their
         leverage operates invisibly, through renegotiated terms and creative latitude rather than
         courtrooms. Agencies, in turn, now market "self-producing" as a debut concept, an admission
         that the industry's own consumers price creative authenticity at a premium.`,
        `<strong>Trajectory (2026).</strong> The fourth and fifth generations launch with writing
         credits from day one, normalizing what was once exceptional. The open question is depth
         versus branding: credits are public record, but creative control over concepts, schedules,
         and image remains contractual - and that's where the next version of this debate lives.`,
      ],
      controversies: [
        { yr: 'framing', title: '"Self-producing" as marketing', sev: 'med',
          desc: 'Agencies now sell creative freedom as a concept, raising the question of how much input is real versus brand. Credits are public; creative control over concepts and schedules is not.',
          detail: `<p>Once authorship proved it sells, the industry productized it: fourth and fifth
            generation debuts arrive pre-packaged with "self-producing member" as a marketing
            bullet, participation credits appear on title tracks whose actual creative
            decisions remain disputed, and "the members made this" became ad copy. KOMCA
            credits are public record, but a credit line cannot distinguish a song built by an
            artist from a song an artist was allowed to touch.</p>
            <p>The skeptical reading is supported by what stays centralized even for celebrated
            self-producers: concept direction, scheduling, title-track selection, and image
            remain company decisions nearly everywhere. The risk for the artist side of this
            debate is real: if "self-producing" becomes an aesthetic rather than a power
            arrangement, the industry will have absorbed the critique without conceding
            anything.</p>
            <p class="kf"><strong>Key framing:</strong> distinguish credits from control in any
            committee exchange. The reform-relevant question is never "who is listed" but "who
            could say no."</p>` },
        { yr: 'survivorship', title: 'The graduation problem', sev: 'med',
          desc: 'Every celebrated self-producer earned autonomy through the standard trainee system first. The model claims their successes as its own, and the failures are invisible.',
          detail: `<p>The corporate bloc's favorite response to the self-producing cohort is
            adoption: BTS, 3RACHA, Soyeon, and Woozi were all scouted, trained, and debuted by
            the standard pipeline, then granted creative authority gradually as they proved
            themselves. In this telling, autonomy is the system's graduation prize, evidence of
            its flexibility rather than its failure.</p>
            <p>The structural reply is about the unseen denominator. For every trainee whose
            demos earned them the pen, an unknown number with equal potential never got the
            chance, because the grant of creative authority was always discretionary, awarded
            by the company, on the company's criteria, revocable at renewal. Survivorship bias
            does the model's advertising: the graduates are visible, the never-graduated do
            not exist in any dataset.</p>
            <p class="kf"><strong>Key framing:</strong> "autonomy as graduation" concedes the
            artist side's core premise: that the company owns the pen and decides who may hold
            it. A privilege program is not a rights regime.</p>` },
      ],
      caseStudy: {
        title: 'Case study: 3RACHA, in-house production as the product',
        intro: `Stray Kids debuted in 2018 with the members of 3RACHA (Bang Chan, Changbin, Han)
          already producing the group's music, under JYP's corporate roof and with the company's
          full apparatus behind them. It is the industry's cleanest test of whether artist-driven
          creation can thrive inside the standard structure, because nothing else about the group's
          contract or management deviated from the model: same trainee pipeline, same exclusivity,
          same renewal cycle. Only the pen changed hands, and the results are measurable.`,
        timeline: [
          ['2017-18', 'The survival show and debut are built explicitly around the members’ self-production identity; JYP markets the autonomy from day one.'],
          ['2019-21', 'The 3RACHA sound defines the group through rising domestic and international charting; creative authority expands with each success.'],
          ['2022-24', 'Consecutive Billboard 200 #1 debuts, a record run for fully in-house artist production, placing them among the industry’s top global sellers.'],
          ['2023-', 'The group renews as a full unit years before expiry; JYP cites the renewal as proof its artist-first model works.'],
        ],
        outcome: `Creative input, corporate infrastructure, and commercial dominance coexisting in one
          group, plus an early full-unit renewal: the strongest single dataset showing the binary at
          the heart of this debate is escapable. JYP retained everything it actually needs (the
          contract, the revenue, the asset) while ceding the thing the classical model insists it
          cannot cede. Nobody involved appears worse off, which is the finding.`,
        framing: `Both blocs should fight to own this case. The corporate framing: alignment of
          interests, not regulation, produced it, so let the market spread the practice. The artist
          framing: it proves centralized creative control was never commercially necessary, so its
          persistence elsewhere is a choice that now requires justification. The sharpest committee
          question it raises: if this works so well, why does it remain the exception, and what in
          the standard contract prevents it from being the default?`,
        provesFor: 'The system at its best: company scouting and infrastructure plus artist creativity. No regulation produced this; alignment of interests did.',
        provesAgainst: 'If artist-driven production is this profitable, the industry’s default of centralized control is a choice, and the burden of justifying it flips.',
      },
      relations: {
        stance: `Pro-creative-freedom by demonstration, not declaration. This cohort never campaigns -
          their renewals, credits, and sales do the arguing. They are the artist side's economic
          exhibit and, simultaneously, the corporate side's favorite adoption story ("the system
          made them"). Both blocs will claim them; neither fully owns them.`,
        allies: [
          { name: 'Their own agencies', why: 'Genuine alignment: HYBE, JYP, and Pledis profit enormously from their autonomy, which is exactly why these artists renew instead of litigate.' },
          { name: 'Global fandoms', why: 'Authorship is central to these fandoms’ loyalty - the audience pays a premium for creative authenticity and defends it politically.' },
          { name: 'Artist-side debaters', why: 'Every argument that creative freedom is commercially superior cites this cohort as its data set.' },
        ],
        opponents: [
          { name: 'No direct enemies - structural ones', why: 'Nobody fights them; the control-model’s defenders simply reframe them as system outputs rather than counter-examples.' },
          { name: 'The "graduation" narrative', why: 'The argument that autonomy must be earned through the standard pipeline uses their trainee origins to defend the very control they outgrew.' },
        ],
      },
      verdict: {
        lean: 72, label: 'Pro-artist, by market evidence',
        text: `The debate's most useful neutral-sounding evidence: pure commercial data that the
          artist side can cite without sentiment and the corporate side must co-opt rather than deny.`,
        links: [
          ['📰 Coverage: self-producing idols', gsearch('k-pop self-produced idol songwriting')],
          ['📖 3RACHA - Wikipedia', 'https://en.wikipedia.org/wiki/3Racha'],
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
         individually), Fifty Fifty, Chuu, Omega X, and VCHA's KG - the artists who tested the
         exclusive-contract system in court rather than serving it out. They span the industry's
         full range: its biggest new act, a viral one-hit phenomenon, a top-tier soloist, a
         small-agency boy group, and a US-formed rookie.`,
        `<strong>On creative control.</strong> Their common testimony is that the system offers no
         internal path: grievances about management, autonomy, or treatment have no mechanism short
         of exit, and exit means war. Notably, none of them litigated over songwriting credits -
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
         these dockets - the next dispute starts where these end.`,
      ],
      controversies: [
        { yr: '2021-22', title: 'Omega X: mistreatment on camera', sev: 'med',
          desc: 'Members document their agency’s conduct; the case opens a window into small-agency conditions the majors’ PR never shows.',
          detail: `<p>Omega X's dispute with Spire Entertainment broke differently from every prior
            case: fans filmed the agency's CEO berating exhausted members outside a hotel after
            a US tour, and members subsequently described physical and verbal abuse, coerced
            drinking, and financial neglect, much of it corroborated on the record. The group
            eventually prevailed in terminating their contracts and continued under new
            management.</p>
            <p>The case matters as the industry's visible floor. The majors' disputes are about
            control and money within professionally run organizations; Omega X showed what the
            same contract structure permits at the hundreds of small agencies with no press
            scrutiny, no investor oversight, and no KEMA attention until the videos surfaced.
            The standard contract's protections are only as real as the weakest agency
            holding one.</p>
            <p class="kf"><strong>Key framing:</strong> regulation debates anchored on HYBE and
            SM miss where protection is most needed. Any reform that only binds the majors
            regulates the companies least likely to do this.</p>` },
        { yr: '2022-23', title: 'Chuu vs Blockberry: the artist win', sev: 'med',
          desc: 'Expelled from LOONA amid agency claims, she fights and wins, including against defamation claims. Proof the system can find for artists when conduct is extreme and documented.',
          detail: `<p>Blockberry Creative expelled Chuu from LOONA in late 2022, publicly accusing
            her of abusing staff, an accusation that detonated against years of beloved public
            persona. The fuller record that emerged told a different story: she had earlier won
            an injunction over a revenue split so one-sided she was reportedly bearing costs
            while the agency collected income, and subsequent proceedings vindicated her
            against the misconduct claims while her career continued solo.</p>
            <p>Chuu is the system's one clean artist victory, and its anatomy is instructive:
            she won because the agency's conduct was extreme, financially documented, and its
            counterattack provably false. The bar she cleared (overwhelming evidence plus an
            agency clumsy enough to defame her publicly) is the actual standard an artist must
            meet to leave a K-pop contract with career intact.</p>
            <p class="kf"><strong>Key framing:</strong> cite Chuu to locate the line. Everything
            an agency may do short of what Blockberry did is, by the dispute record, effectively
            permitted.</p>` },
        { yr: '2023', title: 'Fifty Fifty: the cautionary tale', sev: 'high',
          desc: 'Weeks after "Cupid" goes global, the group seeks contract suspension; the injunction fails, three members are dropped. The corporate side’s favorite tampering parable.',
          detail: `<p>Fifty Fifty were the underdog miracle of 2023: a small-agency group whose
            "Cupid" went globally viral, charting on the Billboard Hot 100 for months. Weeks
            into that success, all four members sought to suspend their contracts with ATTRAKT,
            alleging accounting opacity and health mismanagement, amid reports that an outside
            production partner had encouraged the move. The court denied the injunction; one
            member returned and three were dropped, their careers effectively ended at their
            commercial peak.</p>
            <p>The case became the corporate bloc's defining parable because public sympathy,
            unusually, landed with the agency: the timing looked opportunistic, the evidence
            stayed contested, and the alleged third-party involvement let the industry frame
            artist exit as something done to companies by predators rather than by artists with
            grievances. KEMA's early intervention cemented that frame.</p>
            <p class="kf"><strong>Key framing:</strong> the deterrence exhibit. Whatever actually
            happened inside ATTRAKT, every K-pop artist now knows three names that tried to
            leave and ceased to exist professionally.</p>` },
        { yr: '2024-26', title: 'NewJeans / Danielle: the era case', sev: 'high',
          desc: 'Termination declared, injunctions granted, a member’s contract terminated, damages reported near ₩33bn claimed. Legally decisive for companies; reputationally radioactive.',
          detail: `<p>The group-level fight (termination declaration, injunctions, upheld
            contracts) is covered in the ADOR dossier; what belongs here is what it did to the
            artists as a class. Five members at the absolute peak of commercial value spent
            their prime years legally barred from independent work, watched the industry keep
            its distance under tampering norms, and saw the dispute narrow to individual
            attrition: Danielle's contract terminated over independent activities, damages
            reported near ₩33 billion pursued against her and family.</p>
            <p>For the dispute cohort, the case set the modern ceiling: this is what happens
            when artists with maximum fame, maximum public sympathy, and competent counsel
            challenge the structure. They lose in court, lose years, and the price of the
            attempt is itemized in billions of won as a warning to the next group considering
            it.</p>
            <p class="kf"><strong>Key framing:</strong> if the system's answer to its most
            valuable artists is this, the deterrent is not a side effect of the rules. It is
            the rules, working.</p>` },
        { yr: '2026', title: 'VCHA’s KG: the jurisdiction test', sev: 'high',
          desc: 'The fight moves to US courts, where the management model meets stronger labor law. Ongoing.',
          detail: `<p>KG's suit against JYP USA (detailed in the JYP dossier) earns a second entry
            here because of what it means for the cohort: it is the first dispute filed in a
            jurisdiction that did not co-evolve with the management model. Korean courts read
            these contracts inside thirty years of industry context; a US court will read the
            same clauses against employment law, minor-protection law, and a legal culture
            with no deference to the trainee system.</p>
            <p>Every prior artist in this list fought on the industry's home turf and lost or
            bled to win. KG's case asks whether the turf was the problem. A US ruling against
            the model would give every future localized group, and arguably every Korean
            artist with US activities, a second venue and a second body of precedent. The
            industry's globalization built this exposure into its own expansion.</p>
            <p class="kf"><strong>Key framing:</strong> watch this docket above all others. It is
            the first dispute whose outcome the Korean industry cannot shape through domestic
            norms.</p>` },
      ],
      caseStudy: {
        title: 'Case study: two endings, Chuu and Fifty Fifty',
        intro: `Run the same playbook (artist challenges agency) through two cases two years apart and
          the system's actual operating rules become visible in the difference between outcomes.
          Chuu and Fifty Fifty fought comparable opponents (small agencies, not majors) at
          comparable career moments, and ended in opposite universes: one career intact and
          thriving, three careers erased. The variables that flipped the result are the closest
          thing this industry has to published rules of engagement, and they are nowhere written
          down.`,
        timeline: [
          ['2021-22', 'Chuu quietly wins an injunction over an extreme revenue split, reportedly bearing costs while the agency collected income; the groundwork of documentation begins.'],
          ['2022 Nov', 'Blockberry expels her from LOONA with public misconduct accusations; she litigates with the documented record behind her.'],
          ['2023', 'Chuu prevails: contract relationship void, the misconduct narrative collapses, her solo career continues. The system’s one clean artist win.'],
          ['2023 Jun', 'Fifty Fifty, at their global peak, seek contract suspension alleging accounting opacity and health mismanagement; evidence is contested and reports of third-party involvement dominate coverage.'],
          ['2023-24', 'The injunction fails, public sympathy lands with the agency, KEMA backs ATTRAKT, and three members are dropped and effectively erased.'],
        ],
        outcome: `The system finds for artists only at the extremes of documented mistreatment, and
          punishes ambiguous challenges with career death. The decision variable is not the severity
          of the grievance but the quality of the paper trail and the optics of the timing. Rational
          artists and their lawyers have absorbed the message precisely: do not litigate unless your
          evidence is overwhelming and your motives are unimpeachable, which means most grievances
          are never raised at all.`,
        framing: `Use the pair to expose what the dispute system actually adjudicates: documentation
          and narrative, not fairness. A grievance identical in substance succeeds with receipts and
          fails without them, and the artist bears both the burden of proof and the cost of failure
          while the agency bears neither. The reform implication writes itself: independent
          fact-finding (audit rights, neutral arbitration, protected status during disputes) would
          move outcomes closer to the merits. The corporate counter: courts weighing evidence is
          precisely what justice means, and Fifty Fifty failed because their case was weak.`,
        provesFor: 'Courts weigh each case on facts and sometimes side with artists. The process works, and weak exits fail as they should.',
        provesAgainst: 'A system where the price of a 50/50 case is your entire career doesn’t have a justice problem; it has a deterrence design.',
      },
      relations: {
        stance: `Pro-creative-freedom - the evidence base in human form. These artists are not a
          movement and never coordinated; their stance is revealed by action: each concluded that
          exit, at any cost, beat staying. Collectively they are the primary sources every abstract
          claim in this debate eventually cites.`,
        allies: [
          { name: 'Their fandoms', why: 'Fund, amplify, translate court filings, and pressure advertisers - the only sustained institutional support disputing artists have.' },
          { name: 'Public opinion (increasingly)', why: 'Legal losses keep converting into legitimacy wins; global coverage now defaults to the artist’s framing of these disputes.' },
          { name: 'Plaintiff-side entertainment lawyers', why: 'A growing specialist bar building case law, case by case, on the artist side of the docket.' },
        ],
        opponents: [
          { name: 'Their agencies', why: 'ADOR, ATTRAKT, Blockberry, JYP USA - the direct adversaries, with the contract text and (usually) the courts behind them.' },
          { name: 'KEMA’s tampering doctrine', why: 'Industry norms freeze a disputing artist’s market options, turning every lawsuit into a siege the company can usually outlast.' },
          { name: 'The court record', why: 'Korean civil courts enforce the contracts as written almost every time - the structural headwind every new case faces.' },
        ],
      },
      verdict: {
        lean: 88, label: 'Pro-artist (the evidence base)',
        text: `The debate's primary sources. Every abstract claim about contracts, freedom, and power
          eventually cites one of these cases - know all five cold.`,
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
    blurb: `Truck protests, advertiser boycotts, coordinated statements - fans increasingly act as
      idols' de-facto labor union. The paradox: the same parasocial fan economy that gives fans this
      leverage is what agencies cite to justify controlling idols' private lives.`,
    facts: ['Truck protests: rented LED trucks outside agency HQs', 'Advertiser pressure campaigns', 'Organized mass statements & funding pools'],
    query: 'k-pop fans protest agency',
    dossier: {
      stance: [
        `<strong>Who they are.</strong> Organized fandoms - ARMYs, Bunnies, ONCEs and their peers -
         operating as coordinated political actors: funded, multilingual, legally literate, and
         permanently online. They are simultaneously the industry's revenue base and its only
         non-state check that companies demonstrably fear.`,
        `<strong>On creative control.</strong> Fandom opinion increasingly prices authenticity:
         self-produced and artist-driven work commands deeper loyalty than template output, and fans
         reward labels that visibly grant latitude. At the same time, fandoms enforce their own
         creative expectations - concept changes and image shifts can trigger revolts as fierce as
         any company directive. Fans contest who controls the artist; they don't propose the artist
         be uncontrolled.`,
        `<strong>On contracts.</strong> Fan collectives have no legal standing and total practical
         standing: they fund legal analyses, translate filings, file consumer and regulatory
         complaints, and run advertiser-pressure campaigns during disputes. In the NewJeans conflict,
         fan organization kept a legally settled matter reputationally open for years - a power no
         statute grants and none can revoke.`,
        `<strong>In disputes.</strong> The toolkit is institutionalized: LED protest trucks outside
         headquarters, coordinated mass statements, boycott and refund campaigns, stock-forum and
         shareholder-meeting appearances. The same machinery cuts both ways - it has defended
         artists from agencies, and it has policed artists' dating lives and demanded member
         removals. Fan power points wherever fans aim it.`,
        `<strong>Trajectory (2026).</strong> Fandom action is professionalizing - legal funds,
         press contacts, regulatory literacy - and its targets are escalating from artist treatment
         to corporate governance itself. The industry built its economics on organized parasocial
         devotion; that organization is now the closest thing artists have to a union, and the
         closest thing companies have to an uncontrollable shareholder.`,
      ],
      controversies: [
        { yr: '2010s-', title: 'Truck protests become standard', sev: 'low',
          desc: 'LED trucks outside agency buildings demanding management changes, better treatment, or apologies: institutionalized fan pressure with no legal status.',
          detail: `<p>The protest truck (a rented LED billboard vehicle parked outside an agency's
            headquarters, broadcasting fan demands on loop) evolved from novelty to institution
            across the 2010s. Fandoms crowdfund them in hours and deploy them for everything:
            demanding better management for under-promoted groups, protesting member treatment,
            objecting to comeback concepts, and sometimes demanding a member's removal. Rates
            and vendors are now a known quantity; there are companies whose business is fan
            protest logistics.</p>
            <p>Their significance is constitutional, in a literal sense: the trucks are the only
            institutionalized channel through which anyone outside a company's shareholders can
            register dissent about how artists are managed. No law created it, no one can ban
            it, and agencies demonstrably respond to it: statements, schedule changes, and
            personnel moves have all followed truck campaigns.</p>
            <p class="kf"><strong>Key framing:</strong> where formal governance provides no
            voice, informal governance fills the gap. The trucks exist because no
            artist-side complaint mechanism does.</p>` },
        { yr: '2024-25', title: 'Bunnies vs HYBE', sev: 'med',
          desc: 'NewJeans fans run coordinated campaigns: ad trucks, official statements, complaints to regulators. The closest thing to organized labor action the industry has seen, run by customers.',
          detail: `<p>The NewJeans fandom's campaign against HYBE escalated fan protest into
            something structurally new: coordinated statements with legal review, complaints
            filed with the KFTC and the National Human Rights Commission, advertiser pressure
            tracked in spreadsheets, mass translation operations that put every court filing
            and press conference in front of global audiences within hours, and sustained
            funding over years rather than news cycles.</p>
            <p>The campaign changed no legal outcome, and that is what makes it analytically
            interesting: it demonstrated that a fandom can impose permanent reputational and
            political costs on the industry's largest company entirely through lawful,
            organized customer action. Future agencies pricing a contract enforcement now
            include "years of coordinated fandom warfare" in the calculation, which functions
            exactly like a strike threat without a single employee involved.</p>
            <p class="kf"><strong>Key framing:</strong> the de-facto union exhibit. When
            assessing whether artists have countervailing power, the honest answer is: only
            borrowed power, and the lender is the customer base.</p>` },
        { yr: 'structural', title: 'The parasocial paradox', sev: 'med',
          desc: 'Fan spending power is exactly what makes an idol’s private life a "commercial asset," the justification for dating bans. The artist side’s strongest ally created the artist side’s oldest grievance.',
          detail: `<p>The same fandoms now campaigning for artist welfare built the economics that
            justify controlling artists. Parasocial intensity is the industry's revenue engine:
            album bulk-buying, fan-call events, and merchandise all monetize the feeling of
            personal connection, and that feeling is what makes an idol's dating life a
            balance-sheet item. The historical record is uncomfortable: fan revolts over
            relationships and scandals, including demands for member removals, taught agencies
            that private-life control protects revenue.</p>
            <p>Both blocs in committee can weaponize this. The corporate side: we restrict
            because the market (these very fans) punishes us when we don't. The artist side:
            the newest generation of fandom behavior, visibly defending artists' autonomy and
            relationships, shows the market is repricing, and the agencies' control now
            protects against a fan reaction that increasingly does not come.</p>
            <p class="kf"><strong>Key framing:</strong> whoever cites fan power must accept both
            of its faces. It is the strongest argument for image control and the strongest
            force currently opposing it, sometimes in the same fandom.</p>` },
      ],
      caseStudy: {
        title: 'Case study: the Bunnies campaign, customers as a union',
        intro: `During the NewJeans-ADOR conflict, the group's fandom ran a sustained, organized
          pressure campaign against one of the most powerful companies in Korean entertainment, and
          kept it running for years through every adverse ruling. Study it as an institution rather
          than an event: funding, division of labor, legal literacy, translation infrastructure, and
          strategic targeting that most NGOs would envy, assembled by customers with no legal
          standing in the dispute and nothing personal to gain.`,
        timeline: [
          ['2024', 'Protest trucks deploy at HYBE headquarters; coordinated statements demand Min Hee-jin’s reinstatement and member protection; the campaign goes global within weeks.'],
          ['2024-25', 'Complaints filed with regulators including the KFTC; advertiser and broadcaster pressure campaigns tracked publicly; every court filing translated and distributed worldwide within hours.'],
          ['2025-26', 'The campaign persists through every ruling, member departure, and damages claim: losing legally everywhere while keeping the reputational cost of enforcement permanently high.'],
        ],
        outcome: `No injunction was reversed and no ruling changed, yet HYBE's brand damage, its
          National Assembly scrutiny, and the global framing of the dispute as an artist-rights story
          all trace substantially to fan organization. The campaign proved that reputational cost can
          be manufactured, sustained, and aimed, by volunteers, indefinitely. Power without
          authority, maintained longer than most unions could manage a strike.`,
        framing: `The campaign is the committee's evidence about legitimacy: courts measure
          contracts, but fandoms measure the consent of the audience the entire industry monetizes,
          and that audience visibly broke against the control model. The corporate counter is
          accountability: campaigns run on emotion and selective information, answer to no one, and
          would terrorize any reformed system too. A sophisticated resolution treats organized
          fandom as a stakeholder to be channeled (consultation mechanisms, transparency that
          preempts rumor) rather than a mob to be survived.`,
        provesFor: 'Mob dynamics with no accountability: campaigns run on emotion and selective information, and companies must answer to courts, not hashtags.',
        provesAgainst: 'When the customers themselves organize against the control model, the "we restrict idols to protect fan revenue" justification collapses.',
      },
      relations: {
        stance: `Pro-artist, conditionally and unpredictably. Fan collectives defend artists against
          companies more often than the reverse in the current era - but their loyalty is to their
          artist and their own expectations, not to creative-freedom principle. They are a power
          bloc both sides can recruit and neither can command.`,
        allies: [
          { name: 'Artists (usually)', why: 'In nearly every recent dispute the organized fandom backed the artist against the agency - funding, amplifying, and outlasting the news cycle.' },
          { name: 'Global media', why: 'Fan translation and documentation pipelines are how Korean industry disputes become international stories framed the artist’s way.' },
          { name: 'Disputing artists’ legal teams', why: 'Crowdsourced evidence-gathering, filing translations, and public-pressure timing that no plaintiff could afford to buy.' },
        ],
        opponents: [
          { name: 'Agencies under campaign', why: 'HYBE, ATTRAKT, Blockberry and others have all faced the trucks, the boycotts, and the regulatory complaints.' },
          { name: 'Artists’ private lives (historically)', why: 'The same machinery has policed dating, demanded apologies, and forced member removals - the paradox that justifies agencies’ image control.' },
          { name: 'KEMA & industry bodies', why: 'Fan campaigns now target association statements and industry norms directly, treating them as the cartel’s public voice.' },
        ],
      },
      verdict: {
        lean: 80, label: 'Pro-artist, conditionally',
        text: `A power bloc, not a principle - historically it has enforced control (dating scandals)
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
    <p class="sec-sub">Severity reflects weight in the corporate-control vs. creative-freedom debate, not general
    newsworthiness. Press any entry for the full background, consequences, and key framing.</p>
    ${d.controversies.map(c => `
      <details class="controversy sev-${c.sev}">
        <summary>
          <h4><span class="yr">${c.yr}</span> ${c.title} ${sev(c.sev)} <span class="exp-hint"><span class="arr">▾</span> full detail</span></h4>
          <p>${c.desc}</p>
        </summary>
        <div class="contro-detail">${c.detail || ''}</div>
      </details>`).join('')}
  </section>

  <section class="dossier-section" id="t3">
    <h2 class="sec"><span class="bar"></span>${d.caseStudy.title}</h2>
    <div class="cs-block"><p class="sec-sub" style="font-size:.93rem">${d.caseStudy.intro}</p></div>
    <div class="cs-block">
      <h4>📅 What happened</h4>
      <ul class="case-list">${d.caseStudy.timeline.map(t => `<li><span class="yr">${t[0]}</span> - ${t[1]}</li>`).join('')}</ul>
    </div>
    <div class="cs-block"><h4>🏁 Outcome</h4><p>${d.caseStudy.outcome}</p></div>
    ${d.caseStudy.framing ? `<div class="cs-block"><h4>🎯 Key framing</h4><p>${d.caseStudy.framing}</p></div>` : ''}
    <div class="positions">
      <div class="pos for"><strong>What it proves - pro-corporate</strong>${d.caseStudy.provesFor}</div>
      <div class="pos against"><strong>What it proves - creative freedom</strong>${d.caseStudy.provesAgainst}</div>
    </div>
  </section>

  <section class="dossier-section" id="t4">
    <h2 class="sec"><span class="bar"></span>Stance, Allies & Opponents</h2>
    <div class="cs-block"><h4>🧭 Determined stance</h4><p>${d.relations.stance}</p></div>
    <span class="rel-h a">🤝 Allies - who stands with them, and why</span>
    <div class="rel-grid">${d.relations.allies.map(a =>
      `<div class="rel-card ally"><strong>${a.name}</strong>${a.why}</div>`).join('')}</div>
    <span class="rel-h o">⚔️ Opponents - who stands against them, and why</span>
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
    <h4 style="margin:24px 0 6px">📰 Latest coverage - updated daily</h4>
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
        <span class="mn-meta"> - ${esc(n.source)}${n.date ? ', ' + fmtDate(n.date) : ''}</span></a>`).join('') + searchLink
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
  document.title = `${p.name} - Dossier - KEMA Debate Tracker`;
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
