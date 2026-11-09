export interface BilingualCatalogText {
  title: string;
  description: string;
  keywords: string[];
}

export interface LiveSiteCatalogEntry {
  host: string;
  sitemapUrl: string;
  llmsUrl?: string;
  pages: string[];
  zh: BilingualCatalogText;
  en: BilingualCatalogText;
}

export const canonicalHost = 'www.cduyzh.top';
export const canonicalOrigin = `https://${canonicalHost}`;

export const sitemapIndexEntries = [
  `${canonicalOrigin}/sitemap-pages.xml`,
  'https://apps.cduyzh.top/sitemap.xml',
  'https://hsr-archive.cduyzh.top/sitemap.xml',
  'https://hsr-trend.cduyzh.top/sitemap.xml',
  'https://hsr.cduyzh.top/sitemap.xml',
  'https://panda.cduyzh.top/sitemap.xml',
  'https://shijian.cduyzh.top/sitemap.xml',
];

export const additionalLiveSites: LiveSiteCatalogEntry[] = [
  {
    host: 'apps.cduyzh.top',
    sitemapUrl: 'https://apps.cduyzh.top/sitemap.xml',
    llmsUrl: 'https://apps.cduyzh.top/llms.txt',
    pages: [
      'https://apps.cduyzh.top/',
      'https://apps.cduyzh.top/zh.html',
      'https://apps.cduyzh.top/iScreenshot/',
      'https://apps.cduyzh.top/iScreenshot/zh.html',
      'https://apps.cduyzh.top/iTrans/',
      'https://apps.cduyzh.top/iTrans/zh.html',
    ],
    zh: {
      title: 'cduyzh Mac 工具门户',
      description: '汇总 iScreenshot 极速截屏、iTrans 极译 AI 及其他 Mac 原生工具；已发布产品页提供中英文版本，未发布项目明确标注整理中。',
      keywords: ['Mac 工具', 'macOS 原生应用', '极速截屏', 'iScreenshot', '极译 AI', 'iTrans', '菜单栏翻译'],
    },
    en: {
      title: 'cduyzh Mac Apps',
      description: 'A bilingual catalog of native Mac utilities, with published product pages for iScreenshot and iTrans and clearly marked forthcoming projects.',
      keywords: ['Mac apps', 'native macOS utilities', 'iScreenshot', 'iTrans', 'menu bar translator', 'screen capture'],
    },
  },
  {
    host: 'hsr.cduyzh.top',
    sitemapUrl: 'https://hsr.cduyzh.top/sitemap.xml',
    llmsUrl: 'https://hsr.cduyzh.top/llms.txt',
    pages: ['https://hsr.cduyzh.top/', 'https://hsr.cduyzh.top/elation/'],
    zh: {
      title: '星穹铁道行动实验室',
      description: '计算《崩坏：星穹铁道》的行动值、速度断点、拉条与排轴，并提供欢愉体系配速和回能推演。当前内容以中文为主。',
      keywords: ['星穹铁道', '行动值计算器', '速度断点', '拉条计算', '排轴', '花火配速', '欢愉体系'],
    },
    en: {
      title: 'HSR Action Lab',
      description: 'A Chinese-language calculator for Honkai: Star Rail action value, speed breakpoints, action advance, turn planning, and Elation energy simulations.',
      keywords: ['Honkai Star Rail', 'HSR speed calculator', 'action value', 'speed breakpoints', 'turn planning', 'Elation'],
    },
  },
  {
    host: 'shijian.cduyzh.top',
    sitemapUrl: 'https://shijian.cduyzh.top/sitemap.xml',
    llmsUrl: 'https://shijian.cduyzh.top/llms.txt',
    pages: ['https://shijian.cduyzh.top/'],
    zh: {
      title: '食间 · 双人饮食规划与备餐助手',
      description: '面向双人家庭的本地优先菜单规划、时令食材与家常菜参考、采购清单聚合工具。当前内容以中文为主，营养内容不替代医疗建议。',
      keywords: ['食间', '双人菜单', '饮食规划', '备餐助手', '买菜清单', '时令食材', '川渝家常菜'],
    },
    en: {
      title: 'Shijian · Meal Planning for Two',
      description: 'A Chinese-language, local-first meal planner for two-person households, with seasonal ingredients, home-style recipes, and consolidated shopping lists.',
      keywords: ['meal planning for two', 'menu planner', 'meal prep', 'shopping list', 'seasonal ingredients', 'local-first'],
    },
  },
];

