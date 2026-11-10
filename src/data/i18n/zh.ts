import { LocalizedProfile, LocalizedProject, LocalizedUI } from '../../types/i18n';

export const zhProfile: LocalizedProfile = {
  name: 'CDUYZH',
  handle: 'cduyzh',
  title: 'Web 前端开发 · AI 应用 · 独立项目',
  subtitle: '做产品，也做一些有意思的东西。',
  roles: ['Web 前端开发', 'AI 应用', '独立项目', '体验设计'],
  location: '中国 · 成都',
  status: '常驻成都 · 探索新想法',
  bio: {
    headline: '关于我',
    paragraphs: [
      '我是 cduyzh，一名 Web 前端开发者。平时除了工作，也喜欢把一些突然冒出来的想法做成真正可以使用的产品。最近比较关注 AI、Web 应用、Mac 原生工具，以及一些解决自己实际需求的小项目。'
    ],
    keywords: ['Web 体验', 'AI 工作流', '独立工具', '界面工程']
  }
};

export const zhProjects: LocalizedProject[] = [
  {
    id: '12',
    slug: 'iscreenshot',
    category: 'mac',
    title: '极速截屏（iScreenshot）',
    summary: '随时从菜单栏唤出截屏，支持精准取色、长截图滚动拼接与专业画板美化。',
    description: '一款轻量原生的 macOS 截图与标注工具，支持快捷键即时截屏、精准屏幕取色、长截图滚动拼接、多款渐变背景与柔和阴影美化，随时随地优雅出图。',
    status: '已上线',
    tags: ['Mac 工具', '截屏', '图片美化'],
    year: '2026',
    role: '独立开发',
    technologies: ['Swift', 'SwiftUI', 'macOS'],
    highlights: [
      '原生 macOS 菜单栏驻留，快捷键极速截屏、取色与长截图',
      '内置专业画板美化，多款渐变背景、阴影与圆角参数随心调',
      '支持截屏即时标注、马赛克遮挡与一键保存或复制剪贴板'
    ],
    demoUrl: 'https://apps.cduyzh.top/iScreenshot/zh.html',
    featured: true,
    cover: '/assets/iscreenshot-icon.png',
    coverAlt: '极速截屏（iScreenshot）应用图标'
  },
  {
    id: '11',
    slug: 'mac-translator',
    category: 'mac',
    title: '极译 AI（iTrans）',
    summary: '随时从菜单栏唤出翻译面板，支持 Google 和 DeepSeek 翻译。',
    description: '一款原生 macOS 翻译工具，支持原文与译文并排查看、语言选择及个人术语记忆。',
    status: '已上线',
    tags: ['Mac 工具', '翻译', '菜单栏'],
    year: '2026',
    role: '独立开发',
    technologies: ['Swift', 'SwiftUI', 'macOS'],
    highlights: [
      '原生 macOS 菜单栏驻留，快捷键即选即译与并排对比',
      '支持自带 DeepSeek 与 Google 翻译引擎，零中转更隐私',
      '支持个人本地术语记忆库与沉浸划词翻译'
    ],
    demoUrl: 'https://apps.cduyzh.top/iTrans/zh.html',
    featured: true,
    cover: '/assets/mac-translator-icon.png',
    coverAlt: '极译 AI（iTrans）应用图标'
  },
  {
    id: '09',
    slug: 'cards-score',
    category: 'mobile',
    title: '打牌记分',
    summary: '各类牌局的随手记分助手：打牌记账、打牌计分、积分排行，一个小程序全管。',
    description: '扑克、麻将、桌游、聚会都能开桌，多人建房、实时录入、自动结算、历史记录与积分排行；房主记分即时生效、断网可用，云端自动备份，不打扰打牌节奏——主打一个随性随记。',
    status: '已上线',
    tags: ['微信小程序', '记分工具', '聚会桌游'],
    year: '2026',
    role: '独立开发',
    technologies: ['微信小程序', '云开发', 'TypeScript'],
    highlights: [
      '多人实时记分同步，支持断网离线记分与自动恢复',
      '极简操作路径，不打扰打牌节奏的主态控制',
      '涵盖扑克、麻将等多种计分模式与排行榜结算'
    ],
    qrCode: '/assets/cards-score-qrcode.jpg',
    featured: true,
    cover: '/assets/cards-score-cover.jpg',
    coverAlt: '打牌记分小程序封面图'
  },
  {
    id: '01',
    slug: 'hsr-archive',
    category: 'game',
    title: '星穹铁道竞速档案站｜终局配队与低金通关攻略',
    summary: '收录《崩坏：星穹铁道》混沌回忆、虚构叙事、末日幻影及异相仲裁的真实通关记录，支持按阵容、命座、光锥、金数及通关成绩筛选，轻松查找低金满星、0轮竞速配队与实战视频。',
    description: '收录《崩坏：星穹铁道》混沌回忆、虚构叙事、末日幻影及异相仲裁的真实通关记录，支持按阵容、命座、光锥、金数及通关成绩筛选，轻松查找低金满星、0轮竞速配队与实战视频。',
    status: '已上线',
    tags: ['游戏数据', '竞速档案', '投稿系统', '星穹铁道'],
    year: '2026',
    role: '独立开发与前端实现',
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'Tailwind CSS'],
    highlights: [
      '多模式多赛季检索工作台，筛选条件同步进 URL 可直接分享',
      '环境统计面板展示角色/光锥使用率与队伍组合分布',
      '自助投稿系统含自动查重、成本自动计算与草稿本地保存'
    ],
    demoUrl: 'https://hsr-archive.cduyzh.top/',
    featured: true,
    cover: '/assets/hsr-archive-cover.jpg',
    coverAlt: '星穹铁道竞速档案站界面图'
  },
  {
    id: '02',
    slug: 'hsr-trend',
    category: 'game',
    title: '崩坏：星穹铁道 · 终局血量膨胀趋势可视化',
    summary: '汇总《崩坏：星穹铁道》混沌回忆、虚构叙事、末日幻影及异相仲裁等终局玩法的历期怪物血量数据，通过交互式趋势图展示血量变化、环比涨幅与版本间的数值膨胀情况。',
    description: '汇总《崩坏：星穹铁道》混沌回忆、虚构叙事、末日幻影及异相仲裁等终局玩法的历期怪物血量数据，通过交互式趋势图展示血量变化、环比涨幅与版本间的数值膨胀情况。',
    status: '已上线',
    tags: ['游戏数据', '数据可视化', '趋势分析', '星穹铁道'],
    year: '2026',
    role: '独立开发与数据分析',
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'ECharts', 'Tailwind CSS'],
    highlights: [
      '四模式统一统计口径，看板上直接显示总 HP 与环比涨幅',
      '本地缓存驱动，首次加载边算边出图表，二次访问秒开',
      '移动端适配，窄屏下长标签组件内横向滚动'
    ],
    demoUrl: 'https://hsr-trend.cduyzh.top/',
    featured: true,
    cover: '/assets/hsr-trend-cover.jpg',
    coverAlt: '星铁终局血量趋势数据看板'
  },
  {
    id: '10',
    slug: 'panda-svg',
    category: 'game',
    title: 'AI 大模型 SVG 动画能力大比拼：熊猫骑行实验室',
    summary: '实测 GPT、Claude、DeepSeek、Qwen 等主流 AI 大模型的 SVG 动画生成能力。',
    description: '用同一道“熊猫骑自行车”提示词，实测 GPT、Claude、DeepSeek、Qwen 等主流 AI 大模型的 SVG 动画生成能力。集中展示不同模型的实际作品，直观对比代码生成、画面表现与动画效果。',
    status: '已上线',
    tags: ['AI大模型', 'SVG动画', '代码生成', '评测对比'],
    year: '2026',
    role: '独立开发',
    technologies: ['HTML', 'CSS', 'JavaScript', 'AI生成'],
    highlights: [
      '用同一提示词实测主流大模型 SVG 动画生成',
      '集中展示并直观对比代码生成、画面表现与动画效果',
      '无框架轻量级原生前端实现，沉浸式动画对比体验'
    ],
    demoUrl: 'https://panda.cduyzh.top/',
    featured: true,
    cover: '/assets/panda-svg-cover.jpg',
    coverAlt: '熊猫骑行实验室界面图'
  },
  {
    id: '03',
    slug: 'luna-note',
    category: 'mobile',
    title: '月来信',
    summary: '专注隐私的经期规律记录与伴侣关怀提醒工具，以温和克制的设计守护身心节奏。',
    description: '针对市面经期健康应用普遍存在的开屏广告繁杂、社区信息过载及隐私顾虑，月来信尝试打造一款纯粹、温润且安全的轻量记录工具。',
    status: '开发中',
    tags: ['生活工具', '隐私安全', '周期计算', '关怀提醒'],
    year: '2026',
    role: '产品构思与独立开发',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'IndexedDB', 'PWA'],
    highlights: [
      '端侧本地加密存储，经期生理数据严格保留在用户设备内',
      '轻量化周期环形视图，直观呈现生理期与预测关键节点',
      '伴侣轻提醒方案，提供温和、非侵入式的状态通知与关怀建议'
    ],
    featured: true,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: '月来信界面概念设计图'
  },
  {
    id: '04',
    slug: 'chengdu-radar',
    category: 'mobile',
    title: '成都区级降雨与精细网格气象',
    summary: '面向成都及周边区县的精细化网格降水与雷达云图速览，聚焦超局地短时天气。',
    description: '成都盆地地形多变，常出现“东边暴雨、西边晴空”的超局地降水现象。该项目聚焦成都各区县精细网格气象数据，汇聚多普勒雷达反射率拼图与短时临近外推预报。',
    status: '开发中',
    tags: ['气象观测', '数据可视化', '地理信息', '成都本地'],
    year: '2026',
    role: '数据整理与前端研发',
    technologies: ['TypeScript', 'Canvas / WebGL', '气象数据接口', 'GeoJSON'],
    highlights: [
      '聚焦成都区县级精细化切片，直观呈现局地云团移动趋势',
      '摒弃商业天气应用的冗余资讯流，专注于核心降水雷达与分钟刻度',
      '针对高分辨率雷达切片实现轻量渲染管线'
    ],
    featured: true,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: '成都区级降雨概念图'
  },
  {
    id: '05',
    slug: 'game-radar',
    category: 'game',
    title: '未发售游戏前瞻与发售日聚合',
    summary: '追踪全球独立与主流作品的发售日更迭、平台排期与发售口碑前瞻聚合。',
    description: '主机与 PC 游戏延期频繁、发售信息分散在各大发布会与平台。该工具旨在建立一份结构清晰的未来新游时间轴，支持按游戏类型、平台进行筛选。',
    status: '构思中',
    tags: ['游戏资讯', '数据聚合', '时间线', '独立游戏'],
    year: '2026',
    role: '构思与数据抓取设计',
    technologies: ['Next.js', 'TypeScript', 'Node.js 爬虫/聚合', 'Tailwind CSS'],
    highlights: [
      '发售日变动动态追踪，直观标记延期与确定发售节点',
      '多维度标签筛选（独立/3A、发布平台、引擎与发售季度）',
      '个人期待清单与日历订阅导入导出'
    ],
    featured: true,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: '未来未发售游戏时间线示意图'
  },
  {
    id: '06',
    slug: 'prompt-matrix',
    category: 'mobile',
    title: 'GPT Image 提示词工作库',
    summary: '面向生成式图像的结构化提示词资产库，模块化沉淀艺术风格、镜头景别与光影配方。',
    description: '构建标准化的提示词语法树，将艺术流派、构图光影、负向词汇、渲染引擎参数以积木形式拼装，支持快速复制、一键测试与效果版本回溯。',
    status: '研究中',
    tags: ['生成式 AI', 'Prompt 工程', '工具库', '灵感管理'],
    year: '2025',
    role: '独立设计与工具沉淀',
    technologies: ['React', 'TypeScript', 'LocalStorage', 'Tailwind CSS'],
    highlights: [
      '参数化提示词拼装，支持占位符与动态变量插值',
      '分类标签化索引（光影、镜头、材质、画风体系）',
      '本地快照导出，沉淀高可用高质量的生图配方'
    ],
    featured: false,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: 'GPT Image 提示词语法树概念图'
  },
  {
    id: '07',
    slug: 'starrail-intel',
    category: 'game',
    title: '星铁强敌弱点与战斗机制速查',
    summary: '崩坏：星穹铁道 混沌回忆与末日幻影强敌机制速查，整理弱点属性、韧性条与抗性数据。',
    description: '针对回合制高难关卡中 BOSS 技能机制繁复、抗性弱点记不准的问题，清晰罗列历代混沌回忆与深渊首领的属性弱点、韧性值及核心应对策略。',
    status: '研究中',
    tags: ['游戏数据', '弱点速查', '配队辅助', '星穹铁道'],
    year: '2025',
    role: '资料整理与前端实现',
    technologies: ['React', 'TypeScript', '静态数据索引', 'Fuzzy Search'],
    highlights: [
      '全 BOSS 属性抗性与韧性数值结构化一览',
      '按弱点属性与版本周期快速筛选过滤',
      '轻量纯静态架构，离线环境亦可毫秒级模糊检索'
    ],
    featured: false,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: '星穹铁道强敌资料速查界面图'
  },
  {
    id: '08',
    slug: 'avatar-workflow',
    category: 'mobile',
    title: '人物立绘与角色卡片自动化工作流',
    summary: '探索基于轻量 AI 工作流的角色立绘生成与统一规格人物设定卡片自动化管线。',
    description: '结合图像模型设计一套将人物设定描述自动拆解为风格化肖像、调色方案与属性徽章的工作流。产出高一致性的角色卡片排版。',
    status: '研究中',
    tags: ['AI 工作流', '角色设定', '前端生成', '视觉设计'],
    year: '2025',
    role: '工作流设计与前端管线',
    technologies: ['TypeScript', 'Canvas', 'HTML-to-Image', 'SVG'],
    highlights: [
      '标准化人物属性卡片排版模板，支持高分辨率导出',
      '统一色调与材质质感管线，确保系列角色视觉一致性',
      '前端即时微调布局，快速修正提示词与图文比例'
    ],
    featured: false,
    cover: '/assets/visual-manifesto-architecture.png',
    coverAlt: '人物卡片自动化工作流概念图'
  }
];

