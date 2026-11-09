import { LocalizedProfile, LocalizedProject, LocalizedUI } from '../../types/i18n';

export const enProfile: LocalizedProfile = {
  name: 'CDUYZH',
  handle: 'cduyzh',
  title: 'Creative Developer · AI Tools · Indie Software Craft',
  subtitle: 'Building products that turn ideas into intuitive everyday craft.',
  roles: ['Frontend Architecture', 'AI Applications', 'Native macOS Utilities', 'Product Design'],
  location: 'Chengdu, China',
  status: 'Based in Chengdu · Exploring New Horizons',
  bio: {
    headline: 'About Me',
    paragraphs: [
      "I'm cduyzh, a creative developer and indie maker based in Chengdu. When I'm not architecting complex interfaces, I build lightweight AI tools, native macOS utilities, and pragmatic products designed to solve everyday friction with uncompromising polish."
    ],
    keywords: ['Web Architecture', 'AI Workflows', 'Native macOS Apps', 'Interface Craft']
  }
};

export const enProjects: LocalizedProject[] = [
  {
    id: '12',
    slug: 'iscreenshot',
    category: 'mac',
    title: 'iScreenshot',
    summary: 'Instant menu bar screen capture, screen color pipette, smart stitching, and gradient canvas framing.',
    description: 'A lightweight native macOS screenshot utility featuring instant global hotkeys, high-precision loupe color picking, scrolling long screenshots, and beautiful canvas framing with gradients and soft shadows.',
    status: 'Released',
    tags: ['macOS Utility', 'Screen Capture', 'Design Tool'],
    year: '2026',
    role: 'Creator & Developer',
    technologies: ['Swift', 'SwiftUI', 'macOS'],
    highlights: [
      'Native menu bar resident with instant hotkey capture, color loupe & scrolling stitch',
      'Pro framing canvas with customizable gradient backdrops, padding, radius & shadow',
      'Instant markup annotations, privacy pixel mosaics, and clipboard copy or file export'
    ],
    demoUrl: 'https://apps.cduyzh.top/iScreenshot/',
    featured: true,
    cover: '/assets/iscreenshot-icon.png',
    coverAlt: 'iScreenshot App Icon'
  },
  {
    id: '11',
    slug: 'mac-translator',
    category: 'mac',
    title: 'iTrans',
    summary: 'Native menu bar translator powered by DeepSeek and Google with zero intermediate hops.',
    description: 'A minimalist macOS translation tool featuring side-by-side comparison, instant OCR word selection, and private local glossaries.',
    status: 'Released',
    tags: ['macOS Utility', 'Translation', 'Menu Bar'],
    year: '2026',
    role: 'Creator & Developer',
    technologies: ['Swift', 'SwiftUI', 'macOS'],
    highlights: [
      'Native macOS menu bar resident with global hotkey and side-by-side translation',
      'Direct integration with DeepSeek and Google engines for maximum privacy and zero latency',
      'Private offline terminology bank and immersive word hover translation'
    ],
    demoUrl: 'https://apps.cduyzh.top/iTrans/',
    featured: true,
    cover: '/assets/mac-translator-icon.png',
    coverAlt: 'iTrans App Icon'
  },
  {
    id: '09',
    slug: 'cards-score',
    category: 'mobile',
    title: 'Cards Score',
    summary: 'A minimalist scorekeeper and settlement companion for card and board game nights.',
    description: 'Effortless round scoring for poker, mahjong, and tabletop games. Features multi-player rooms, real-time sync, offline persistence, and automated winner calculation without interrupting game flow.',
    status: 'Released',
    tags: ['WeChat Mini-Program', 'Scorekeeper', 'Board Games'],
    year: '2026',
    role: 'Creator & Developer',
    technologies: ['WeChat Mini Program', 'Cloud Base', 'TypeScript'],
    highlights: [
      'Multiplayer real-time score sync with seamless offline recovery',
      'Distraction-free ergonomic UI designed for one-handed operation',
      'Customizable settlement rules and tournament leaderboard tracking'
    ],
    qrCode: '/assets/cards-score-qrcode.jpg',
    featured: true,
    cover: '/assets/cards-score-cover.jpg',
    coverAlt: 'Cards Score Mini Program Cover'
  },
  {
    id: '01',
    slug: 'hsr-archive',
    category: 'game',
    title: 'HSR Speedrun Archive',
    summary: 'Combat logs, low-cost zero-cycle run tracking, and endgame boss analytics for Honkai: Star Rail.',
    description: 'Curated clearing logs across Memory of Chaos, Pure Fiction, and Apocalyptic Shadow. Filter by character eidolons, light cones, gold cost, and replay videos.',
    status: 'Released',
    tags: ['Game Analytics', 'Speedrun Database', 'Submission System', 'Star Rail'],
    year: '2026',
    role: 'Creator & Frontend Lead',
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'Tailwind CSS'],
    highlights: [
      'Multi-mode seasonal combat workbench with URL state sync for one-click sharing',
      'Meta telemetry dashboard tracking character usage rates and team synergies',
      'Community submission workflow with automated duplicate detection and gold-cost auditing'
    ],
    demoUrl: 'https://hsr-archive.cduyzh.top/',
    featured: true,
    cover: '/assets/hsr-archive-cover.jpg',
    coverAlt: 'HSR Speedrun Archive UI Preview'
  },
  {
    id: '02',
    slug: 'hsr-trend',
    category: 'game',
    title: 'HSR Endgame HP Inflation Visualizer',
    summary: 'Interactive telemetry dashboard visualizing boss HP inflation and scaling trends across Honkai: Star Rail versions.',
    description: 'Tracks historical monster effective HP and period-over-period growth across all endgame modes, providing clarity on difficulty power creep.',
    status: 'Released',
    tags: ['Game Analytics', 'Data Visualization', 'Trend Modeling', 'Star Rail'],
    year: '2026',
    role: 'Creator & Data Analyst',
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'ECharts', 'Tailwind CSS'],
    highlights: [
      'Unified multi-mode statistical baseline displaying total HP and period growth',
      'Cache-driven client architecture computing charts on-the-fly with instant return visits',
      'Responsive mobile viewport engineering with overflow-safe tab scrolling'
    ],
    demoUrl: 'https://hsr-trend.cduyzh.top/',
    featured: true,
    cover: '/assets/hsr-trend-cover.jpg',
    coverAlt: 'HSR HP Inflation Dashboard'
  },
  {
    id: '10',
    slug: 'panda-svg',
    category: 'game',
    title: 'Panda Cycling Lab: LLM SVG Animation Arena',
    summary: 'Side-by-side benchmark testing GPT, Claude, DeepSeek, and Qwen on declarative SVG vector animation.',
    description: 'Benchmarking leading AI models with a single prompt: "A panda riding a bicycle". Side-by-side comparison of vector aesthetics, clean SVG code structure, and frame fluidness.',
    status: 'Released',
    tags: ['Generative AI', 'SVG Animation', 'Code Gen', 'LLM Benchmark'],
    year: '2026',
    role: 'Creator & Developer',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Generative AI'],
    highlights: [
      'Single-prompt standardized benchmark evaluating vector generation fidelity',
      'Side-by-side inspection of SVG DOM complexity, path elegance, and keyframe fluidness',
      'Zero-framework lightweight canvas offering high-frame-rate comparative playback'
    ],
    demoUrl: 'https://panda.cduyzh.top/',
    featured: true,
    cover: '/assets/panda-svg-cover.jpg',
    coverAlt: 'Panda Cycling Lab Preview'
  },
  {
    id: '03',
    slug: 'luna-note',
    category: 'mobile',
    title: 'Luna Note',
    summary: 'Privacy-first menstrual cycle tracking and mindful partner care notifications with on-device encryption.',
    description: 'A calm, ad-free health companion designed to replace bloated commercial apps with clean typography, zero cloud tracking, and gentle partner check-ins.',
    status: 'In Development',
    tags: ['Health & Wellness', 'Privacy First', 'Cycle Prediction', 'Partner Care'],
    year: '2026',
    role: 'Concept & Developer',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'IndexedDB', 'PWA'],
    highlights: [
      'Client-side hardware encryption ensuring health data never leaves the device',
      'Radial cycle visualizer rendering follicular, ovulation, and luteal phases',
      'Gentle partner synchronization delivering mindful, non-intrusive status reminders'
    ],
    featured: true,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: 'Luna Note Concept Preview'
  },
  {
    id: '04',
    slug: 'chengdu-radar',
    category: 'mobile',
    title: 'Chengdu Micro-Grid Precipitation Radar',
    summary: 'Hyper-local weather visualization tracking convective cloud clusters across Chengdu municipal districts.',
    description: 'Built for Chengdu’s complex basin topography, synthesizing Doppler radar mosaic tiles and nowcasting extrapolation into a clutter-free timeline.',
    status: 'In Development',
    tags: ['Meteorology', 'Data Visualization', 'GIS', 'Local Weather'],
    year: '2026',
    role: 'Data Pipelines & Frontend',
    technologies: ['TypeScript', 'Canvas / WebGL', 'Weather APIs', 'GeoJSON'],
    highlights: [
      'District-level fine grid slices providing clear convective cloud vectors',
      'Stripped of noisy commercial widgets to focus purely on radar precipitation',
      'Lightweight GPU rendering pipeline optimized for high-resolution Doppler tiles'
    ],
    featured: true,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: 'Chengdu Rain Radar Concept'
  },
  {
    id: '05',
    slug: 'game-radar',
    category: 'game',
    title: 'Upcoming Games Release Radar',
    summary: 'Curated timeline tracking launch windows, platform milestones, and delay tracking for PC & consoles.',
    description: 'Aggregates scattered announcements across Steam, PlayStation, and Nintendo into an organized release countdown with custom hype filtering.',
    status: 'Concept Phase',
    tags: ['Gaming Radar', 'Data Aggregation', 'Release Calendar', 'Indie Games'],
    year: '2026',
    role: 'System Concept & Scraping',
    technologies: ['Next.js', 'TypeScript', 'Node.js Scraping', 'Tailwind CSS'],
    highlights: [
      'Live release date change log highlighting delays and confirmed launch windows',
      'Multi-axis filtering across platforms, game engines, and release quarters',
      'Personal anticipation shortlist with one-click iCal calendar export'
    ],
    featured: true,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: 'Upcoming Game Radar Timeline'
  },
  {
    id: '06',
    slug: 'prompt-matrix',
    category: 'mobile',
    title: 'GPT Image Prompt Lab',
    summary: 'Modular prompt engineering library deconstructing styles, lighting recipes, and camera perspectives for generative imaging.',
    description: 'Eliminates lost prompts and inconsistent image generation with modular syntax blocks for art genres, lighting setups, render engines, and composition rules.',
    status: 'Research',
    tags: ['Generative AI', 'Prompt Engineering', 'Design Systems', 'Inspiration Hub'],
    year: '2025',
    role: 'Designer & Architect',
    technologies: ['React', 'TypeScript', 'LocalStorage', 'Tailwind CSS'],
    highlights: [
      'Parametric prompt synthesis supporting dynamic slot placeholders and variable tokens',
      'Taxonomic tagging across lighting, optical focal lengths, textures, and artist styles',
      'Offline JSON snapshot exports preserving battle-tested production recipes'
    ],
    featured: false,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: 'Prompt Matrix Syntax Tree'
  },
  {
    id: '07',
    slug: 'starrail-intel',
    category: 'game',
    title: 'Star Rail Enemy Weakness & Toughness Index',
    summary: 'Fast-lookup compendium of boss elemental resistances, toughness bars, and crowd control immunities.',
    description: 'A rapid reference tool designed for high-difficulty turn-based runs, clearly organizing boss vulnerability profiles and mechanical patterns.',
    status: 'Research',
    tags: ['Game Guide', 'Enemy Mechanics', 'Team Building', 'Star Rail'],
    year: '2025',
    role: 'Research & Frontend',
    technologies: ['React', 'TypeScript', 'Static Indexing', 'Fuzzy Search'],
    highlights: [
      'Structured breakdown of elemental resistances, toughness bars, and speed thresholds',
      'Rapid filtering by elemental weakness and seasonal Abyss rotations',
      'Zero-dependency static architecture delivering sub-millisecond offline fuzzy search'
    ],
    featured: false,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: 'Star Rail Boss Intelligence Preview'
  },
  {
    id: '08',
    slug: 'avatar-workflow',
    category: 'mobile',
    title: 'Character Portrait Pipeline',
    summary: 'Automated generative workflow synthesizing stylized character portraits and uniform character profile cards.',
    description: 'A pipeline connecting generative diffusion models with deterministic web layout engines to produce consistent character profile sheets.',
    status: 'Research',
    tags: ['AI Workflows', 'Character Design', 'Web Layouts', 'Visual Identity'],
    year: '2025',
    role: 'Pipeline Design & Frontend',
    technologies: ['TypeScript', 'Canvas', 'HTML-to-Image', 'SVG'],
    highlights: [
      'Standardized character sheet templates supporting high-DPI lossless export',
      'Unified palette and lighting post-processing pipeline for cast consistency',
      'Real-time web layout tuner for rapid prompt refinement and proportion balancing'
    ],
    featured: false,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: 'Character Portrait Pipeline Preview'
  }
];

