export type Language = 'zh' | 'en';

export interface LocalizedBio {
  headline: string;
  paragraphs: string[];
  keywords: string[];
}

export interface LocalizedProfile {
  name: string;
  handle: string;
  title: string;
  subtitle: string;
  roles: string[];
  location: string;
  status: string;
  bio: LocalizedBio;
}

export interface LocalizedProject {
  id: string;
  slug: string;
  category: 'game' | 'mobile' | 'mac';
  title: string;
  summary: string;
  description: string;
  status: string;
  tags: string[];
  year: string;
  role: string;
  technologies: string[];
  highlights?: string[];
  demoUrl?: string;
  repoUrl?: string;
  qrCode?: string;
  featured?: boolean;
  cover: string;
  coverAlt: string;
}

export interface LocalizedTechCategory {
  title: string;
  items: string[];
}

export interface LocalizedSocial {
  name: string;
  handle: string;
  url: string;
  icon?: string;
  isCopyable?: boolean;
  copyValue?: string;
  label?: string;
}

export interface LocalizedUI {
  nav: {
    about: string;
    projects: string;
    capabilities: string;
    contact: string;
    cta: string;
    brandAria: string;
    openMenuAria: string;
    closeMenuAria: string;
    switchLangAria: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    exploreBtn: string;
    aboutBtn: string;
    revealEyebrow: string;
    revealTitle: string;
    revealDesc: string;
    companionHeading: string;
    companionCaption: string;
    companionBadge: string;
    noteText: string;
    bottomLocation: string;
    bottomHint: string;
    bottomTagline: string;
  };
  about: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    intro: string;
    disciplines: Array<{
      title: string;
      text: string;
    }>;
    chatLink: string;
    portraitCaption: string;
    portraitLocation: string;
    footnoteMindset: string;
    footnoteIndex: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    categories: {
      all: string;
      game: string;
      mobile: string;
      mac: string;
    };
    countText: (count: number, visibleCount?: number) => string;
    viewMore: string;
    openProject: string;
    viewSource: string;
    scanQr: string;
    comingSoon: string;
    inProgress: string;
    qrModalEyebrow: string;
    qrModalDesc: string;
    qrModalClose: string;
    qrModalDone: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    desc: string;
    categories: LocalizedTechCategory[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    description: string;
    sendEmail: string;
    copySuccess: string;
    copyError: string;
    copied: string;
    emailLabel: string;
  };
  footer: {
    tagline: string;
    backToTop: string;
    copyright: string;
    rights: string;
    beian: string;
    location: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    geoPlace: string;
  };
}
