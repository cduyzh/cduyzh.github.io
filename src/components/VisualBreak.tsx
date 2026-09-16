import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface VisualBreakProps {
  id?: string;
  imageSrc: string;
  fallbackSrc?: string;
  imageAlt: string;
  quote: string;
  subtext?: string;
  align?: 'center' | 'left' | 'right';
  badge?: string;
}

export default function VisualBreak({
  id,
  imageSrc,
  fallbackSrc,
  imageAlt,
  quote,
  subtext,
  align = 'center',
  badge
}: VisualBreakProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(imageSrc);

  useEffect(() => {
    setCurrentSrc(imageSrc);
  }, [imageSrc]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms (bypassed if reduced motion)
  const bgY = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['0%', '0%'] : ['-10%', '10%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1.08, 1.01]);
  const textY = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['0px', '0px'] : ['20px', '-20px']);

  const alignClass = {
    center: 'items-center text-center mx-auto',
    left: 'items-start text-left mr-auto',
    right: 'items-end text-right ml-auto'
  }[align];

  return (
    <div
      ref={containerRef}
      id={id}
      className="feather-y relative w-full h-[55vh] sm:h-[65vh] md:h-[72vh] overflow-hidden flex items-center justify-center select-none bg-[#1c1917]"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 -z-20 w-full h-[120%] -top-[10%] will-change-transform"
        >
          <img
            src={currentSrc}
            alt={imageAlt}
            width={2000}
            height={1200}
            className="w-full h-full object-cover brightness-[0.7] contrast-105"
            loading="lazy"
            decoding="async"
            onError={() => {
              if (fallbackSrc && currentSrc !== fallbackSrc) {
                setCurrentSrc(fallbackSrc);
              }
            }}
          />
          {/* Subtle cinematic gradient overlays */}
          <div className="absolute inset-0 bg-stone-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/40" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-12 w-full">
        <motion.div
          style={{ y: textY }}
          className={`flex flex-col ${alignClass}`}
        >
          {badge && (
            <span className="text-xs font-mono tracking-widest text-amber-200 uppercase mb-4 border border-amber-200/30 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md">
              {badge}
            </span>
          )}

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-xs">
            {quote}
          </h2>

          {subtext && (
            <p className="mt-4 text-sm sm:text-base md:text-lg text-stone-200 font-light max-w-xl leading-relaxed">
              {subtext}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
