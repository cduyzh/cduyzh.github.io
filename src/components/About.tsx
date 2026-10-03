import { motion, useTransform } from 'motion/react';
import { ArrowUpRight, Code2, Sparkles, Shapes } from 'lucide-react';
import { profileData } from '../data/profile';
import { useScrollScene } from '../hooks/useScrollScene';

const disciplines = [
  { icon: Code2, title: 'Web 界面工程', text: '让复杂的功能，拥有直觉般的操作。' },
  { icon: Sparkles, title: 'AI 应用探索', text: '把新的可能，变成真正趁手的工具。' },
  { icon: Shapes, title: '独立产品实践', text: '从自己的日常出发，解决具体的问题。' },
];

export default function About() {
  const { ref, progress, isStatic, isCompact, isShort } = useScrollScene();
  const portraitScale = useTransform(progress, [0, 1], [1.16, 1]);
  const portraitY = useTransform(progress, [0, 1], [28, -12]);
  const contentY = useTransform(progress, [0, 1], [24, -16]);
  const accentOpacity = useTransform(progress, [0.1, 0.65], [0.48, 1]);
  const staticLayout = isStatic || isCompact || isShort;
  return (
    <section ref={ref} id="about" className={`about-scene scroll-scene${staticLayout ? ' scene-static' : ''}`} aria-labelledby="about-title">
      <div className="about-stage pin-stage">
        <div className="section-shell about-layout">
          <motion.div className="about-content" style={staticLayout ? { y: 0 } : { y: contentY }}>
            <p className="eyebrow">关于我 / BEHIND THE WORK</p>
            <h2 id="about-title">技术是起点。<br /><motion.span style={staticLayout ? { opacity: 1 } : { opacity: accentOpacity }}>体验才是目的。</motion.span></h2>
            <p className="about-intro">我是 {profileData.handle}，一名常驻成都的 Web 前端开发者。喜欢把突然冒出来的想法，做成浏览器和手机上真正能用的产品。</p>
            <div className="about-disciplines">{disciplines.map(({ icon: Icon, title, text }) => <div className="about-discipline" key={title}><Icon size={19} strokeWidth={1.5} /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
            <a href="#contact" className="text-link about-link">聊聊你正在做的事 <ArrowUpRight size={16} /></a>
          </motion.div>
          <motion.figure className="about-portrait" style={staticLayout ? { y: 0 } : { y: portraitY }}>
            <motion.img src={profileData.avatar.src} alt={profileData.avatar.alt} width={480} height={480} loading="lazy" decoding="async" style={staticLayout ? { scale: 1 } : { scale: portraitScale }} />
            <figcaption><span>保持好奇。<br />持续创造。</span><small>CDUYZH / CHENGDU</small></figcaption>
          </motion.figure>
        </div>
        <div className="about-footnote section-shell"><span>好用，始终是最重要的设计。</span><span>01 — THE MINDSET</span></div>
        <div className="scene-track" aria-hidden="true"><motion.div style={{ scaleX: staticLayout ? 1 : progress }} /></div>
      </div>
    </section>
  );
}
