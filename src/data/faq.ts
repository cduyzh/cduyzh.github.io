export interface FaqEntry {
  id: string;
  zh: { question: string; answer: string };
  en: { question: string; answer: string };
}

export const faqEntries: FaqEntry[] = [
  {
    id: 'studio',
    zh: {
      question: 'cduyzh 是谁，公开作品包括哪些？',
      answer: 'cduyzh 是常驻成都的 Web 前端开发者与独立开发者。公开作品包括 iScreenshot 极速截屏、iTrans 极译 AI、打牌记分微信小程序，以及星穹铁道数据工具和熊猫骑行 AI SVG 实验室。',
    },
    en: {
      question: 'Who is cduyzh and what is publicly available?',
      answer: 'cduyzh is a frontend and independent developer based in Chengdu, China. Public work includes iScreenshot, iTrans, the Cards Score WeChat mini program, Honkai: Star Rail data tools, and the Panda Cycling AI SVG Lab.',
    },
  },
  {
    id: 'iscreenshot',
    zh: {
      question: 'iScreenshot 极速截屏适合哪些 Mac 场景？',
      answer: 'iScreenshot 是原生 macOS 菜单栏工具，适合区域截图、滚动长截图、屏幕取色、截图样机美化与录屏。产品页提供中英文说明和下载入口。',
    },
    en: {
      question: 'What can I do with iScreenshot on Mac?',
      answer: 'iScreenshot is a native macOS menu-bar utility for region capture, scrolling screenshots, color picking, screenshot mockups, and screen recording. Its product page is available in Chinese and English.',
    },
  },
  {
    id: 'itrans',
    zh: {
      question: 'iTrans 极译 AI 如何处理翻译与隐私？',
      answer: 'iTrans 提供菜单栏与划词翻译、DeepSeek 自带 API Key、Google 翻译和本地术语记忆。待翻译文本会发送给所选翻译服务，并非完全离线；术语库保存在本机。',
    },
    en: {
      question: 'How does iTrans handle translation and privacy?',
      answer: 'iTrans offers menu-bar and selection translation, DeepSeek with your own API key, Google Translate, and local terminology memory. Selected text is sent to the chosen translation provider; the glossary stays on your Mac.',
    },
  },
  {
    id: 'hsr',
    zh: {
      question: '星穹铁道工具站分别解决什么问题？',
      answer: '竞速档案站检索真实终局通关配队；血量趋势站展示历期怪物总 HP 与膨胀变化；行动实验室计算行动值、速度断点、拉条和排轴。三个站当前均以中文内容为主。',
    },
    en: {
      question: 'What does each Honkai: Star Rail tool do?',
      answer: 'The archive searches verified endgame team clears, the trend site visualizes boss HP changes, and Action Lab calculates action value, speed breakpoints, action advance, and turn plans. All three currently publish primarily Chinese content.',
    },
  },
  {
    id: 'languages',
    zh: {
      question: '哪些页面支持中英文？',
      answer: '个人主站、Mac 工具门户、iScreenshot 与 iTrans 产品页提供独立中英文 URL。游戏数据站、熊猫骑行实验室和食间目前以中文为主；llms 文件提供双语项目摘要，不代表这些站已有完整英文页面。',
    },
    en: {
      question: 'Which pages are available in Chinese and English?',
      answer: 'The portfolio, Mac apps portal, iScreenshot, and iTrans product pages have separate Chinese and English URLs. The game data sites, Panda Cycling Lab, and Shijian are currently Chinese-first; bilingual llms summaries do not imply full English page coverage.',
    },
  },
];
