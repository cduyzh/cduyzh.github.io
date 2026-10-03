import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profileData } from '../data/profile';
import './chrome.css';

const navItems = [
  { label: '关于', id: 'about' },
  { label: '作品', id: 'projects' },
  { label: '联系', id: 'contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

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
        <a id="nav-brand-logo" href="#hero" className="chrome-brand" aria-label="CDUYZH 首页" onClick={() => setMobileMenuOpen(false)}>
          <img src={profileData.avatar.src} alt="" width={28} height={28} decoding="async" />
          <span>CDUYZH</span>
        </a>

        <nav aria-label="主导航" className="chrome-desktop-nav">
          {navItems.map((item) => (
            <a key={item.id} id={`nav-link-${item.id}`} href={`#${item.id}`} className="chrome-nav-link">
              {item.label}
            </a>
          ))}
          <a id="nav-hire-btn" href="#contact" className="chrome-cta">聊聊想法</a>
        </nav>

        <button
          ref={toggleRef}
          id="nav-mobile-toggle"
          type="button"
          className="chrome-menu-toggle"
          aria-label={mobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
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
          <a href="#contact" className="chrome-cta" onClick={closeMenuFromLink}>聊聊想法</a>
        </div>
      </nav>
    </header>
  );
}