export const zhUI: LocalizedUI = {
  nav: {
    about: '关于',
    projects: '作品',
    capabilities: '技术',
    contact: '联系',
    cta: '聊聊想法',
    brandAria: 'CDUYZH 首页',
    openMenuAria: '打开导航菜单',
    closeMenuAria: '关闭导航菜单',
    switchLangAria: '切换为英文版 (Switch to English)',
    skipToProjects: '跳转到作品区域',
    mainNavAria: '主导航'
  },
  hero: {
    eyebrow: 'CDUYZH · 独立开发者',
    titleLine1: '把想法，',
    titleLine2: '做成好用的日常。',
    description: '用代码探索可能，用设计打磨体验。做产品，也做一些有意思的东西。',
    exploreBtn: '探索我的作品',
    aboutBtn: '认识一下',
    revealEyebrow: '从灵感，到屏幕。',
    revealTitle: '认真做的东西，用起来会不一样。',
    revealDesc: '从游戏数据到生活工具，让每个想法找到自己的形状。',
    companionHeading: '小工具，大自在。',
    companionCaption: '随手记分 · 专心享受牌局',
    companionBadge: '微信小程序',
    noteText: '一点好奇心。一些真实的作品。',
    noteLine1: '一点好奇心。',
    noteLine2: '一些真实的作品。',
    scrollHint: '滚动，发现更多',
    bottomLocation: '中国 · 成都',
    bottomHint: '滚动，发现更多',
    bottomTagline: 'IDEAS INTO REALITY'
  },
  about: {
    eyebrow: '关于我 / BEHIND THE WORK',
    titleLine1: '技术是起点。',
    titleLine2: '体验才是目的。',
    intro: '我是 cduyzh，一名常驻成都的 Web 前端开发者。喜欢把突然冒出来的想法，做成浏览器和手机上真正能用的产品。',
    disciplines: [
      { title: 'Web 界面工程', text: '让复杂的功能，拥有直觉般的操作。' },
      { title: 'AI 应用探索', text: '把新的可能，变成真正趁手的工具。' },
      { title: '独立产品实践', text: '从自己的日常出发，解决具体的问题。' }
    ],
    chatLink: '聊聊你正在做的事',
    portraitCaption: '保持好奇。持续创造。',
    portraitLocation: 'CDUYZH / CHENGDU',
    footnoteMindset: '好用，始终是最重要的设计。',
    footnoteIndex: '01 — THE MINDSET'
  },
  projects: {
    eyebrow: '作品与探索',
    title: '找到你需要的作品。',
    intro: '游戏工具、移动应用和 Mac 工具。从这里发现已经上线和即将上线的项目。',
    filterGroupAria: '按作品分类筛选',
    categories: {
      all: '全部作品',
      game: '游戏工具',
      mobile: '移动应用',
      mac: 'Mac 工具'
    },
    countText: (count: number, visibleCount?: number) =>
      `${count} 个作品${visibleCount && count > visibleCount ? ` · 已展示 ${visibleCount} 个` : ''}`,
    viewMore: '查看更多作品',
    openProject: '打开项目',
    viewSource: '查看源码',
    scanQr: '扫码体验',
    comingSoon: '敬请期待',
    inProgress: '持续完善中',
    qrModalEyebrow: '微信小程序',
    qrModalDesc: '打开微信，扫一扫，即可开始体验。',
    qrModalClose: '关闭二维码',
    qrModalDone: '完成'
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
    eyebrow: '保持联系',
    heading: '有想法？随时聊聊。',
    headingHighlight: '一起把它做出来。',
    description: '无论是探讨 Web 前端技术、AI 工具工作流，还是一个有趣的想法，都欢迎给我写信。',
    sendEmail: '发送邮件',
    copySuccess: '已复制邮箱地址',
    copyError: '复制失败，请手动复制：',
    copied: '已复制',
    emailLabel: '邮箱地址',
    copyEmailAria: '复制',
    channelsAria: '个人主页与联系通道',
    availability: '目前开放探索性合作、独立工具反馈与技术交流。'
  },
  footer: {
    tagline: '把想法，变成日常。',
    backToTop: '返回顶部',
    copyright: `Copyright © ${new Date().getFullYear()} CDUYZH.`,
    rights: '保留所有权利。',
    beian: '蜀ICP备2026054840号-1',
    location: '中国 · 成都'
  },
  seo: {
    title: 'CDUYZH - 做产品，也做一些有意思的东西 | 独立开发与 Web 前端作品集',
    description: 'cduyzh 的个人数字工作室与公开作品集。常驻成都，专注 Web 界面工程、轻量 AI 应用探索与自用高频工具落地。收录极速截屏 iScreenshot、极译 AI iTrans 等 Mac 原生工具，以及打牌记分微信小程序、星穹铁道竞速档案站等独立作品。',
    keywords: 'cduyzh, 成都独立开发, Web 前端开发, 前端工程师, 个人作品集, AI 应用, Mac 原生工具, 极速截屏, iScreenshot, 极译 AI, iTrans, 打牌记分, 星穹铁道竞速, 星铁血量膨胀, Panda SVG 画廊',
    ogTitle: 'CDUYZH - 做产品，也做一些有意思的东西 | 独立开发与 Web 前端作品集',
    ogDescription: 'cduyzh 的个人数字工作室与公开作品集。常驻成都，专注 Web 界面工程、轻量 AI 工具与自用产品落地。涵盖极速截屏 iScreenshot、极译 AI iTrans、打牌记分小程序、星铁竞速档案站等独立作品。',
    geoPlace: '成都'
  }
};
