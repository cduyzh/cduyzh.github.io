import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { socialsData } from '../data/socials';
import { profileData } from '../data/profile';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: '关于我', id: 'about' },
    { label: '近期作品', id: 'projects' },
    { label: '联系方式', id: 'contact' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-[padding,background-color,border-color,box-shadow] duration-300 ${
          isScrolled
            ? 'py-3.5 bg-paper/86 backdrop-blur-xl hairline border-b shadow-[0_4px_20px_rgba(26,22,19,0.04)]'
            : 'py-5 md:py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay rounded-xs"
            aria-label="CDUYZH 首页"
          >
            <img
              src={profileData.avatar.src}
              alt=""
              width={480}
              height={480}
              fetchPriority="low"
              decoding="async"
              className="w-8 h-8 rounded-full object-cover object-center ring-1 ring-stone-300/90 group-hover:ring-clay/70 transition-shadow"
            />
            <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-stone-900 group-hover:text-stone-600 transition-colors">
              CDUYZH
            </span>
            <span className="text-xs font-mono text-stone-400 hidden sm:inline">www.cduyzh.top</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-stone-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-stone-900 transition-colors duration-200 py-1 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay rounded-xs"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-clay transition-[width] duration-200 group-hover:w-full" />
              </button>
            ))}

            <button
              id="nav-hire-btn"
              onClick={() => scrollToSection('contact')}
              className="ml-2 px-4 py-1.5 rounded-full border border-stone-300 text-stone-800 hover:text-white hover:bg-stone-900 hover:border-stone-900 transition-[color,background-color,border-color] duration-200 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              打个招呼
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay rounded-lg"
            aria-label="切换导航菜单"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-fullscreen-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-paper flex flex-col justify-between p-8 pt-28 text-ink md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono text-clay uppercase tracking-widest font-semibold">
                导航菜单
              </span>
              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left font-display text-3xl font-extrabold text-stone-900 hover:text-clay transition-colors py-1 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-stone-400">0{index + 1}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="border-t border-stone-200/80 pt-6 flex flex-col gap-4">
              <div className="text-xs font-mono text-stone-500">已验证通道</div>
              <div className="flex flex-wrap gap-4">
                {socialsData.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-stone-700 hover:text-clay flex items-center gap-1"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
