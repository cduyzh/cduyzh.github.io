import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollScene } from '../hooks/useScrollScene';

export default function Hero() {
  const { ui, projects } = useLanguage();
  const featuredProject = projects.find(project => project.slug === 'hsr-archive') || projects[0];
  const sideProject = projects.find(project => project.slug === 'cards-score') || projects[1];

  const { ref, progress, isCompact, isStatic, isShort } = useScrollScene();
  const [introHidden, setIntroHidden] = useState(false);
  const introHiddenRef = useRef(false);
  const titleScale = useTransform(progress, [0, 0.28], [1, 0.92]);
  const titleY = useTransform(progress, [0, 0.28], [0, -70]);
  const titleOpacity = useTransform(progress, [0.06, 0.26], [1, 0]);
  const productScale = useTransform(progress, [0, 0.55, 1], [0.88, 1, 1.04]);
  const productY = useTransform(progress, [0, 0.55, 1], isCompact ? [24, -16, -24] : isShort ? [64, -70, -90] : [64, -110, -130]);
  const productRotate = useTransform(progress, [0, 0.48], [-7, 0]);
  const sideX = useTransform(progress, [0, 0.48], [28, 0]);
  const sideY = useTransform(progress, [0, 0.48], [50, 0]);
  const detailOpacity = useTransform(progress, [0.26, 0.42], [0, 1]);
  const detailY = useTransform(progress, [0.26, 0.48], [36, 0]);
  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0]);

  // 只在可访问状态越过边界时更新 state，已淡出的链接不进入 Tab 顺序。
  const updateIntroVisibility = (value: number) => {
    const hidden = value >= 0.26;
    if (hidden !== introHiddenRef.current) {
      introHiddenRef.current = hidden;
      setIntroHidden(hidden);
    }
  };
  useMotionValueEvent(progress, 'change', updateIntroVisibility);
  useEffect(() => updateIntroVisibility(progress.get()), [progress]);

  return (
    <section ref={ref} id="hero" className={`hero-scene scroll-scene${isStatic ? ' scene-static' : ''}`} aria-labelledby="hero-title">
      <div className="hero-stage pin-stage">
        <div className="hero-glow" aria-hidden="true" />
        <motion.div className="hero-intro" style={isStatic ? { scale: 1, y: 0, opacity: 1 } : { scale: titleScale, y: titleY, opacity: titleOpacity }}>
          <p className="eyebrow hero-eyebrow"><span /> {ui.hero.eyebrow}</p>
          <h1 id="hero-title">{ui.hero.titleLine1}<br /><span>{ui.hero.titleLine2}</span></h1>
          <p className="hero-description">{ui.hero.description}</p>
          <div className="hero-actions" inert={!isStatic && introHidden}>
            <a className="button-primary" href="#projects">{ui.hero.exploreBtn} <ArrowDown size={15} /></a>
            <a className="text-link" href="#about">{ui.hero.aboutBtn} <ChevronRight size={17} /></a>
          </div>
        </motion.div>
        <motion.div className="hero-reveal" style={isStatic ? { opacity: 1, y: 0 } : { opacity: detailOpacity, y: detailY }}>
          <p className="eyebrow">{ui.hero.revealEyebrow}</p>
          <h2>{ui.hero.revealTitle}</h2>
          <p>{ui.hero.revealDesc}</p>
        </motion.div>
        <motion.div className="hero-product" style={isStatic ? { x: 0, y: 0, scale: 1, rotateX: 0 } : { x: '-50%', y: productY, scale: productScale, rotateX: productRotate }}>
          <div className="product-window">
            <div className="product-toolbar" aria-hidden="true"><span className="window-dots"><i /><i /><i /></span><span>cduyzh / selected work</span><ArrowUpRight size={13} /></div>
            <img className="product-cover" src={featuredProject.cover} alt={featuredProject.coverAlt || featuredProject.title} width={800} height={500} fetchPriority="high" />
            <div className="product-window-footer"><span>{featuredProject.title}</span><span>DESIGNED & BUILT BY CDUYZH</span></div>
          </div>
          <motion.div className="product-companion" style={isStatic ? { x: 0, y: 0 } : { x: sideX, y: sideY }}>
            <div className="companion-camera" aria-hidden="true" />
            <div className="companion-heading"><span>{ui.hero.companionBadge}</span><strong>{sideProject.title}</strong></div>
            <img src={sideProject.cover} alt={sideProject.coverAlt || sideProject.title} width={800} height={500} />
            <div className="companion-caption">{ui.hero.companionCaption}<span>WeChat Mini Program</span></div>
            <div className="companion-home" aria-hidden="true" />
          </motion.div>
          <div className="product-note" aria-hidden="true"><span className="note-mark">✳</span><span>{ui.hero.noteLine1}<br /><strong>{ui.hero.noteLine2}</strong></span></div>
        </motion.div>
        <div className="hero-bottom"><span>CHENGDU, CHINA</span><motion.span className="hero-scroll-hint" style={isStatic ? undefined : { opacity: hintOpacity }}>{ui.hero.scrollHint} <ArrowDown size={13} /></motion.span><span>IDEAS INTO REALITY</span></div>
        <div className="scene-track" aria-hidden="true"><motion.div style={{ scaleX: isStatic ? 1 : progress }} /></div>
      </div>
    </section>
  );
}
