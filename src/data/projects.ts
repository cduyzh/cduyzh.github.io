import { Project } from '../types';
import { projectCovers } from './projectCovers';

/**
 * 个人公开项目真实数据集
 * 严格遵循真实性原则：
 * - 仅展示已确认且处于实际构思/研究/开发周期的项目
 * - visibility: 'draft' 的项目不得出现在公开页面
 * - 未经过核实上线的项目不添加虚假在线演示或源码链接
 * - 状态仅使用经确认的阶段定义
 */
export const projectsData: Project[] = [
  {
    id: '09',
    slug: 'cards-score',
    title: '打牌记分',
    summary: '各类牌局的随手记分助手：打牌记账、打牌计分、积分排行，一个小程序全管。',
    description: '扑克、麻将、桌游、聚会都能开桌，多人建房、实时录入、自动结算、历史记录与积分排行；房主记分即时生效、断网可用，云端自动备份，不打扰打牌节奏——主打一个随性随记。',
    status: '已上线',
    cover: '/assets/cards-score-cover.jpg',
    coverAlt: '打牌记分小程序封面图：包含扑克、麻将、桌游等元素与多人建房界面',
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
    visibility: 'public'
  },
  {
    id: '01',
    slug: 'hsr-archive',
    title: '终局竞速档案站',
    summary: '中文崩坏：星穹铁道终局玩法的竞速档案站：收录、筛选并展示混沌回忆 / 虚构叙事 / 末日幻影 / 异相仲裁四个模式的竞速记录，开放玩家自助投稿。',
    description: '按赛季、模式、敌方阶段与队伍成本检索中文竞速样本。支持记录分类（0 轮竞速/满星记录）、成本计算（限定五星角色命座 + 光锥叠影口径）、标记筛选（复活/火墙/大月卡武器）。提供环境统计、角色使用率、光锥使用率与常见队伍组合分析。投稿需人工审核，通过后可在公开档案中查看；投稿者凭凭证管理自己的记录（编辑/撤回/删除）。',
    status: '已上线',
    cover: '/assets/hsr-archive-cover.png',
    coverAlt: '终局竞速档案站界面：深色工作台显示 4.5 归档末法余烬 Boss 信息与队伍分组记录列表',
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
    visibility: 'public'
  },
  {
    id: '02',
    slug: 'hsr-trend',
    title: '终局血量趋势',
    summary: '统计并可视化崩坏：星穹铁道四种终局内容各期数的怪物血量膨胀趋势，支持一键下钻至单期详情查看敌人节点、波次与血量构成。',
    description: '按模式查看各期数总 HP 折线图、看板统计（最高/最低/平均/起点→最新/增长率）。点击折线图上的数据点或期数卡片直达对应期数的详情页面。期数卡片直接显示每期总 HP 与环比涨幅，勾选前就能扫读膨胀幅度。支持按星启/非星启筛选期数，或用「近 3 期/近 5 期/全选」快速组合对比。本期效果包含环境效果、赛季效果、末日幻影的分节点效果与异相仲裁的关卡增益与污染等级。',
    status: '已上线',
    cover: '/assets/hsr-trend-cover.png',
    coverAlt: '终局血量趋势看板：忘却之庭最终关卡总 HP 折线图从迷梦造舸到来生沤渡的膨胀曲线',
    tags: ['游戏数据', '数据可视化', '趋势分析', '星穹铁道'],
    year: '2026',
    role: '独立开发与数据分析',
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'ECharts', 'Tailwind CSS'],
    highlights: [
      '四模式统一统计口径，看板上直接显示总 HP 与环比涨幅',
      '本地缓存驱动，首次加载边算边出图表，二次访问秒开',
      '移动端适配，窄屏下长标签组件内横向滚动，整页不出现横向滚动条'
    ],
    demoUrl: 'https://hsr-trend.cduyzh.top/',
    featured: true,
    visibility: 'public'
  },
  {
    id: '03',
    slug: 'luna-note',
    title: '月来信',
    summary: '专注隐私的经期规律记录与伴侣关怀提醒工具，以温和克制的设计守护身心节奏。',
    description: '针对市面经期健康应用普遍存在的开屏广告繁杂、社区信息过载及隐私顾虑，月来信尝试打造一款纯粹、温润且安全的轻量记录工具。除了基础的周期计算与生理期记录外，核心探索伴侣间的状态自然同步与关怀提醒机制，用非侵入式的方式传递关心。',
    status: '开发中',
    cover: projectCovers.lunaNote,
    coverAlt: '月来信项目界面设计概念图：包含经期周期圆环与伴侣关怀提醒卡片',
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
    visibility: 'public'
  },
  {
    id: '04',
    slug: 'chengdu-radar',
    title: '成都区级降雨与精细网格气象',
    summary: '面向成都及周边区县的精细化网格降水与雷达云图速览，聚焦超局地短时天气。',
    description: '成都盆地地形多变，常出现“东边暴雨、西边晴空”的超局地降水现象。该项目聚焦成都各区县精细网格气象数据，汇聚多普勒雷达反射率拼图与短时临近外推预报，提供简洁无干扰的降水时间轴推演与局地降雨提醒。',
    status: '开发中',
    cover: projectCovers.chengduWeather,
    coverAlt: '成都区级降雨项目概念图：包含成都区县坐标网格与多普勒雷达反射率拼图',
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
    visibility: 'public'
  },
  {
    id: '05',
    slug: 'game-radar',
    title: '未发售游戏前瞻与发售日聚合',
    summary: '追踪全球独立与主流作品的发售日更迭、平台排期与发售口碑前瞻聚合。',
    description: '主机与 PC 游戏延期频繁、发售信息分散在各大发布会与平台。该工具旨在建立一份结构清晰的未来新游时间轴，支持按游戏类型、平台（Steam / PS5 / Switch 2）、期待度评级进行筛选与发售倒计时提醒。',
    status: '构思中',
    cover: projectCovers.gameRadar,
    coverAlt: '未来未发售游戏时间线示意图：包含季度排期节点与平台期待度标记',
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
    visibility: 'public'
  },
  {
    id: '06',
    slug: 'prompt-matrix',
    title: 'GPT Image 提示词工作库',
    summary: '面向生成式图像的结构化提示词资产库，模块化沉淀艺术风格、镜头景别与光影配方。',
    description: '解决日常 AI 绘图过程中优质 Prompt 易丢失、版本混乱与参数难复用的痛点。构建标准化的提示词语法树，将艺术流派、构图光影、负向词汇、渲染引擎参数以积木形式拼装，支持快速复制、一键测试与效果版本回溯。',
    status: '研究中',
    cover: projectCovers.promptMatrix,
    coverAlt: 'GPT Image 提示词语法树概念图：展示主体、光影与构图参数积木模块',
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
    visibility: 'public'
  },
  {
    id: '07',
    slug: 'starrail-intel',
    title: '星铁强敌弱点与战斗机制速查',
    summary: '崩坏：星穹铁道 混沌回忆与末日幻影强敌机制速查，整理弱点属性、韧性条与抗性数据。',
    description: '针对回合制高难关卡中 BOSS 技能机制繁复、抗性弱点记不准的问题，整理出的高效率资料速查工具。清晰罗列历代混沌回忆与深渊首领的属性弱点、韧性值、受控免疫及核心应对策略，辅助玩家快速调整配队阵容。',
    status: '研究中',
    cover: projectCovers.starRailIntel,
    coverAlt: '星穹铁道强敌资料速查界面图：展示首领弱点属性、韧性条与抗性矩阵',
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
    visibility: 'public'
  },
  {
    id: '08',
    slug: 'avatar-workflow',
    title: '人物立绘与角色卡片自动化工作流',
    summary: '探索基于轻量 AI 工作流的角色立绘生成与统一规格人物设定卡片自动化管线。',
    description: '结合本地或云端图像模型，设计一套将人物设定描述自动拆解为风格化肖像、调色方案与属性徽章的工作流。产出高一致性的角色卡片排版，探索前端排版引擎与生图 API 的无缝编排。',
    status: '研究中',
    cover: projectCovers.avatarWorkflow,
    coverAlt: '人物卡片自动化工作流概念图：展示肖像排版、属性面板与三步生成管线',
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
    visibility: 'public'
  }
];

/**
 * 获取公开可见的项目列表（自动过滤 draft）
 */
export const getPublicProjects = (): Project[] => {
  return projectsData.filter((project) => project.visibility === 'public');
};
