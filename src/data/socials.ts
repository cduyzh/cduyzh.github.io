import { SocialLink } from '../types';

export const contactData = {
  email: 'cduyzh@gmail.com',
  domain: 'www.cduyzh.top',
  headline: '有有趣的想法？',
  subheadline: '如果你也在做一些有意思的东西，欢迎交流探讨。',
  availability: '常驻成都 · 欢迎技术探讨、独立项目交流与真诚的想法碰撞。'
};

/**
 * 仅保留已核实的个人主页与联系通道
 * 未提供具体个人页面 ID 的平台（如指向首页的外链）暂不公开展示
 */
export const socialsData: SocialLink[] = [
  {
    name: 'GitHub',
    handle: '@cduyzh',
    url: 'https://github.com/cduyzh',
    icon: 'Github'
  },
  {
    name: 'Email',
    handle: 'cduyzh@gmail.com',
    url: 'mailto:cduyzh@gmail.com',
    isCopyable: true,
    copyValue: 'cduyzh@gmail.com',
    icon: 'Mail'
  },
  {
    name: 'X（推特）',
    handle: '@cduyzh_top',
    url: 'https://x.com/cduyzh_top',
    icon: 'ArrowUpRight'
  },
  {
    name: '小红书',
    handle: 'cduyzh',
    url: 'https://www.xiaohongshu.com/user/profile/557001e6484fb6782b7f2fc2',
    icon: 'ArrowUpRight'
  }
];
