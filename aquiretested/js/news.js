/**
 * A&M Advisory - Automated Daily Mumbai Redevelopment Intelligence Desk & Live News Feed
 * ES6 Vanilla JavaScript handling 8:00 AM IST Daily Intelligence Briefs and Real-time News Feeds.
 */

(function () {
  'use strict';

  const EMBEDDED_DAILY_BRIEFS = [
    {
      briefId: 'brief-2026-07-21',
      date: 'Tue, Jul 21, 2026',
      publishedAt: '2026-07-21T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'Ten X Realty (Raymond) ₹530 Cr Parel SRA JDA, BMC ₹2,241 Cr Manori Water Tunnel, MSIB Tenders',
      executiveSummary: [
        'Ten X Realty South (Raymond Realty subsidiary) registered a ₹529.98-crore JDA for a 55% development share in a two-phase SRA slum rehabilitation scheme at Parel-Kalachowki with Shanti Om Residency.',
        'BMC has moved a ₹2,241-crore proposal for a 7.175-km underground water tunnel linking the Manori desalination plant to Kandivali, creating major tunnelling, shaft, and utility-interface activity in the western suburbs.',
        'MHADA MSIB 50-work package closing deadline is today (July 21), with additional packages closing July 23 and 24.'
      ],
      rankedItems: [
        {
          id: 'jul21-1',
          title: 'Ten X Realty enters ₹529.98-crore Parel–Kalachowki SRA project',
          category: 'SRA & Developer Signals',
          whatHappened: 'Shanti Om Residency Pvt. Ltd. entered into a registered joint development agreement with Ten X Realty South Ltd. (Raymond Realty sub) for a 55% development share in a two-phase SRA project in Parel-Kalachowki.',
          whyItMatters: 'Strong signal that listed corporate developers are entering complex SRA slum rehabilitation schemes through dedicated project subsidiaries and structured JDAs.',
          dprImplication: 'Feasibility must separate legacy liabilities, unpaid transit rent, corpus commitments, and prior contractor claims from future rehabilitation/free-sale construction costs.',
          clientAction: 'For takeover or co-development of SRA schemes, conduct scheme-level due diligence covering LOI, IOA, CC, tenant rent escrow, and performance guarantees.',
          sources: ['Property Registration Desk', 'SRA Portal']
        },
        {
          id: 'jul21-2',
          title: 'BMC moves ₹2,241-crore Manori-Kandivali underground water tunnel proposal',
          category: 'BMC & Infrastructure',
          whatHappened: 'BMC proposed a 7.175-km underground water tunnel from the proposed Manori desalination plant to Kandivali to reinforce western-suburb water supply.',
          whyItMatters: 'Major infrastructure project affecting sub-surface reservations, shaft locations, utility alignments, and construction traffic in Kandivali, Malad, and Borivali.',
          dprImplication: 'Projects along the alignment must account for underground utility reservations, potential vibration constraints during tunneling, and road access restrictions.',
          clientAction: 'Map active redevelopment sites along the Manori-Kandivali corridor against proposed tunnel shaft locations.',
          sources: ['BMC Water Supply Projects Dept']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 21, 2026', item: 'MHADA MSIB 50-work slum improvement package', action: 'Final bid submission' },
        { deadline: 'July 23, 2026', item: 'MHADA MSIB 25-work package (Dahisar, Borivali, Mankhurd)', action: 'Bid readiness & document verification' },
        { deadline: 'July 24, 2026', item: 'City & West MSIB 49-work package (Wadala, Dadar, Andheri)', action: 'Pre-bid queries & consortium review' }
      ],
      immediateActionList: [
        'Complete submission for MSIB 50-work packages due today.',
        'Screen Parel-Kalachowki SRA JDA parameters for comparative developer benchmarking.',
        'Check water-tunnel alignment constraints for western suburban projects.'
      ]
    },
    {
      briefId: 'brief-2026-07-20',
      date: 'Mon, Jul 20, 2026',
      publishedAt: '2026-07-20T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'Mulund 15-Acre Dumping Ground Lease for Dharavi Precast Yard, Bharat Nagar CC under 33(5)+33(19)',
      executiveSummary: [
        'BMC approved a 15-acre temporary 5-year lease at the closed Mulund dumping ground for a casting yard, RMC plant, and precast infrastructure supporting the Dharavi Redevelopment Project (~₹98-103 Cr total rent).',
        'MHADA published a Commencement Certificate for Bharat Nagar Transit Camp & Tata Colony redevelopment under DCPR 33(5), 33(19), and BKC Notified Area regulations.',
        'Gorai United CHS (Chintamani) secured CC for self-redevelopment in Borivali West.'
      ],
      rankedItems: [
        {
          id: 'jul20-1',
          title: 'Mulund 15-acre dumping ground site handed over for Dharavi precast casting yard',
          category: 'Dharavi & Land Monetisation',
          whatHappened: 'BMC resolved to hand over 15 acres at Mulund dumping ground for 5 years to Navbharat Mega Developers (Adani SPV) for RMC and precast manufacturing for Dharavi.',
          whyItMatters: 'Demonstrates industrialised off-site construction strategy for Dharavi, which will impact eastern suburban material supply, cement/aggregate availability, and transit-mixer logistics.',
          dprImplication: 'Add dedicated off-site logistics and batching plant dependencies in large cluster DPRs rather than relying only on commercial city RMC vendors.',
          clientAction: 'Assess cement, aggregate, and heavy-haulage transport capacity changes across Mulund, Bhandup, and Kanjurmarg.',
          sources: ['BMC Dumpsite Reclamation Desk', 'Maharashtra Times']
        },
        {
          id: 'jul20-2',
          title: 'Bharat Nagar Transit Camp & Tata Colony CC issued under combined 33(5), 33(19) & BKC controls',
          category: 'MHADA & Regulatory',
          whatHappened: 'MHADA issued CC for redevelopment of Bharat Nagar Transit Camp and Tata Colony (Kole Kalyan) combining DCPR 33(5), 33(19), and BKC Notified Area rules.',
          whyItMatters: 'High-profile precedent for multi-regulatory approvals where transit-camp, layout, and employment-zone rules intersect.',
          dprImplication: 'DPRs for complex BKC/MHADA sites must reconcile differing height, parking, access, and FSI permissions.',
          clientAction: 'Audit MHADA transit camp redevelopment parameters for BKC influence zone projects.',
          sources: ['MHADA Bandra Desk']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 21, 2026', item: 'MHADA MSIB 50 works submission', action: 'Final digital upload' },
        { deadline: 'July 22, 2026', item: 'Andheri-Vile Parle MSIB pre-bid meeting', action: 'Submit drawing & BOQ queries' }
      ],
      immediateActionList: [
        'Analyze Mulund precast logistics precedent for large cluster proposals.',
        'Review BKC-MHADA combined regulatory framework for Bandra/Kole Kalyan sites.',
        'Finalize bid uploads for July 21 MSIB deadline.'
      ]
    },
    {
      briefId: 'brief-2026-07-19',
      date: 'Sun, Jul 19, 2026',
      publishedAt: '2026-07-19T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: '49 Fresh MHADA Works Released, MHADA Act 79A Supreme Court Dependency, BMC 7 STPs Push',
      executiveSummary: [
        'MHADA published 49 fresh works (44 MSIB & 5 MBRRB) closing July 24 across Wadala, Dadar, Parel, Vile Parle, Andheri, and Kandivali-Malad.',
        'MHADA Act Section 79A amendment requires Supreme Court final clearance in addition to Governor assent, affecting ~935 stayed notices and 13,000 cessed buildings.',
        'BMC Commissioner mandated strict timeline adherence on 7 under-construction STPs (Malad, Worli, Bandra, Dharavi, Ghatkopar, Bhandup, Versova - 2,464 MLD combined).'
      ],
      rankedItems: [
        {
          id: 'jul19-1',
          title: 'MHADA releases 49 fresh civil, repair, and cleaning works',
          category: 'MHADA & Tenders',
          whatHappened: 'MHADA published 49 new work packages including ₹2.47 Cr Kaushal Vikas Kendra in Andheri West, ₹1.65 Cr Vile Parle work, and 37 Kandivali-Malad works.',
          whyItMatters: 'Strongest geographic clustering opportunity for civil contractors and material vendors across Mumbai suburbs.',
          dprImplication: 'Include site mobilization, monsoon dewatering, and local access logistics into BOQ rate analysis.',
          clientAction: 'Form execution clusters in Kandivali-Malad and Wadala-Dadar to share equipment and engineering supervision.',
          sources: ['MHADA E-Tenders Portal']
        },
        {
          id: 'jul19-2',
          title: 'MHADA Section 79A legal implementation faces Supreme Court dependency',
          category: 'Regulatory & Cessed Buildings',
          whatHappened: 'Legal reporting confirmed that even after Governor assent, MHADA Act 79A powers remain subject to final Supreme Court adjudication on legal validity.',
          whyItMatters: 'Prevents immediate reliance on Section 79A to take over stalled cessed building redevelopments without litigation risk assessment.',
          dprImplication: 'Maintain parallel feasibility models for landlord/society-led redevelopment alongside statutory authority intervention.',
          clientAction: 'Advise cessed building clients to maintain voluntary consent building rather than halting work for Section 79A.',
          sources: ['Times of India Legal Desk']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 21, 2026', item: '50 MSIB slum improvement works', action: 'Submit bids' },
        { deadline: 'July 24, 2026', item: '49 new MSIB & MBRRB works', action: 'Tender document review & site inspection' }
      ],
      immediateActionList: [
        'Screen 49 new MHADA works for eligibility and margin.',
        'Update cessed building advice to include Supreme Court dependency on Section 79A.',
        'Map redevelopment projects near BMC 7 STP construction zones.'
      ]
    },
    {
      briefId: 'brief-2026-07-18',
      date: 'Sat, Jul 18, 2026',
      publishedAt: '2026-07-18T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'Western Railway Kandivali Terminal Proposal (Defence Land), BMC ₹27 Cr Taj Hotel Demand',
      executiveSummary: [
        'Western Railway proposed MMR\'s largest long-distance terminal at Kandivali using defence-controlled land (54 daily trains capacity).',
        'BMC issued a ₹27-crore demand notice to Taj Mahal Palace Hotel for security barricading occupation of municipal road and footpath space.',
        'MHADA MSIB tender deadlines (July 21 and July 23) enter critical execution phase.'
      ],
      rankedItems: [
        {
          id: 'jul18-1',
          title: 'Western Railway proposes Kandivali long-distance terminal on defence land',
          category: 'Public Land & Infrastructure',
          whatHappened: 'Western Railway submitted a proposal to acquire defence land at Kandivali for a 54-train daily capacity terminal to relieve Mumbai Central and Bandra Terminus.',
          whyItMatters: 'Major transport hub proposal that will alter land values, DP road reservations, traffic access, and redevelopment potential in Kandivali, Malad, and Borivali.',
          dprImplication: 'Add terminal influence zone analysis for nearby society/SRA DPRs, but do not capitalize terminal valuation benefits before defence land sanction.',
          clientAction: 'Prepare Kandivali Terminal Influence Zone map covering nearby MHADA, BMC, and private redevelopment plots.',
          sources: ['Times of India', 'Western Railway Desk']
        },
        {
          id: 'jul18-2',
          title: 'BMC issues ₹27 crore demand for public space occupation',
          category: 'BMC & Land Monetisation',
          whatHappened: 'BMC served demand notice to Taj Mahal Palace Hotel for long-standing security barricades on municipal roads and footpaths.',
          whyItMatters: 'Clear signal of strict municipal monetization and enforcement against unauthorized or unpermitted occupation of public land and footpaths.',
          dprImplication: 'Budget temporary public space/road occupation fees for construction hoardings, cranes, and site barricading.',
          clientAction: 'Conduct physical boundary & public space occupation audits for old commercial and residential redevelopment mandates.',
          sources: ['Navbharat Times', 'BMC Estate Dept']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 21, 2026', item: '50 MSIB West/East works', action: 'Finalize BOQs' },
        { deadline: 'July 23, 2026', item: '25 MSIB Dahisar/Govandi works', action: 'Complete partner eligibility checks' }
      ],
      immediateActionList: [
        'Prepare Kandivali railway terminal influence zone note.',
        'Add public-space barricading & road occupation costs to DPR template.',
        'Complete bid prep for MSIB packages.'
      ]
    },
    {
      briefId: 'brief-2026-07-17',
      date: 'Fri, Jul 17, 2026',
      publishedAt: '2026-07-17T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'BMC Clears 11.58-Acre Dharavi BEST Depot Transfer, 25 New MSIB Civil Works, Worli Premium Relief',
      executiveSummary: [
        'BMC General Body approved transfer of 11.58-acre Dharavi & Kalakilla BEST depot land for the Dharavi Redevelopment Project, requiring developer to construct replacement depot and operate for 10 years.',
        'MHADA published 25 new MSIB works closing July 23 across Dahisar, Borivali, Kandivali, Bhandup, Vikhroli, Govandi, Chembur, Chita Camp, and Mankhurd.',
        'Shivaji Nagar Shivkiran CHSL (Worli Buildings 6 & 7) availed MHADA premium-reduction under Jan 14, 2021 GR.'
      ],
      rankedItems: [
        {
          id: 'jul17-1',
          title: 'BMC clears 11.58-acre Dharavi & Kalakilla BEST depot land transfer',
          category: 'Dharavi & BEST Land',
          whatHappened: 'BMC body of corporators voted to transfer 11.58 acres of combined BEST (2.35 acres) and Collector (9.23 acres) land for Dharavi Redevelopment with 10-year depot replacement O&M.',
          whyItMatters: 'Sets a major precedent for integrating municipal, transport, and Collector land into a single cluster rehabilitation framework.',
          dprImplication: 'For multi-authority land proposals, title diligence must separate ownership, reservation, possession sequence, and long-term asset replacement obligations.',
          clientAction: 'Create Public-Land Integration Framework for clients dealing with mixed BEST, BMC, and Collector plots.',
          sources: ['Times of India', 'BMC Corporation Records']
        },
        {
          id: 'jul17-2',
          title: 'Worli MHADA layout project avails premium reduction under 2021 GR',
          category: 'MHADA & Feasibility',
          whatHappened: 'MHADA published notice confirming premium reduction for Buildings 6 & 7, Shivaji Nagar Shivkiran CHSL, Worli under 14.01.2021 GR.',
          whyItMatters: 'Demonstrates active financial savings for MHADA layout redevelopments utilizing government premium concessions.',
          dprImplication: 'Include premium concession eligibility, milestone payment schedules, and clawback risk in MHADA feasibility models.',
          clientAction: 'Offer statutory premium & concession audit for MHADA colony redevelopment projects.',
          sources: ['MHADA Official Notice Board']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 21, 2026', item: 'MSIB 50-work package', action: 'Complete digital signatures & EMD' },
        { deadline: 'July 23, 2026', item: '25 new MSIB works', action: 'Download BOQs and inspect sites' }
      ],
      immediateActionList: [
        'Analyze Dharavi depot land transfer model for public-private land integration.',
        'Review 25 new MSIB civil packages for Dahisar and Govandi.',
        'Initiate MHADA premium audit service for housing societies.'
      ]
    },
    {
      briefId: 'brief-2026-07-16',
      date: 'Thu, Jul 16, 2026',
      publishedAt: '2026-07-16T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'Raymond Realty ₹8,500 Cr Parel JDA, BMC Construction AQI Sensor Audits, Fresh MHADA Tenders',
      executiveSummary: [
        'Raymond Realty signed an ₹8,500-crore GDV joint development agreement in Parel, marking its first South Mumbai project and 8th overall JDA.',
        'BMC invited tenders for 3rd-party audit and verification of ~3,000 construction site AQI sensors across Mumbai.',
        'MHADA published electrical & pumping tenders (New Hind Mill transit camp, Pratiksha Nagar, Dharavi, Chembur, Ghatkopar).'
      ],
      rankedItems: [
        {
          id: 'jul16-1',
          title: 'Raymond Realty signs ₹8,500-crore Parel residential JDA',
          category: 'Developer & Investor Signals',
          whatHappened: 'Raymond Realty informed stock exchanges of signing an asset-light JDA for a prime Parel site with ~₹8,500 crore GDV, taking total portfolio GDV to ₹52,000 crore.',
          whyItMatters: 'Confirms corporate developer appetite for central Mumbai land aggregation and redevelopment through partnership models.',
          dprImplication: 'Central Mumbai DPRs should model outright assignment vs fixed area-sharing vs revenue-sharing JDAs.',
          clientAction: 'Approach Parel/Sewri societies with independent developer selection and JDA protection advisory.',
          sources: ['BSE/NSE Exchange Filing', 'Economic Times']
        },
        {
          id: 'jul16-2',
          title: 'BMC mandates 3rd-party audits for 3,000 construction AQI sensors',
          category: 'Construction Supply & Compliance',
          whatHappened: 'BMC invited bids for independent verification, calibration, and dashboard connectivity audits of real-time AQI sensors at construction sites.',
          whyItMatters: 'Converts environmental monitoring from passive paperwork into enforceable site-level contractor deliverables.',
          dprImplication: 'Add explicit environmental monitoring cost heads (sensor rental, calibration, sprinklers, covered transport) in demolition/excavation tenders.',
          clientAction: 'Offer developers and demolition contractors a bundled AQI & dust compliance log package.',
          sources: ['Times of India', 'BMC Environment Desk']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 21, 2026', item: '50 MSIB slum improvement works', action: 'Submit bids' },
        { deadline: 'July 29, 2026', item: 'MHADA electrical & transit camp pumping tenders', action: 'Pre-bid meeting July 21, submit July 29' }
      ],
      immediateActionList: [
        'Map Parel-Sewri land aggregation and JDA opportunities.',
        'Add AQI sensor audit & environmental compliance line items to construction budgets.',
        'Prepare for MHADA pumping machinery pre-bid meeting.'
      ]
    },
    {
      briefId: 'brief-2026-07-15',
      date: 'Wed, Jul 15, 2026',
      publishedAt: '2026-07-15T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'Cabinet Approves MSRTC PPP Land Redevelopment, BMC ₹718 Cr Waste Contract Row, MHADA 79A Details',
      executiveSummary: [
        'Maharashtra Cabinet formally approved MSRTC land redevelopment across 1,485 hectares under PPP model for modern transport hubs and commercial mixed-use.',
        'BMC\'s ₹718-crore waste collection contract row highlights municipal tender defensibility and procurement challenge risks.',
        'MHADA Act Section 79A amendment details confirmed for ~13,000 old dilapidated buildings, awaiting operational notification.'
      ],
      rankedItems: [
        {
          id: 'jul15-1',
          title: 'Maharashtra Cabinet approves statewide MSRTC land redevelopment via PPP',
          category: 'Public Land & PPP',
          whatHappened: 'Cabinet granted formal approval to redevelop MSRTC bus depots, terminals, and workshops through private partnerships.',
          whyItMatters: 'Upgrades MSRTC land monetisation from proposal to official state policy, opening major transport-oriented development (TOD) opportunities.',
          dprImplication: 'DPRs must include transport operation retention, temporary depot relocation, commercial cross-subsidy, and revenue waterfall models.',
          clientAction: 'Prepare parcel-ranking framework to evaluate MSRTC sites based on location, access, operational footprint, and market absorption.',
          sources: ['Times of India', 'Maharashtra Cabinet Decision']
        },
        {
          id: 'jul15-2',
          title: 'BMC ₹718 crore waste contract dispute highlights municipal tender risk',
          category: 'BMC & Tenders',
          whatHappened: 'Political scrutiny raised over BMC\'s ₹718 crore waste transport contract process regarding eligibility tailoring and competition.',
          whyItMatters: 'Demonstrates that public authority tenders can face post-evaluation challenges if process transparency and corrigenda are not defensible.',
          dprImplication: 'Add Procurement Challenge Risk Review checklist before bidding on large BMC/MHADA packages.',
          clientAction: 'Issue Tender Defensibility Notes for high-value public authority bids.',
          sources: ['Times of India Municipal Desk']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 16, 2026', item: 'MHADA MSIB West tenders 3553 & 3554', action: 'Final submission deadline' },
        { deadline: 'End of July 2026', item: 'BMC C&D waste & soil portal launch', action: 'Transporter & site audit' }
      ],
      immediateActionList: [
        'Finalize submissions for MHADA MSIB tenders closing July 16.',
        'Develop MSRTC transport land PPP screening template.',
        'Prepare tender defensibility checklist for public bids.'
      ]
    },
    {
      briefId: 'brief-2026-07-14',
      date: 'Tue, Jul 14, 2026',
      publishedAt: '2026-07-14T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'BMC C&D Waste & Soil Exchange Portal, MSRTC 1,485 Ha PPP Land, MMRDA Debt Mobilisation',
      executiveSummary: [
        'BMC to launch single portal by end of July 2026 for monitoring C&D waste and facilitating soil exchange between construction sites.',
        'MSRTC preparing PPP redevelopment of ~1,485 hectares of depot land across Maharashtra.',
        'MMRDA mobilising debt for Metro Lines 5A, 10, and 12 across Kalyan, Ulhasnagar, Mira Road, and Taloja.'
      ],
      rankedItems: [
        {
          id: 'jul14-1',
          title: 'BMC to launch digital portal for C&D waste tracking and soil exchange',
          category: 'Construction Supply & Compliance',
          whatHappened: 'BMC announced a unified digital platform launching end-July 2026 to track demolition waste and facilitate surplus excavated soil exchange between sites.',
          whyItMatters: 'Moves debris disposal and soil movement from informal site management to digital traceability and strict municipal verification.',
          dprImplication: 'Replace generic debris allowances with mandatory C&D waste and excavated soil schedules (tonnes, vehicle registration, authorized destinations).',
          clientAction: 'Launch Digital Debris and Soil Logistics Management service for active demolition/excavation clients.',
          sources: ['Times of India']
        },
        {
          id: 'jul14-2',
          title: 'MMRDA debt mobilisation signals regional metro infrastructure acceleration',
          category: 'MMRDA & Infrastructure',
          whatHappened: 'MMRDA initiated funding for Metro Line 5A (Kalyan-Ulhasnagar), Line 10 (Gaimukh-Mira Road), and Line 12 (Kalyan-Taloja).',
          whyItMatters: 'Secured Metro financing improves delivery certainty, driving transit-oriented redevelopment value along regional corridors.',
          dprImplication: 'Separate current connectivity from future metro completion milestones in feasibility and sales absorption models.',
          clientAction: 'Build Metro-Linked MMR Land Watchlist for Kalyan, Ulhasnagar, Mira Road, and Taloja.',
          sources: ['MMRDA Portal', 'Times of India']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 14, 2026', item: 'MHADA West tenders 3550 & 3551', action: 'Final portal submission today' },
        { deadline: 'July 16, 2026', item: 'MHADA West tenders 3553 & 3554', action: 'Commercial & compliance review' }
      ],
      immediateActionList: [
        'Submit MHADA West tenders 3550 & 3551 before portal deadline.',
        'Audit site C&D waste and soil readiness before BMC portal launch.',
        'Create Metro-linked MMR land watchlist.'
      ]
    },
    {
      briefId: 'brief-2026-07-13',
      date: 'Mon, Jul 13, 2026',
      publishedAt: '2026-07-13T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'BEST Depot PPP Opposition, BMC Ghatkopar STP Deadline, Developer Legal Hiring Surge',
      executiveSummary: [
        'Citizens forum Aamchi Mumbai Aamchi BEST publicly opposed Maharashtra government\'s proposal to redevelop BEST bus depots through private developers.',
        'BMC set March 2027 completion deadline for 337-MLD Ghatkopar sewage treatment plant.',
        'Real estate developers expanding in-house legal teams to handle complex redevelopment, JDAs, and title due diligence.'
      ],
      rankedItems: [
        {
          id: 'jul13-1',
          title: 'BEST depot redevelopment faces public opposition over transport use',
          category: 'Public Land & PPP',
          whatHappened: 'Aamchi Mumbai Aamchi BEST petitioned against commercial PPP redevelopment of BEST bus depot land, demanding protection of core transport utility.',
          whyItMatters: 'Highlights public-purpose and litigation risk for PPP models on transport land.',
          dprImplication: 'Include public consultation, transport capacity retention, and litigation sensitivity in public land DPRs.',
          clientAction: 'Prepare BEST Depot PPP Risk Framework emphasizing transport enhancement alongside commercial FSI.',
          sources: ['Times of India']
        },
        {
          id: 'jul13-2',
          title: 'BMC accelerates 337-MLD Ghatkopar STP for March 2027 completion',
          category: 'BMC & Infrastructure',
          whatHappened: 'BMC directed accelerated construction and extra manpower for Ghatkopar STP completion by March 2027.',
          whyItMatters: 'Off-site sewer capacity directly impacts building approvals, occupancy permissions, and environmental NOCs in eastern suburbs.',
          dprImplication: 'Add Municipal Infrastructure Capacity Schedule covering sewer main capacity, water supply, and SWD connection.',
          clientAction: 'Update Ghatkopar, Pant Nagar, Vikhroli, and Kurla DPRs with sewer capacity interface assumptions.',
          sources: ['Times of India']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 13, 2026', item: 'MHADA MSIB East tenders 3549/2 & 3549/3', action: 'Final submission today' },
        { deadline: 'July 14, 2026', item: 'MHADA MSIB West tenders 3550 & 3551', action: 'Submit bids' }
      ],
      immediateActionList: [
        'Close MSIB East tender submissions due today.',
        'Draft BEST depot PPP stakeholder risk note.',
        'Update eastern suburban DPRs with Ghatkopar STP infrastructure timeline.'
      ]
    },
    {
      briefId: 'brief-2026-07-12',
      date: 'Sun, Jul 12, 2026',
      publishedAt: '2026-07-12T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'MHADA CC for Pant Nagar Sugam CHS, BMC Structural Consultant EOI, Public Land Inquiry Warning',
      executiveSummary: [
        'MHADA issued Further Commencement Certificate (July 8, 2026) for Pant Nagar Sugam CHS (Bldg 193 & 194, Ghatkopar East).',
        'BMC structural consultant EOI closes July 14 for municipal building repair, rehabilitation, and reconstruction.',
        'PMO ordered probe into Mahagenco 214.8 ha land acquisition, underscoring title diligence requirements for public/government land.'
      ],
      rankedItems: [
        {
          id: 'jul12-1',
          title: 'MHADA issues Further CC for Pant Nagar Sugam CHS redevelopment',
          category: 'MHADA & Approvals',
          whatHappened: 'MHADA granted Further CC for Buildings 193 & 194 (Pant Nagar Sugam CHS) on FP 348/349 part, Ghatkopar East.',
          whyItMatters: 'Demonstrates MHADA colony redevelopment projects advancing from NOC to construction permissions.',
          dprImplication: 'Track approval progression through IOD, initial CC, further CC, rehab completion, and part/full OC.',
          clientAction: 'Map Pant Nagar layout redevelopment files for cluster vendor & logistics opportunities.',
          sources: ['MHADA Portal']
        },
        {
          id: 'jul12-2',
          title: 'PMO land acquisition inquiry underscores strict title verification standards',
          category: 'Collector & Government Land',
          whatHappened: 'PMO directed inquiry into Mahagenco\'s acquisition of 214.8 ha compensatory afforestation land following title verification and valuation allegations.',
          whyItMatters: 'Public authority or PSU involvement does not substitute for parcel-level title chain verification.',
          dprImplication: 'Include parcel-level evidence matrix (property card, 7/12, mutation history, cadastral map, possession, litigation) for Collector/government land.',
          clientAction: 'Add parcel-level title verification checklist to all government land DPR formats.',
          sources: ['Times of India']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 13, 2026', item: 'MSIB East tenders 3549/2 & 3549/3', action: 'Final review & submission' },
        { deadline: 'July 14, 2026', item: 'BMC Structural Consultant EOI & MSIB West 3550/3551', action: 'Complete bid submission' }
      ],
      immediateActionList: [
        'Add Pant Nagar Sugam CHS to active MHADA project tracker.',
        'Complete review for BMC structural consultant EOI before July 14.',
        'Implement parcel-level title matrix for government land studies.'
      ]
    },
    {
      briefId: 'brief-2026-07-11',
      date: 'Sat, Jul 11, 2026',
      publishedAt: '2026-07-11T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'MHADA Act Section 79A Amendment Passed, BMC OC Amnesty Scheme Cleared, Demolition C&D Waste Mining',
      executiveSummary: [
        'Maharashtra Legislature passed MHADA Act Section 79A amendment to resolve legal ambiguity stalling action on ~935 notices and 13,000 old cessed buildings.',
        'BMC Standing Committee approved OC Amnesty Scheme framework for eligible pre-Nov 2016 buildings up to 80 sq.m.',
        'Demolition waste and circular C&D material reuse emerging as major DPR cost and ESG workstream.'
      ],
      rankedItems: [
        {
          id: 'jul11-1',
          title: 'MHADA Act Section 79A amendment passes Legislature for 13,000 old buildings',
          category: 'MHADA & Cessed Buildings',
          whatHappened: 'Legislature passed amendment empowering designated MHADA officers under Section 79A, removing legal flaws stayed by High Court for ~935 notices.',
          whyItMatters: 'Strengthens MHADA\'s authority to intervene where landlords or societies fail to redevelop dangerous cessed buildings.',
          dprImplication: 'Add Section 79A status matrix (cessed category, Sec 354 notice, ownership, prior developer NOC, tenant record) in cessed building DPRs.',
          clientAction: 'Prepare Section 79A opportunity & risk register covering active cessed building mandates.',
          sources: ['Times of India']
        },
        {
          id: 'jul11-2',
          title: 'BMC Standing Committee clears OC Amnesty Scheme framework',
          category: 'BMC & Compliance',
          whatHappened: 'Standing Committee approved regularisation framework for non-OC residential buildings occupied prior to Nov 17, 2016 (flats up to 80 sq.m).',
          whyItMatters: 'Enables non-OC buildings to resolve conveyance, financing, and legal title issues, boosting future redevelopment viability.',
          dprImplication: 'Include OC status compliance schedule comparing sanctioned vs constructed plans, CC stages, fire NOCs, and FSI deviations.',
          clientAction: 'Offer two-stage client service: OC Amnesty Eligibility Audit + Post-Regularisation Redevelopment DPR.',
          sources: ['Times of India']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 13, 2026', item: 'MSIB East tenders 3549/2 & 3549/3', action: 'Final bid submission' },
        { deadline: 'July 14, 2026', item: 'MSIB West tenders 3550 & 3551', action: 'Bid preparation' }
      ],
      immediateActionList: [
        'Audit cessed building clients for Section 79A applicability.',
        'Initiate OC status audits across active redevelopment mandates.',
        'Include C&D waste recovery & recycling plan in cluster DPRs.'
      ]
    },
    {
      briefId: 'brief-2026-07-10',
      date: 'Fri, Jul 10, 2026',
      publishedAt: '2026-07-10T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'Fresh MHADA West Tenders (3553 & 3554), BMC Pali Hill Waste-to-Energy SPV, ₹13,000 Cr Flood Plan',
      executiveSummary: [
        'MHADA published fresh MSIB West tenders No. 3554 (20 works) and No. 3553 (15 works) closing July 16.',
        'BMC SWM portal listed Pali Hill Decentralized Waste-to-Energy SPV tender closing July 27.',
        'Chief Minister announced ₹13,000-crore integrated flood-control project targeting 370 chronic hotspots in Mumbai.'
      ],
      rankedItems: [
        {
          id: 'jul10-1',
          title: 'MHADA publishes fresh West Division MSIB tenders No. 3553 & 3554',
          category: 'MHADA & Tenders',
          whatHappened: 'MHADA listed E-Tenders 3554 (20 works) and 3553 (15 works) under EE/West/MSIB, published July 9, closing July 16.',
          whyItMatters: 'Immediate contractor, vendor, and material supply entry point for suburban slum improvement works.',
          dprImplication: 'Maintain live MSIB micro-works tracker with ward, work type, closing date, EMD, and contractor class.',
          clientAction: 'Download tender documents for 3553 and 3554 for immediate rate analysis.',
          sources: ['MHADA Portal']
        },
        {
          id: 'jul10-2',
          title: 'Chief Minister announces ₹13,000-crore flood control project for Mumbai',
          category: 'BMC & Infrastructure',
          whatHappened: 'CM announced ₹13,000 cr flood-control plan awaiting Centre approval, targeting 370 flooding hotspots after Mumbai received 42% annual rain in 6 days.',
          whyItMatters: 'Directly impacts basement feasibility, stormwater drainage requirements, plinth heights, and monsoon execution costs.',
          dprImplication: 'Add mandatory flood-risk page in DPRs: nearest flooding hotspot, SWD capacity, high-tide backflow, dewatering cost, and monsoon productivity loss.',
          clientAction: 'Update flood risk registers for active projects in Bandra, Sion, Wadala, Kurla, Andheri, and low-lying MMR pockets.',
          sources: ['Times of India']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 14, 2026', item: 'MHADA West tenders 3550 & 3551', action: 'Submit bids' },
        { deadline: 'July 16, 2026', item: 'MHADA West tenders 3553 & 3554', action: 'Tender document review' },
        { deadline: 'July 27, 2026', item: 'BMC Pali Hill WTE revival SPV', action: 'ESG & FM opportunity review' }
      ],
      immediateActionList: [
        'Review MHADA/MSIB 3553 & 3554 tender documents.',
        'Add flood-risk and monsoon execution assumptions to all live DPRs.',
        'Prepare pitch for national developers entering Mumbai redevelopment.'
      ]
    },
    {
      briefId: 'brief-2026-07-09',
      date: 'Thu, Jul 9, 2026',
      publishedAt: '2026-07-09T08:00:00.000Z',
      title: 'Daily Mumbai & MMR Redevelopment Intelligence Brief',
      focus: 'MHADA MSIB Tenders (3550 & 3551), BMC Building ID Platform, Heavy Monsoon Impact',
      executiveSummary: [
        'MHADA updated tender list featuring MSIB West E-Tenders 3550 (15 works) and 3551 (16 works) closing July 14.',
        'BMC Building ID platform integrating CCNs, CTS numbers, and municipal records for 2.3 lakh buildings.',
        'Santacruz recorded 1,017 mm rainfall in first 7 days of July, creating excavation, piling, and site access risks.'
      ],
      rankedItems: [
        {
          id: 'jul09-1',
          title: 'MHADA MSIB West Division publishes E-Tenders 3550 and 3551',
          category: 'MHADA & Tenders',
          whatHappened: 'MHADA e-published two MSIB West tenders (31 total works) closing July 14 for slum civil works.',
          whyItMatters: 'Immediate bid and vendor opportunity for local civil execution and material supply.',
          dprImplication: 'Use MSIB work listings as lead signals for local settlement improvement and future redevelopment pockets.',
          clientAction: 'Check eligibility, EMD, work descriptions, and rate competitiveness before July 14.',
          sources: ['MHADA Portal']
        },
        {
          id: 'jul09-2',
          title: 'BMC Building ID platform integration for title and approval due diligence',
          category: 'BMC & Title Diligence',
          whatHappened: 'BMC Building ID platform created unified digital IDs integrating CTS, assessment, and approval references for assessed buildings.',
          whyItMatters: 'Practical due diligence tool to resolve mismatches between CTS, property cards, and municipal approvals.',
          dprImplication: 'Add BMC Building ID verification step to DPR title checklists.',
          clientAction: 'Create one unified table in DPRs: CTS number, property card, assessment number, Building ID, DP reservation, and ownership authority.',
          sources: ['BMC Portal']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 14, 2026', item: 'MHADA MSIB West tenders 3550 & 3551', action: 'Submit bids' },
        { deadline: 'July 13, 2026', item: 'MHADA MSIB East tenders 3549/2 & 3549/3', action: 'Review eligibility' }
      ],
      immediateActionList: [
        'Download MHADA/MSIB 3550 and 3551 tender files.',
        'Create MHADA premium reduction opportunity tracker for Versova, Goregaon, Bandra, Andheri, Charkop, Vikhroli, and Borivali.',
        'Add BMC Building ID verification to DPR checklists.'
      ]
    },
    {
      briefId: 'brief-2026-07-08',
      date: 'Wed, Jul 8, 2026',
      publishedAt: '2026-07-08T08:00:00.000Z',
      title: 'Daily Mumbai Redevelopment Intelligence Brief (Baseline Edition)',
      focus: 'HC Backs MHADA Layouts (Bandra/Worli), SRA Mega-Clusters, Reliance Juhu Galli Win, MMRDA 34k Ha Land',
      executiveSummary: [
        'Bombay High Court dismissed challenges to MHADA layout redevelopment at Bandra Reclamation and Worli under DCPR 33(5), backing MHADA\'s rights as landowner (Adani selected; MHADA to receive ₹3,900 Cr & ₹1,922 Cr premiums).',
        'SRA pushing mega-cluster model for Behrampada, Majaswadi, and Wadala, identifying clusters over 50 acres.',
        'Reliance 4IR Realty won 101.4-acre Juhu Galli SRA cluster for 28,000+ rehab homes.',
        'Maharashtra approved transfer of 33,954.61 hectares government land to MMRDA across Thane, Raigad, and Palghar.'
      ],
      rankedItems: [
        {
          id: 'jul08-1',
          title: 'Bombay HC backs MHADA-led redevelopment of Bandra Reclamation & Worli layouts',
          category: 'MHADA & Public Land',
          whatHappened: 'Bombay High Court dismissed petitions challenging GRs for MHADA layout redevelopment under DCPR 33(5), upholding MHADA\'s rights as landowner.',
          whyItMatters: 'Major precedent weakening individual society consent challenges on authority-owned land and strengthening public land cluster models.',
          dprImplication: 'DPRs must separate occupier rights, society rights, leasehold rights, and authority ownership rights, adding legal risk analysis on society consent vs authority policy.',
          clientAction: 'Prepare MHADA layout opportunity tracker for Bandra, Worli, Goregaon, Vikhroli, Borivali, and Charkop.',
          sources: ['Times of India', 'High Court Records']
        },
        {
          id: 'jul08-2',
          title: 'Reliance wins 101.4-acre Juhu Galli cluster, validating corporate entry into SRA',
          category: 'SRA & Corporate Entry',
          whatHappened: 'Reliance 4IR Realty won bid for 101.4-acre Juhu Galli slum cluster in Andheri for 28,000+ rehab homes with performance guarantee requirements.',
          whyItMatters: 'Market signal that corporate developers view SRA as investable when scale, policy support, and FSI rights are strong.',
          dprImplication: 'Include rent escrow, performance guarantee, community risk, and infrastructure cost-sharing sections for large SRA projects.',
          clientAction: 'Prepare investor-facing templates for 50+ acre SRA opportunities.',
          sources: ['Times of India']
        }
      ],
      urgentDeadlines: [
        { deadline: 'July 14, 2026', item: 'MHADA MSIB West tenders 3550/3551', action: 'Prepare submissions' }
      ],
      immediateActionList: [
        'Create three trackers: SRA mega-clusters, MHADA layouts, and BMC/Collector public land.',
        'Update DPR templates with authority ownership vs society rights distinction.',
        'Start client outreach for MHADA layout societies and developers.'
      ]
    }
  ];

  let dailyBriefs = [...EMBEDDED_DAILY_BRIEFS];
  let liveNewsArticles = [];
  let currentSearch = '';
  let currentFilter = 'All';

  // Fetch Daily Intelligence Briefs from API with fallback
  async function loadDailyBriefs() {
    try {
      const res = await fetch('/api/daily-briefs?limit=50');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.briefs) && data.briefs.length > 0) {
          dailyBriefs = data.briefs;
        }
      }
    } catch (err) {
      console.warn('API fetch for daily briefs unavailable, using embedded briefs dataset.', err);
    }
  }

  // Fetch Live News Articles from API
  async function loadLiveNews() {
    try {
      const res = await fetch('/api/news?page=1');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.articles)) {
          liveNewsArticles = data.articles;
        }
      }
    } catch (err) {
      console.warn('API fetch for live news RSS unavailable.', err);
    }
  }

  // Initialize Page
  async function init() {
    const loader = document.getElementById('news-loader');
    if (loader) loader.classList.remove('hidden');

    await Promise.allSettled([loadDailyBriefs(), loadLiveNews()]);

    if (loader) loader.classList.add('hidden');

    renderFeaturedBrief();
    renderFeed();
    bindEvents();
  }

  // Render Top Hero Featured Brief
  function renderFeaturedBrief() {
    const container = document.getElementById('featured-brief-container');
    if (!container || dailyBriefs.length === 0) return;

    const latest = dailyBriefs[0];

    const summaryBullets = (latest.executiveSummary || []).slice(0, 3).map(
      (bullet) => `<li class="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed"><span class="text-crimson font-bold text-base">›</span><span>${escapeHtml(bullet)}</span></li>`
    ).join('');

    container.innerHTML = `
      <div class="rounded-3xl bg-white p-6 sm:p-8 border-2 border-slate-200 shadow-xl relative overflow-hidden text-slate-800">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div class="flex items-center gap-3">
            <span class="rounded-full bg-crimson px-3.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider shadow-sm">
              ⚡ LATEST 8:00 AM IST INTELLIGENCE EDITION
            </span>
            <span class="text-xs text-slate-500 font-bold">📅 ${escapeHtml(latest.date)}</span>
          </div>
          <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active Monitoring Unit
          </span>
        </div>

        <h2 class="text-2xl sm:text-3xl font-bold font-serif text-navy leading-snug mb-2">
          ${escapeHtml(latest.title)}
        </h2>
        <p class="text-xs sm:text-sm text-crimson font-semibold mb-6">
          Focus: ${escapeHtml(latest.focus)}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-slate-200 items-center">
          <div class="md:col-span-2">
            <h4 class="text-xs font-bold text-navy uppercase tracking-wider mb-3">Executive Summary &amp; Highest Impact Signals:</h4>
            <ul class="space-y-2.5">
              ${summaryBullets}
            </ul>
          </div>

          <div class="flex flex-col gap-3 justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-slate-200 pt-5 md:pt-0 md:pl-6">
            <span class="text-[11px] text-slate-500 font-medium">Includes DPR, Feasibility &amp; Action Matrix</span>
            <button 
              type="button" 
              data-open-brief="${escapeHtml(latest.briefId)}" 
              class="rounded-full bg-crimson hover:bg-navy text-white font-bold px-6 py-3 text-xs shadow-md transition-all hover:scale-105"
            >
              📖 Read Full Deep-Dive Brief →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Render Combined Feed Grid
  function renderFeed() {
    const container = document.getElementById('news-grid-container');
    const totalCountEl = document.getElementById('news-total-count');
    if (!container) return;

    // Filter Daily Briefs
    const filteredBriefs = dailyBriefs.filter((b) => {
      const title = (b.title || '').toLowerCase();
      const focus = (b.focus || '').toLowerCase();
      const exec = (b.executiveSummary || []).join(' ').toLowerCase();
      const rankedStr = (b.rankedItems || []).map(i => `${i.title} ${i.whatHappened} ${i.whyItMatters} ${i.category}`).join(' ').toLowerCase();
      const fullText = `${title} ${focus} ${exec} ${rankedStr}`;

      const matchesSearch = !currentSearch || fullText.includes(currentSearch.toLowerCase());
      
      let matchesFilter = true;
      const f = (currentFilter || 'All').toLowerCase();
      if (f === 'daily briefs') {
        matchesFilter = true;
      } else if (f === 'sra') {
        matchesFilter = fullText.includes('sra') || fullText.includes('slum');
      } else if (f === 'mhada') {
        matchesFilter = fullText.includes('mhada');
      } else if (f === 'bmc') {
        matchesFilter = fullText.includes('bmc') || fullText.includes('mcgm') || fullText.includes('collector') || fullText.includes('municipal');
      } else if (f === 'construction') {
        matchesFilter = fullText.includes('construction') || fullText.includes('cement') || fullText.includes('steel') || fullText.includes('rmc') || fullText.includes('debris') || fullText.includes('aqi') || fullText.includes('waste');
      } else if (f === 'developer') {
        matchesFilter = fullText.includes('developer') || fullText.includes('realty') || fullText.includes('investor') || fullText.includes('jda') || fullText.includes('raymond') || fullText.includes('reliance') || fullText.includes('shanti');
      } else if (f === 'tenders') {
        matchesFilter = fullText.includes('tender') || fullText.includes('msib') || fullText.includes('mbrrb') || fullText.includes('eoi') || fullText.includes('bid');
      } else if (f !== 'all') {
        matchesFilter = fullText.includes(f);
      }

      return matchesSearch && matchesFilter;
    });

    // Filter News RSS Articles
    const filteredNews = liveNewsArticles.filter((n) => {
      if (currentFilter === 'Daily Briefs') return false;

      const title = (n.title || '').toLowerCase();
      const desc = (n.description || '').toLowerCase();
      const fullText = `${title} ${desc}`;

      const matchesSearch = !currentSearch || fullText.includes(currentSearch.toLowerCase());
      
      let matchesFilter = true;
      const f = (currentFilter || 'All').toLowerCase();
      if (f === 'sra') {
        matchesFilter = fullText.includes('sra') || fullText.includes('slum');
      } else if (f === 'mhada') {
        matchesFilter = fullText.includes('mhada');
      } else if (f === 'bmc') {
        matchesFilter = fullText.includes('bmc') || fullText.includes('mcgm') || fullText.includes('collector');
      } else if (f === 'construction') {
        matchesFilter = fullText.includes('construction') || fullText.includes('real estate') || fullText.includes('housing');
      } else if (f === 'developer') {
        matchesFilter = fullText.includes('developer') || fullText.includes('realty') || fullText.includes('investor');
      } else if (f === 'tenders') {
        matchesFilter = fullText.includes('tender') || fullText.includes('eoi') || fullText.includes('notice');
      } else if (f !== 'all') {
        matchesFilter = fullText.includes(f);
      }

      return matchesSearch && matchesFilter;
    });

    const totalCount = filteredBriefs.length + filteredNews.length;
    if (totalCountEl) {
      totalCountEl.textContent = `${totalCount} Intelligence & News Updates`;
    }

    if (totalCount === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p class="text-base font-bold text-navy">No redevelopment updates found</p>
          <p class="text-xs text-slate-500 mt-1">Try searching for keywords like "SRA", "MHADA", "BMC", "Collector", or "Cement".</p>
          <button id="reset-news-filter" class="mt-4 rounded-xl bg-navy px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-crimson">Reset Filters</button>
        </div>
      `;
      document.getElementById('reset-news-filter')?.addEventListener('click', () => {
        currentSearch = '';
        currentFilter = 'All';
        const searchInput = document.getElementById('news-search-input');
        if (searchInput) searchInput.value = '';
        updateFilterUI('All');
        renderFeed();
      });
      return;
    }

    // Build Cards HTML
    const briefCardsHtml = filteredBriefs.map((brief) => {
      const summaryText = (brief.executiveSummary && brief.executiveSummary[0])
        ? brief.executiveSummary[0]
        : brief.focus;

      const urgentCount = (brief.urgentDeadlines || []).length;

      return `
        <article class="group flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-red-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
          <div class="p-6">
            <div class="flex items-center justify-between text-[11px] font-bold mb-3">
              <span class="rounded-full bg-crimson/10 text-crimson border border-crimson/20 px-3 py-1 uppercase tracking-wider">
                ⚡ Daily 8:00 AM Brief
              </span>
              <span class="text-slate-500">📅 ${escapeHtml(brief.date)}</span>
            </div>

            <h3 class="text-lg font-bold text-navy font-serif mb-2 leading-snug transition group-hover:text-crimson">
              <a href="#" data-open-brief="${escapeHtml(brief.briefId)}">${escapeHtml(brief.title)}</a>
            </h3>

            <p class="text-xs font-semibold text-red-600 mb-3 leading-tight line-clamp-1">
              Focus: ${escapeHtml(brief.focus)}
            </p>

            <p class="text-xs text-slate-600 leading-relaxed text-justify line-clamp-3 mb-4">
              ${escapeHtml(summaryText)}
            </p>

            ${
              urgentCount > 0
                ? `<div class="mb-4 rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-[11px] font-semibold text-amber-900 flex items-center gap-1.5">
                     <span>⌛</span> <span>${urgentCount} Urgent Statutory / Tender Deadlines Tracked</span>
                   </div>`
                : ''
            }
          </div>

          <div class="border-t border-slate-100 px-6 py-4 bg-slate-50 flex items-center justify-between mt-auto">
            <span class="text-[11px] font-bold text-slate-500">SRA • MHADA • BMC • Collector</span>
            <button 
              type="button" 
              data-open-brief="${escapeHtml(brief.briefId)}" 
              class="inline-flex items-center gap-1 text-xs font-bold text-crimson hover:underline"
            >
              Read Brief ↗
            </button>
          </div>
        </article>
      `;
    }).join('');

    const newsCardsHtml = filteredNews.map((article) => {
      const dateStr = article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Recent';

      const articleImage = article.imageUrl
        ? `
            <div class="relative overflow-hidden bg-slate-100 aspect-video">
              <img
                src="${escapeHtml(article.imageUrl)}"
                alt="${escapeHtml(article.title)}"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerpolicy="no-referrer"
                onerror="this.closest('div').remove()"
              />
              <span class="absolute top-3 left-3 rounded-full bg-navy/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                ${escapeHtml(article.source || 'Media Desk')}
              </span>
            </div>
          `
        : '';

      return `
        <article class="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
          <div>
            ${articleImage}
            <div class="p-6">
              <div class="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-3">
                <span class="text-slate-700 font-bold">📰 Media Report</span>
                <span>📅 ${dateStr}</span>
              </div>

              <h3 class="text-base font-bold text-navy font-serif mb-3 leading-snug transition group-hover:text-crimson">
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(article.title)}</a>
              </h3>

              <p class="text-xs text-slate-600 leading-relaxed text-justify line-clamp-3 mb-4">
                ${escapeHtml(article.description || '')}
              </p>
            </div>
          </div>

          <div class="border-t border-slate-100 px-6 py-4 bg-slate-50/50 mt-auto flex items-center justify-between">
            <span class="text-[11px] font-bold text-slate-500">${escapeHtml(article.source || 'News Desk')}</span>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-crimson">
              Read Article ↗
            </a>
          </div>
        </article>
      `;
    }).join('');

    container.innerHTML = briefCardsHtml + newsCardsHtml;
  }

  // Open Full Daily Intelligence Brief Modal
  function openBriefModal(briefId) {
    const modal = document.getElementById('brief-modal');
    const titleEl = document.getElementById('modal-brief-title');
    const dateFocusEl = document.getElementById('modal-brief-date-focus');
    const contentEl = document.getElementById('modal-brief-content');
    if (!modal || !contentEl) return;

    const brief = dailyBriefs.find((b) => b.briefId === briefId);
    if (!brief) return;

    if (titleEl) titleEl.textContent = brief.title;
    if (dateFocusEl) dateFocusEl.textContent = `Date: ${brief.date} | Focus: ${brief.focus}`;

    // Executive summary section
    const execItems = (brief.executiveSummary || []).map(
      (item) => `<li class="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed"><span class="text-crimson font-bold text-base">✓</span><span>${escapeHtml(item)}</span></li>`
    ).join('');

    // Ranked items section
    const rankedCards = (brief.rankedItems || []).map((item, idx) => `
      <div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 shadow-sm space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <span class="rounded-full bg-navy text-white text-[11px] font-bold px-3 py-1">
            Signal #${idx + 1}
          </span>
          <span class="text-xs font-bold text-crimson bg-crimson/10 border border-crimson/20 px-3 py-1 rounded-full">
            ${escapeHtml(item.category || 'Reconstruction Intelligence')}
          </span>
        </div>

        <h4 class="text-base sm:text-lg font-bold text-navy font-serif leading-snug">
          ${escapeHtml(item.title)}
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div class="bg-white p-3.5 rounded-xl border border-slate-200">
            <span class="text-[11px] font-bold uppercase text-slate-400 block mb-1">📌 What Happened</span>
            <p class="text-xs text-slate-700 leading-relaxed">${escapeHtml(item.whatHappened)}</p>
          </div>
          <div class="bg-white p-3.5 rounded-xl border border-slate-200">
            <span class="text-[11px] font-bold uppercase text-slate-400 block mb-1">🎯 Why It Matters</span>
            <p class="text-xs text-slate-700 leading-relaxed">${escapeHtml(item.whyItMatters)}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-red-50/60 p-3.5 rounded-xl border border-red-200">
            <span class="text-[11px] font-bold uppercase text-crimson block mb-1">📐 DPR &amp; Feasibility Implication</span>
            <p class="text-xs text-slate-800 leading-relaxed">${escapeHtml(item.dprImplication)}</p>
          </div>
          <div class="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200">
            <span class="text-[11px] font-bold uppercase text-blue-900 block mb-1">🚀 Immediate Client Action</span>
            <p class="text-xs text-slate-800 leading-relaxed">${escapeHtml(item.clientAction)}</p>
          </div>
        </div>

        ${
          (item.sources || []).length > 0
            ? `<div class="text-[11px] font-medium text-slate-500 pt-1">
                 Sources: ${item.sources.map(s => escapeHtml(s)).join(', ')}
               </div>`
            : ''
        }
      </div>
    `).join('');

    // Urgent deadlines table
    let deadlinesTable = '';
    if ((brief.urgentDeadlines || []).length > 0) {
      const rows = brief.urgentDeadlines.map(
        (d) => `
          <tr class="border-b border-slate-100 text-xs">
            <td class="py-3 px-4 font-bold text-crimson whitespace-nowrap">${escapeHtml(d.deadline)}</td>
            <td class="py-3 px-4 font-medium text-slate-800">${escapeHtml(d.item)}</td>
            <td class="py-3 px-4 text-slate-600">${escapeHtml(d.action)}</td>
          </tr>
        `
      ).join('');

      deadlinesTable = `
        <div class="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 sm:p-6 space-y-3">
          <h3 class="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
            <span>⌛ Urgent Statutory &amp; Tender Watchlist</span>
          </h3>
          <div class="overflow-x-auto rounded-xl border border-amber-200 bg-white shadow-sm">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-amber-100/60 text-[11px] font-bold uppercase text-amber-900 border-b border-amber-200">
                  <th class="py-2.5 px-4">Deadline</th>
                  <th class="py-2.5 px-4">Matter / Opportunity</th>
                  <th class="py-2.5 px-4">Required Action</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Immediate Action List
    let actionsList = '';
    if ((brief.immediateActionList || []).length > 0) {
      const actItems = brief.immediateActionList.map(
        (act) => `<li class="flex items-start gap-2 text-xs text-slate-700"><span class="text-emerald-600 font-bold">✓</span><span>${escapeHtml(act)}</span></li>`
      ).join('');

      actionsList = `
        <div class="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-6 space-y-3">
          <h3 class="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
            <span>📋 Priority Strategic Action Checklist</span>
          </h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
            ${actItems}
          </ul>
        </div>
      `;
    }

    contentEl.innerHTML = `
      <div class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-wider text-navy">Executive Summary &amp; Key Signals</h3>
        <ul class="rounded-2xl bg-slate-50 p-5 border border-slate-200 space-y-3">
          ${execItems}
        </ul>
      </div>

      <div class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-wider text-navy">Ranked Deep-Dive Intelligence Items</h3>
        <div class="space-y-6">
          ${rankedCards}
        </div>
      </div>

      ${deadlinesTable}
      ${actionsList}
    `;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeBriefModal() {
    const modal = document.getElementById('brief-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  // Update Category UI
  function updateFilterUI(selected) {
    const container = document.getElementById('news-filter-container');
    if (!container) return;
    container.querySelectorAll('button[data-filter]').forEach((b) => {
      const match = b.getAttribute('data-filter') === selected;
      if (match) {
        b.className = 'rounded-full bg-crimson px-4 py-2 text-xs font-bold text-white shadow-md transition';
        b.setAttribute('aria-pressed', 'true');
      } else {
        b.className = 'rounded-full bg-white border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-crimson transition';
        b.setAttribute('aria-pressed', 'false');
      }
    });
  }

  // Event Listeners
  function bindEvents() {
    const searchInput = document.getElementById('news-search-input');
    const filterContainer = document.getElementById('news-filter-container');
    const closeModalBtn = document.getElementById('close-brief-modal');
    const footerCloseBtn = document.getElementById('modal-close-btn-footer');
    const modal = document.getElementById('brief-modal');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderFeed();
      });
    }

    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-filter]');
        if (!btn) return;
        currentFilter = btn.getAttribute('data-filter');
        updateFilterUI(currentFilter);
        renderFeed();
      });
    }

    // Delegation for opening brief modal
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('[data-open-brief]');
      if (openBtn) {
        e.preventDefault();
        const briefId = openBtn.getAttribute('data-open-brief');
        openBriefModal(briefId);
      }
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeBriefModal);
    if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeBriefModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeBriefModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeBriefModal();
    });
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
