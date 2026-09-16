export type ProjectStatus = '构思中' | '研究中' | '开发中' | '内测中' | '已上线';
export type ProjectVisibility = 'public' | 'draft';

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  longDescription?: string;
  status: ProjectStatus;
  cover: string;
  coverAlt?: string;
  tags: string[];
  year: string;
  role: string;
  technologies: string[];
  highlights?: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  visibility: ProjectVisibility;
  // Legacy aliases for backward compatibility if needed
  subtitle?: string;
  url?: string;
  github?: string;
  gallery?: string[];
}

export interface SocialLink {
  name: string;
  handle?: string;
  url: string;
  icon?: string;
  isCopyable?: boolean;
  copyValue?: string;
}

export interface ProfileData {
  name: string;
  handle: string;
  avatar: {
    src: string;
    alt: string;
  };
  domain: string;
  beian: string;
  title: string;
  subtitle: string;
  roles: string[];
  location: string;
  status: string;
  bio: {
    headline: string;
    paragraphs: string[];
    keywords: string[];
  };
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'AI & Engineering' | 'Architecture' | 'Tools';
}