export const networkSiteCatalog: LiveSiteCatalogEntry[] = [
  {
    host: canonicalHost,
    sitemapUrl: `${canonicalOrigin}/sitemap-pages.xml`,
    llmsUrl: `${canonicalOrigin}/llms.txt`,
    pages: [`${canonicalOrigin}/`, `${canonicalOrigin}/en.html`],
    zh: {
      title: 'CDUYZH 个人数字工作室',
      description: '成都 Web 前端开发者 cduyzh 的中英文作品集，公开 Mac 原生工具、微信小程序、游戏数据站与 AI SVG 实验项目。',
      keywords: ['cduyzh', '成都独立开发', 'Web 前端作品集', 'AI 工具', 'Mac 原生工具'],
    },
    en: {
      title: 'CDUYZH Digital Studio',
      description: 'The bilingual portfolio of Chengdu-based frontend developer cduyzh, covering native Mac utilities, a WeChat mini program, game data tools, and AI SVG experiments.',
      keywords: ['cduyzh', 'Chengdu developer', 'frontend portfolio', 'indie software', 'AI tools'],
    },
  },
  ...additionalLiveSites,
  {
    host: 'hsr-archive.cduyzh.top',
    sitemapUrl: 'https://hsr-archive.cduyzh.top/sitemap.xml',
    llmsUrl: 'https://hsr-archive.cduyzh.top/llms.txt',
    pages: ['https://hsr-archive.cduyzh.top/', 'https://hsr-archive.cduyzh.top/archive/', 'https://hsr-archive.cduyzh.top/articles/', 'https://hsr-archive.cduyzh.top/faq/'],
    zh: {
      title: '星穹铁道竞速档案站',
      description: '收录混沌回忆、虚构叙事、末日幻影与异相仲裁的真实通关记录，可按阵容、星魂、光锥、限定金成本和成绩筛选。',
      keywords: ['星穹铁道竞速', '低金通关', '0T 配队', '混沌回忆', '虚构叙事', '末日幻影', '异相仲裁'],
    },
    en: {
      title: 'HSR Endgame Speedrun Archive',
      description: 'A Chinese-language archive of verified Honkai: Star Rail endgame clears, filterable by team, eidolons, light cones, limited gold cost, and results.',
      keywords: ['HSR speedrun archive', 'low-cost clears', 'zero cycle', 'Memory of Chaos', 'Pure Fiction', 'Apocalyptic Shadow'],
    },
  },
  {
    host: 'hsr-trend.cduyzh.top',
    sitemapUrl: 'https://hsr-trend.cduyzh.top/sitemap.xml',
    pages: ['https://hsr-trend.cduyzh.top/trends/moc', 'https://hsr-trend.cduyzh.top/trends/fiction', 'https://hsr-trend.cduyzh.top/trends/doom', 'https://hsr-trend.cduyzh.top/trends/peak'],
    zh: {
      title: '星穹铁道终局血量膨胀趋势',
      description: '按统一口径复算历期终局怪物总血量、环比变化和弱点构成，覆盖混沌回忆、虚构叙事、末日幻影与异相仲裁。',
      keywords: ['星铁血量膨胀', '终局血量统计', '怪物总 HP', '数值膨胀', '版本趋势'],
    },
    en: {
      title: 'HSR Endgame HP Trends',
      description: 'Chinese-language visualizations of recalculated endgame boss HP, period-over-period change, and weakness composition across Honkai: Star Rail modes.',
      keywords: ['HSR HP inflation', 'endgame HP trends', 'boss HP', 'Honkai Star Rail statistics'],
    },
  },
  {
    host: 'panda.cduyzh.top',
    sitemapUrl: 'https://panda.cduyzh.top/sitemap.xml',
    llmsUrl: 'https://panda.cduyzh.top/llms.txt',
    pages: ['https://panda.cduyzh.top/'],
    zh: {
      title: '熊猫骑行实验室 · AI SVG 动画画廊',
      description: '用统一的“熊猫骑自行车”提示词展示不同 AI 模型生成的原生 SVG 动画，保留原始输出并公开评分规则与检查边界。',
      keywords: ['熊猫骑自行车', 'AI SVG 动画', '大模型代码生成', '模型对比', 'Panda SVG Gallery'],
    },
    en: {
      title: 'Panda Cycling Lab · AI SVG Gallery',
      description: 'A Chinese-language gallery comparing native SVG animations generated from the same panda-riding-a-bicycle prompt, with original outputs and a published scoring rubric.',
      keywords: ['AI SVG animation', 'LLM code generation', 'model comparison', 'panda bicycle SVG', 'Panda SVG Gallery'],
    },
  },
];
