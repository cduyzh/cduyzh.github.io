import { motion, useTransform } from 'motion/react';
import { ArrowUpRight, Code2, Sparkles, Shapes } from 'lucide-react';
import { profileData } from '../data/profile';
import { useLanguage } from '../context/LanguageContext';
import { useScrollScene } from '../hooks/useScrollScene';

const disciplineIcons = [Code2, Sparkles, Shapes];

export default function About() {
  const { ui } = useLanguage();
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
            <p className="eyebrow">{ui.about.eyebrow}</p>
            <h2 id="about-title">
              {ui.about.titleLine1}<br />
              <motion.span style={staticLayout ? { opacity: 1 } : { opacity: accentOpacity }}>
                {ui.about.titleLine2}
              </motion.span>
            </h2>
            <p className="about-intro">{ui.about.intro}</p>
            <div className="about-disciplines">
              {ui.about.disciplines.map((item, index) => {
                const Icon = disciplineIcons[index] || Code2;
                return (
                  <div className="about-discipline" key={item.title}>
                    <Icon size={19} strokeWidth={1.5} />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <a href="#contact" className="text-link about-link">
              {ui.about.chatLink} <ArrowUpRight size={16} />
            </a>
          </motion.div>
          <motion.figure className="about-portrait" style={staticLayout ? { y: 0 } : { y: portraitY }}>
            <motion.img
              src={profileData.avatar.src}
              alt={profileData.avatar.alt}
              width={480}
              height={480}
              loading="lazy"
              decoding="async"
              style={staticLayout ? { scale: 1 } : { scale: portraitScale }}
            />
            <figcaption>
              <span>{ui.about.portraitCaption}</span>
              <small>{ui.about.portraitLocation}</small>
            </figcaption>
          </motion.figure>
        </div>
        <div className="about-footnote section-shell">
          <span>{ui.about.footnoteMindset}</span>
          <span>{ui.about.footnoteIndex}</span>
        </div>
        <div className="scene-track" aria-hidden="true">
          <motion.div style={{ scaleX: staticLayout ? 1 : progress }} />
        </div>
      </div>
    </section>
  );
}
