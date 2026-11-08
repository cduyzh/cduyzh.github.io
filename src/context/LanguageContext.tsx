import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Language, LocalizedProfile, LocalizedProject, LocalizedUI } from '../types/i18n';
import { zhProfile, zhProjects, zhUI } from '../data/i18n/zh';
import { enProfile, enProjects, enUI } from '../data/i18n/en';

interface LanguageContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  profile: LocalizedProfile;
  projects: LocalizedProject[];
  ui: LocalizedUI;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  // 1. 显式路径 /en.html 或 /en 强制优先为英文
  try {
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.includes('/en.html') || pathname.endsWith('/en')) {
      return 'en';
    }
  } catch {
    // ignore
  }

  // 2. URL 显式参数优先级次之 (?lang=en / ?lang=zh)
  try {
    const params = new URLSearchParams(window.location.search);
    const queryLang = params.get('lang')?.toLowerCase();
    if (queryLang === 'zh' || queryLang === 'en') {
      return queryLang as Language;
    }
  } catch {
    // ignore
  }

  // 3. 用户在本地存储中显式切换过的语言
  try {
    const saved = localStorage.getItem('cduyzh_preferred_lang');
    if (saved === 'zh' || saved === 'en') {
      return saved;
    }
  } catch {
    // ignore
  }

  // 4. 首屏注入变量判定
  if (typeof (window as unknown as { __INITIAL_LANG__?: string }).__INITIAL_LANG__ === 'string') {
    const init = (window as unknown as { __INITIAL_LANG__?: string }).__INITIAL_LANG__;
    if (init === 'zh' || init === 'en') return init;
  }

  // 4. 浏览器系统语言判定：除中文浏览器设置语言外，都默认英文
  try {
    const candidateLanguages = navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language || ''];

    for (const l of candidateLanguages) {
      if (!l) continue;
      const lower = l.toLowerCase();
      // 只要匹配中文分支（zh, zh-CN, zh-HK, zh-TW, zh-Hans, zh-Hant 等）
      if (lower.startsWith('zh')) {
        return 'zh';
      }
    }
  } catch {
    // ignore
  }

  // 除中文外，全量默认英文！
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => detectInitialLanguage());

  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('cduyzh_preferred_lang', newLang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(lang === 'zh' ? 'en' : 'zh');
  };

  // 同步更新 DOM 语言属性与 SEO meta
  useEffect(() => {
    const currentUi = lang === 'zh' ? zhUI : enUI;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = currentUi.seo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentUi.seo.description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', currentUi.seo.keywords);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentUi.seo.ogTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', currentUi.seo.ogDescription);
    }

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
      twTitle.setAttribute('content', currentUi.seo.ogTitle);
    }

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
      twDesc.setAttribute('content', currentUi.seo.ogDescription);
    }
  }, [lang]);

  const value = useMemo(() => {
    return {
      lang,
      setLanguage,
      toggleLanguage,
      profile: lang === 'zh' ? zhProfile : enProfile,
      projects: lang === 'zh' ? zhProjects : enProjects,
      ui: lang === 'zh' ? zhUI : enUI
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
