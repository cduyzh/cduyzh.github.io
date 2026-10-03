import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, ChevronRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import { useScrollScene } from '../hooks/useScrollScene';

const featuredProject = projectsData.find(project => project.slug === 'hsr-archive' && project.visibility === 'public')!;
const sideProject = projectsData.find(project => project.slug === 'cards-score' && project.visibility === 'public')!;

export default function Hero() {
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
          <p className="eyebrow hero-eyebrow"><span /> CDUYZH · 独立开发者</p>
          <h1 id="hero-title">把想法，<br /><span>做成好用的日常。</span></h1>
          <p className="hero-description">用代码探索可能，用设计打磨体验。<br className="mobile-break" />做产品，也做一些有意思的东西。</p>
          <div className="hero-actions" inert={!isStatic && introHidden}>
            <a className="button-primary" href="#projects">探索我的作品 <ArrowDown size={15} /></a>
            <a className="text-link" href="#about">认识一下 <ChevronRight size={17} /></a>
          </div>
        </motion.div>
        <motion.div className="hero-reveal" style={isStatic ? { opacity: 1, y: 0 } : { opacity: detailOpacity, y: detailY }}>
          <p className="eyebrow">从灵感，到屏幕。</p>
          <h2>认真做的东西，<br className="mobile-break" />用起来会不一样。</h2>
          <p>从游戏数据到生活工具，让每个想法找到自己的形状。</p>
        </motion.div>
        <motion.div className="hero-product" style={isStatic ? { x: 0, y: 0, scale: 1, rotateX: 0 } : { x: '-50%', y: productY, scale: productScale, rotateX: productRotate }}>
          <div className="product-window">
            <div className="product-toolbar" aria-hidden="true"><span className="window-dots"><i /><i /><i /></span><span>cduyzh / selected work</span><ArrowUpRight size={13} /></div>
            <img className="product-cover" src={featuredProject.cover} alt="终局竞速档案站项目封面" width={800} height={500} fetchPriority="high" />
            <div className="product-window-footer"><span>{featuredProject.title}</span><span>DESIGNED & BUILT BY CDUYZH</span></div>
          </div>
          <motion.div className="product-companion" style={isStatic ? { x: 0, y: 0 } : { x: sideX, y: sideY }}>
            <div className="companion-camera" aria-hidden="true" />
            <div className="companion-heading"><span>小工具，大自在。</span><strong>{sideProject.title}</strong></div>
            <img src={sideProject.cover} alt="打牌记分小程序项目封面" width={800} height={500} />
            <div className="companion-caption">随手记分 · 专心享受牌局<span>微信小程序</span></div>
            <div className="companion-home" aria-hidden="true" />
          </motion.div>
          <div className="product-note" aria-hidden="true"><span className="note-mark">✳</span><span>一点好奇心。<br /><strong>一些真实的作品。</strong></span></div>
        </motion.div>
        <div className="hero-bottom"><span>CHENGDU, CHINA</span><motion.span className="hero-scroll-hint" style={isStatic ? undefined : { opacity: hintOpacity }}>滚动，发现更多 <ArrowDown size={13} /></motion.span><span>IDEAS INTO REALITY</span></div>
        <div className="scene-track" aria-hidden="true"><motion.div style={{ scaleX: isStatic ? 1 : progress }} /></div>
      </div>
    </section>
  );
}
