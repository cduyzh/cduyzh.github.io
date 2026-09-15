import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import HeroThreeCanvas from './HeroThreeCanvas';
import { profileData } from '../data/profile';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[92vh] sm:min-h-[96vh] overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none bg-[#fbf9f5]"
    >
      {/* Three.js Translucent Glass 3D Form (Single Controlled Motion Focus) */}
      <HeroThreeCanvas />

      {/* Gentle ambient light gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(254,243,199,0.25),transparent_60%)]" />

      {/* Top Bar Spacer & Corner Meta */}
      <div className="pt-20 md:pt-14 w-full flex justify-between items-center text-xs font-mono text-stone-500 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-stone-700 font-medium tracking-wider">中国 · 成都</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-stone-500 border border-stone-200/90 px-3.5 py-1 rounded-full bg-white/75 backdrop-blur-md shadow-xs">
          <span className="text-stone-700 font-medium">常驻成都 · 探索新想法</span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-500">{profileData.domain}</span>
        </div>
      </div>

      {/* Centerpiece Hero Typography */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="my-auto w-full max-w-5xl mx-auto flex flex-col justify-center items-start z-10 py-10 md:py-14"
      >
        {/* Role tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider text-stone-500 mb-3 sm:mb-4">
          <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 font-medium">Web 前端开发</span>
          <span className="text-stone-300">/</span>
          <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 font-medium">AI 应用</span>
          <span className="text-stone-300">/</span>
          <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 font-medium">独立工具</span>
        </div>

        {/* Oversized Brand Typography */}
        <h1
          id="hero-title"
          className="font-display font-extrabold tracking-[-0.04em] text-stone-900 leading-[0.88] select-none text-[clamp(64px,12vw,180px)]"
        >
          {profileData.name}
        </h1>

        {/* Subtitle & Core Message */}
        <div className="mt-6 md:mt-7 max-w-2xl flex flex-col gap-2.5">
          <p className="text-2xl sm:text-3xl md:text-4xl text-stone-800 font-semibold tracking-tight leading-snug">
            做产品，也做一些有意思的东西。
          </p>
          <p className="text-sm md:text-base text-stone-600 font-normal leading-relaxed max-w-xl">
            我是 cduyzh，专注于构建高质感数字体验与趁手工具。把闪现的想法敲成代码，做成真正能在浏览器或手机上使用的产品。
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 md:mt-9 flex flex-wrap items-center gap-3.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="px-6 py-3 rounded-full bg-stone-900 text-stone-100 font-semibold hover:bg-[#c85a32] transition-colors duration-200 flex items-center gap-2 shadow-xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
          >
            <span>浏览近期作品</span>
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('about')}
            className="px-6 py-3 rounded-full border border-stone-300 bg-white/70 text-stone-800 hover:bg-stone-100 hover:border-stone-400 transition-[background-color,border-color] duration-200 backdrop-blur-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
          >
            关于我
          </button>

          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="px-4 py-3 text-stone-600 hover:text-[#c85a32] transition-colors flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
          >
            <span>取得联系</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Bottom Corner Anchors */}
      <div className="w-full flex justify-between items-end text-xs font-mono text-stone-500 z-10 pt-4 border-t border-stone-200/60">
        <div className="flex items-center gap-3">
          <span className="text-stone-400">www.cduyzh.top</span>
          <span className="hidden sm:inline text-stone-300">/</span>
          <span className="hidden sm:inline text-stone-500">DIGITAL STUDIO</span>
        </div>

        <button
          type="button"
          onClick={() => scrollTo('about')}
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
        >
          <span>向下浏览</span>
          <ArrowDown size={13} className="text-stone-400 group-hover:text-stone-900 transition-colors" />
        </button>
      </div>
    </section>
  );
}
