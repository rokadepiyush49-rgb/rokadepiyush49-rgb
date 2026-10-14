/**
 * ─────────────────────────────────────────────────────────────────────────
 *  EDIT ME. Every word on the profile comes from this file.
 *  After editing:  npm run assets   (or just push — the workflow re-renders)
 * ─────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  identity: {
    name: 'Piyush Rokade',
    login: 'rokadepiyush49-rgb',
    role: 'Software Developer',
    badge: 'AI × Full-Stack',
    kicker: "Player 1 · VIT Pune · CE '29",
    tagline: 'I solve hard problems and build fast with AI tools, turning ideas into things people actually use.',
    location: 'Pune, India',
    world: 'PUNE',
    email: 'piyushrokade023@gmail.com',
    linkedin: 'piyushrokade007',
    instagram: 'piyush_rokade_51',
    stack: ['TypeScript', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    now: ['> whoami', 'piyush · vit pune', '> status', 'backend ai @ flyrank', '> git push', '★ level clear!'],
  },

  about: {
    lines: [
      'Computer Engineering student at VIT Pune (2025 – 2029) who builds, experiments and ships.',
      'I got into this because I was curious how ideas turn into real products, and somewhere between writing code, solving problems and understanding people I got obsessed with making things that are actually useful.',
      'Not just software that works: software that feels considered.',
      'Right now: backend AI at FlyRank, client projects as Technical Lead of the AWS Student Builder Group, and side quests that scratch my own itch.',
    ],
    table: [
      ['Class', 'Software Developer · AI × Full-Stack'],
      ['Guild', 'B.E. Computer Engineering, Vishwakarma Institute of Technology (VIT), Pune · 2025 – 2029'],
      ['Grade', 'First Class with Distinction'],
      ['Current quests', 'Backend AI Intern @ FlyRank AI · Technical Lead, AWS Student Builder Group VIT Pune'],
      ['Core CS', 'Data Structures & Algorithms · OOP · DBMS'],
      ['Home world', 'Pune, Maharashtra, India'],
    ],
  },

  powerUps: [
    {
      label: 'Languages',
      item: 'shroom',
      note: 'super mushroom',
      items: ['C++', 'Python', 'C', 'JavaScript', 'TypeScript', 'SQL'],
    },
    {
      label: 'Web & Backend',
      item: 'flower',
      note: 'fire flower',
      items: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'FastAPI', 'Flask', 'Node.js', 'Flutter', 'WebSockets', 'SSE', 'JWT / RBAC'],
    },
    {
      label: 'Data & DevOps',
      item: 'oneup',
      note: '1-up',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Supabase', 'Redis', 'Docker', 'GitHub Actions', 'pytest'],
    },
    {
      label: 'AI & ML',
      item: 'star',
      note: 'super star',
      items: ['LightGBM', 'NetworkX', 'LLM Agents', 'Claude Code', 'Copilot', 'Cursor', 'Codex'],
    },
  ],

  levels: [
    {
      code: 'LEVEL 1-1',
      name: 'SUTRA',
      subtitle: 'Financial-crime & insider-risk intelligence platform',
      badge: 'HackMatrix',
      stack: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'LightGBM', 'NetworkX', 'Docker'],
      blurb:
        'Links insider access privileges to suspicious payments across 400K+ transactions and 150K access events with 10 rule checks, 5 graph detectors and 3 ML models.',
      repos: [{ slug: 'sutra', label: 'SUTRA', url: 'https://github.com/rokadepiyush49-rgb/HackMatrix-Hackathon', kind: 'repo' }],
      details: [
        'Fraud-detection pipeline that links insider access privileges to suspicious payments across 400K+ transactions and 150K access events, using 10 rule-based checks, 5 graph detectors and 3 ML models.',
        'Explainability layer that argues for and against every alert and simulates which controls would have stopped it.',
        '1.00 precision, 0.97 recall and zero false alerts on legitimate look-alikes (synthetic test set).',
      ],
    },
    {
      code: 'LEVEL 1-2',
      name: 'JanMaang',
      subtitle: 'AI-powered civic problem-solving platform',
      badge: 'Civic tech',
      stack: ['Next.js', 'TypeScript', 'Flutter', 'FastAPI', 'PostgreSQL', 'PostGIS', 'Redis', 'LLMs'],
      blurb:
        'Connects citizens, government bodies, universities, NGOs and industry partners to turn community problems into actionable, fundable projects.',
      repos: [{ slug: 'janmaang', label: 'JanMaang', url: 'https://github.com/rokadepiyush49-rgb/JaanMaang', kind: 'repo' }],
      details: [
        'Multilingual, voice-enabled, offline-first mobile app with geotagged submissions and before-and-after evidence verification.',
        'Identical reports are clustered so forty people asking for the same fix count as one demand with the weight of forty.',
        'Multi-agent system where AI agents debate student-proposed solutions and check legality, authenticity and feasibility before recommending one.',
      ],
    },
    {
      code: 'LEVEL 1-3',
      name: 'BoardroomAI',
      subtitle: 'An AI board of directors for startup founders',
      badge: 'Live demo',
      stack: ['Next.js 16', 'TypeScript', 'Groq', 'Supabase'],
      blurb:
        'A founder pitches once and eight AI executives (CEO, CTO, CFO, CMO, VC, Legal, Research, Growth) debate it live, vote, and hand back an execution plan.',
      repos: [
        { slug: 'boardroomai', label: 'BoardroomAI', url: 'https://github.com/rokadepiyush49-rgb/BoardroomAI', kind: 'repo' },
        { slug: 'boardroomai-live', label: 'Play live', url: 'https://rokadepiyush49-rgb.github.io/BoardroomAI/', kind: 'live' },
      ],
      details: [
        'Built for HackAgentAIx, the international hackathon hosted by the University of Essex.',
        'Every pitch goes in front of a full executive board instead of a single AI opinion; each executive argues from its own lens before the board votes.',
        'The debate is turned into actionable startup intelligence: a decision and an execution plan.',
      ],
    },
    {
      code: 'LEVEL 1-4',
      name: 'Transparent Charity',
      subtitle: 'Milestone-verified donation escrow on Ethereum',
      badge: 'Web3',
      stack: ['Solidity', 'Express', 'PostgreSQL', 'React', 'Vite', 'Tailwind CSS'],
      blurb:
        'Funds release in tranches only when an independent verifier approves evidence for that milestone, with the full history, rejections included, public forever.',
      repos: [
        {
          slug: 'transparent-charity',
          label: 'Transparent Charity',
          url: 'https://github.com/rokadepiyush49-rgb/transparent-charity-blockchain',
          kind: 'repo',
        },
      ],
      details: [
        "Evidence is part of the protocol: each file's SHA-256 and EXIF are anchored on-chain.",
        'Six deterministic checks per submission catch re-used, resized, edited, back-dated or far-away photos.',
        'A public /verify page re-hashes a photo in the browser, and anyone can stake ETH to freeze a suspicious payout.',
      ],
    },
    {
      code: 'BONUS STAGE',
      name: 'More worlds',
      subtitle: 'Smart Farmer AI · Lumiora',
      badge: 'Bonus',
      stack: ['React', 'Vite', 'Tailwind CSS', 'TypeScript', 'TinyML'],
      blurb:
        'A farm-to-factory assistant for smallholder farmers, and a surgical-margin assessment platform built on hyperspectral imaging and TinyML.',
      repos: [
        { slug: 'smart-farmer', label: 'Smart Farmer AI', url: 'https://github.com/rokadepiyush49-rgb/Smart-Farmer-AI', kind: 'repo' },
        { slug: 'lumiora', label: 'Lumiora', url: 'https://github.com/rokadepiyush49-rgb/Lumiora', kind: 'repo' },
      ],
      details: [
        '**Smart Farmer AI**: crop disease detection from a photo, profit-ranked crop recommendations, weather advisories and a direct farmer-to-factory marketplace.',
        '**Lumiora**: multimodal intraoperative surgical margin assessment using hyperspectral imaging and TinyML.',
      ],
    },
  ],

  quests: [
    {
      org: 'FlyRank AI',
      role: 'Backend AI Intern',
      when: 'Jul 2026 – now',
      where: 'Remote',
      detail: 'Backend engineering on an AI product.',
      icon: 'star',
      current: true,
    },
    {
      org: 'AWS Student Builder Group',
      role: 'Technical Lead · VIT Pune',
      when: 'Oct 2026 – now',
      where: 'Pune',
      detail:
        'Leads client projects for startups and industry partners, including the production website for Daily Bread, a Mumbai-based wellness-beverage startup; runs delivery and workshops for a 128-member club.',
      icon: 'flower',
      current: true,
    },
    {
      org: 'Google Developer Group',
      role: 'Web Development Member · VIT Pune',
      when: 'Nov 2025 – now',
      where: 'Pune',
      detail:
        'Led a team of 25 developers to design and deploy two full-stack platforms, a campus Placement Portal and Parkomate (smart parking); runs code reviews and CI/CD with GitHub Actions.',
      icon: 'shroom',
    },
    {
      org: 'Mood Indigo · IIT Bombay',
      role: 'Contingent Leader',
      when: 'Nov – Dec 2025',
      where: 'Mumbai',
      detail: "Led the college contingent at Asia's largest college cultural festival.",
      icon: 'oneup',
    },
    {
      org: 'Freelance',
      role: 'Full-Stack Developer',
      when: '2025 – 2026',
      where: 'Remote',
      detail: 'Shipped client work end to end, including a tour agency website and a production-line app for a manufacturer.',
      icon: 'coin',
    },
  ],

  trophies: [
    {
      org: 'Harvard HPAIR Asia 2026',
      role: 'International Delegate · "Rising with Resolve"',
      when: '2026',
      detail: 'Selected as an International Delegate for the HPAIR Asia Conference 2026 from 50,000+ applications across 70+ countries.',
      icon: 'star',
      current: true,
    },
    {
      org: 'Honeywell Leadership Challenge Academy',
      role: 'Selectee · U.S. Space & Rocket Center, USA',
      when: '2025',
      detail:
        "One of 4 students from India among 140+ international delegates from 23+ countries, at NASA Marshall's official visitor center.",
      icon: 'rocket',
    },
    {
      org: 'HackAgentAIx',
      role: 'Top 14 · University of Essex, UK',
      when: 'TOP 14',
      detail: 'Advanced from 2,000+ teams worldwide to the Top 14 and the finals of a multi-round international hackathon.',
      icon: 'flag',
    },
  ],

  contact: {
    shout: "LET'S-A GO!",
  },
};