export const enUI: LocalizedUI = {
  nav: {
    about: 'About',
    projects: 'Works',
    capabilities: 'Technical DNA',
    contact: 'Contact',
    cta: 'Get in Touch',
    brandAria: 'CDUYZH Home',
    openMenuAria: 'Open navigation menu',
    closeMenuAria: 'Close navigation menu',
    switchLangAria: 'Switch to Chinese / 切换为中文'
  },
  hero: {
    eyebrow: 'CDUYZH · INDIE MAKER & ENGINEER',
    titleLine1: 'Turning ideas',
    titleLine2: 'into intuitive, everyday craft.',
    description: 'Bridging code, aesthetics, and systems engineering. Building products that solve real problems with uncompromising polish.',
    exploreBtn: 'Explore My Works',
    aboutBtn: 'Get to Know Me',
    revealEyebrow: 'FROM INSPIRATION TO SCREEN',
    revealTitle: 'Software built with intention feels distinctly different.',
    revealDesc: 'From gaming telemetry to native desktop utilities, every project is shaped to solve authentic needs.',
    companionHeading: 'Lightweight tools, effortless focus.',
    companionCaption: 'Clean scorekeeping · Stay in the game',
    companionBadge: 'WeChat Mini Program',
    noteText: 'An inquisitive mind. A body of authentic work.',
    bottomLocation: 'CHENGDU, CHINA',
    bottomHint: 'Scroll to explore',
    bottomTagline: 'IDEAS INTO REALITY'
  },
  about: {
    eyebrow: 'ABOUT ME / BEHIND THE WORK',
    titleLine1: 'Engineering is the starting line.',
    titleLine2: 'Experience is the entire purpose.',
    intro: "I'm cduyzh, a creative developer based in Chengdu. I find genuine joy in turning spontaneous sparks of inspiration into robust web applications, native desktop utilities, and mobile products that feel effortless in daily use.",
    disciplines: [
      { title: 'Web Interface Engineering', text: 'Crafting responsive, intuitive micro-interactions grounded in rock-solid architecture.' },
      { title: 'AI Application Craft', text: 'Transforming generative models into tactile, reliable utilities that accelerate real work.' },
      { title: 'Indie Product Practice', text: 'Originating from personal friction, building focused tools with uncompromised polish.' }
    ],
    chatLink: 'Tell me about what you are building',
    portraitCaption: 'Stay curious. Build relentlessly.',
    portraitLocation: 'CDUYZH / CHENGDU',
    footnoteMindset: 'Effortless usability is always the highest form of design.',
    footnoteIndex: '01 — THE MINDSET'
  },
  projects: {
    eyebrow: 'CURATED WORKS & EXPERIMENTS',
    title: 'Find the tools you need.',
    intro: 'Gaming telemetry, mobile apps, and native macOS utilities. Discover released products and upcoming releases.',
    categories: {
      all: 'All Works',
      game: 'Gaming Tools',
      mobile: 'Mobile Apps',
      mac: 'macOS Utilities'
    },
    countText: (count: number, visibleCount?: number) =>
      `${count} Project${count === 1 ? '' : 's'}${visibleCount && count > visibleCount ? ` · Showing ${visibleCount}` : ''}`,
    viewMore: 'Load More Works',
    openProject: 'Open Project',
    viewSource: 'View Source',
    scanQr: 'Scan QR Code',
    comingSoon: 'Coming Soon',
    inProgress: 'In Progress',
    qrModalEyebrow: 'WeChat Mini Program',
    qrModalDesc: 'Scan with WeChat to start using the mini-program instantly.',
    qrModalClose: 'Close QR Code modal',
    qrModalDone: 'Done'
  },
  capabilities: {
    eyebrow: '/ 03 — CAPABILITIES',
    title: 'TECHNICAL DOMAIN',
    desc: 'Crafting software at the intersection of rigorous systems engineering, fluid digital typography, and modern AI models.',
    categories: [
      {
        title: 'Frontend Architecture',
        items: ['React 19', 'TypeScript', 'Next.js (App Router)', 'Taro (Cross-platform)', 'Tailwind CSS', 'WebGL / Three.js', 'Motion & Spring Physics']
      },
      {
        title: 'AI & Generative Workflows',
        items: ['LLM Orchestration', 'Multi-Modal Reasoning', 'Autonomous Agent Hubs', 'Prompt Engineering', 'Vector Embeddings', 'Streaming Token Canvases']
      },
      {
        title: 'Infrastructure & Tools',
        items: ['Docker Containers', 'Nginx / Caddy Proxy', 'Node.js / Express', 'Git Workflow & CI/CD', 'Cloud Run / Serverless', 'Performance Profiling']
      },
      {
        title: 'Design Systems & Craft',
        items: ['Accessible Primitives (WCAG)', 'Mathematical Typography Scales', 'Sub-millisecond Micro-Interactions', 'Dark Mode Ergonomics', 'Editorial Layouts']
      }
    ]
  },
  contact: {
    eyebrow: 'STAY CONNECTED',
    heading: 'Have a project in mind?',
    headingHighlight: "Let's bring it to life.",
    description: 'Whether you want to discuss frontend engineering, generative AI workflows, or explore a creative collaboration, my inbox is always open.',
    sendEmail: 'Send Email',
    copySuccess: 'Email address copied to clipboard',
    copyError: 'Copy failed. Please copy manually: ',
    copied: 'Copied',
    emailLabel: 'Email Address'
  },
  footer: {
    tagline: 'Turning ideas into intuitive everyday craft.',
    backToTop: 'Back to Top',
    copyright: `Copyright © ${new Date().getFullYear()} CDUYZH.`,
    rights: 'All rights reserved.',
    beian: 'ICP 2026054840-1',
    location: 'Chengdu, China'
  },
  seo: {
    title: 'CDUYZH - Creative Developer & AI Tools Studio | Works Portfolio',
    description: 'Chengdu-based frontend developer cduyzh builds native Mac apps, AI workflows, and practical web tools. Explore iScreenshot, iTrans, and public indie projects.',
    keywords: 'cduyzh, creative developer, indie developer, frontend engineer, Chengdu developer, AI tools, macOS utilities, iScreenshot, iTrans, React, TypeScript, portfolio',
    ogTitle: 'CDUYZH - Creative Developer & AI Tools Studio | Works Portfolio',
    ogDescription: 'Chengdu-based frontend developer cduyzh builds native Mac apps, AI workflows, and practical web tools. Explore iScreenshot, iTrans, and public indie projects.',
    geoPlace: 'Chengdu'
  }
};
