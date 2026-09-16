import { ArrowUp } from 'lucide-react';
import { profileData } from '../data/profile';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-paper-sunk hairline border-t text-ink-3 py-10 px-6 sm:px-10 md:px-12 text-xs font-mono select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left */}
        <div className="flex items-center gap-2.5">
          <img
            src={profileData.avatar.src}
            alt={profileData.avatar.alt}
            width={480}
            height={480}
            loading="lazy"
            decoding="async"
            className="w-7 h-7 rounded-full object-cover object-center ring-1 ring-stone-400/60"
          />
          <span className="font-display font-bold text-stone-900 text-sm">
            {profileData.name}
          </span>
          <span className="text-stone-400">·</span>
          <span>© 2026 保留所有权利</span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-2 text-stone-600">
          <span>个人域名</span>
          <a
            href={`https://${profileData.domain}`}
            target="_blank"
            rel="noreferrer"
            className="text-stone-900 font-medium hover:text-clay transition-colors underline underline-offset-4"
          >
            {profileData.domain}
          </a>
          <span className="text-stone-400">·</span>
          <span>中国 · 成都</span>
        </div>

        {/* Right: Back to top */}
        <div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-stone-700 hover:text-stone-950 transition-colors focus:outline-none py-1.5 px-3.5 rounded-full border border-stone-300 bg-white/70 hover:bg-white shadow-xs"
          >
            <span>返回顶部</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ICP filing */}
      <div className="max-w-6xl mx-auto mt-6 pt-5 border-t border-stone-300/60 text-center">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-600 hover:text-clay transition-colors underline underline-offset-4 decoration-stone-300 hover:decoration-clay"
        >
          {profileData.beian}
        </a>
      </div>
    </footer>
  );
}

