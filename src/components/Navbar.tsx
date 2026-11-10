import { useEffect, useRef, useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { profileData } from '../data/profile';
import { useLanguage } from '../context/LanguageContext';
import './chrome.css';

export default function Navbar() {
  const { lang, setLanguage, ui } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const navItems = [
    { label: ui.nav.about, id: 'about' },
    { label: ui.nav.projects, id: 'projects' },
    { label: ui.nav.contact, id: 'contact' },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;

    mobileNavRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMobileMenuOpen(false);
        if (mobileNavRef.current?.contains(document.activeElement)) toggleRef.current?.focus();
      }
    };
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const handleViewportChange = () => {
      if (desktopQuery.matches) setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    desktopQuery.addEventListener('change', handleViewportChange);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
      desktopQuery.removeEventListener('change', handleViewportChange);
    };
  }, [mobileMenuOpen]);

  const closeMenuFromLink = () => {
    setMobileMenuOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <header
      id="main-navbar"
      ref={headerRef}
      className="chrome-header"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMobileMenuOpen(false);
      }}
    >
      <div className="section-shell chrome-bar">
        <a id="nav-brand-logo" href="#hero" className="chrome-brand" aria-label={ui.nav.brandAria} onClick={() => setMobileMenuOpen(false)}>
          <img src={profileData.avatar.src} alt="" width={28} height={28} decoding="async" />
          <span>CDUYZH</span>
        </a>

        <nav aria-label={ui.nav.mainNavAria} className="chrome-desktop-nav">
          {navItems.map((item) => (
            <a key={item.id} id={`nav-link-${item.id}`} href={`#${item.id}`} className="chrome-nav-link">
              {item.label}
            </a>
          ))}

          <div className="chrome-lang-segmented" role="group" aria-label="Language">
            <button
              type="button"
              className={`chrome-lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-pressed={lang === 'en'}
              title="English"
            >
              EN
            </button>
            <span className="chrome-lang-divider" aria-hidden="true">/</span>
            <button
              type="button"
              className={`chrome-lang-btn ${lang === 'zh' ? 'active' : ''}`}
              onClick={() => setLanguage('zh')}
              aria-pressed={lang === 'zh'}
              title="中文"
            >
              中
            </button>
          </div>

          <a id="nav-hire-btn" href="#contact" className="chrome-cta">{ui.nav.cta}</a>
        </nav>

        <button
          ref={toggleRef}
          id="nav-mobile-toggle"
          type="button"
          className="chrome-menu-toggle"
          aria-label={mobileMenuOpen ? ui.nav.closeMenuAria : ui.nav.openMenuAria}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        ref={mobileNavRef}
        aria-label="移动端导航"
        className="chrome-mobile-nav"
        hidden={!mobileMenuOpen}
      >
        <div className="section-shell chrome-mobile-links">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenuFromLink}>
              {item.label}
            </a>
          ))}

          <div className="chrome-mobile-lang">
            <span className="chrome-mobile-lang-label">
              <Globe size={15} aria-hidden="true" />
              Language
            </span>
            <div className="chrome-lang-segmented" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`chrome-lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
                aria-pressed={lang === 'en'}
              >
                English
              </button>
              <span className="chrome-lang-divider" aria-hidden="true">/</span>
              <button
                type="button"
                className={`chrome-lang-btn ${lang === 'zh' ? 'active' : ''}`}
                onClick={() => setLanguage('zh')}
                aria-pressed={lang === 'zh'}
              >
                中文
              </button>
            </div>
          </div>

          <a href="#contact" className="chrome-cta" onClick={closeMenuFromLink}>{ui.nav.cta}</a>
        </div>
      </nav>
    </header>
  );
}
