import { useRef, useEffect, useState, useMemo, type FC } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface VisualBreakProps {
  id?: string;
  quote: string;
  highlightWords?: string[];
  subtext?: string;
  badge?: string;
}

interface CharRevealProps {
  char: string;
  index: number;
  total: number;
  isHighlight: boolean;
  progress: MotionValue<number>;
}

const CharReveal: FC<CharRevealProps> = ({ char, index, total, isHighlight, progress }) => {
  const start = index / total;
  const end = Math.min(1, (index + 10) / total);
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  // Zoom in slightly while moving up for a more refined typographic feel
  const y = useTransform(progress, [start, end], [12, 0]);
  const scale = useTransform(progress, [start, end], [0.95, 1]);

  return (
    <motion.span
      style={{ opacity, y, scale, display: 'inline-block' }}
      className={isHighlight
        ? 'text-clay drop-shadow-[0_0_12px_rgba(181,80,42,0.2)]'
        : 'text-stone-800'
      }
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

export default function VisualBreak({ id, quote, highlightWords = [], subtext, badge }: VisualBreakProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

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

  const textY = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['0px', '0px'] : ['30px', '-30px']);

  // Split quote into characters for staggered reveal
  const quoteChars = useMemo(() => {
    const chars: { char: string; isHighlight: boolean }[] = [];

    for (let i = 0; i < quote.length; i++) {
      const char = quote[i];
      let isHL = false;
      for (const word of highlightWords) {
        let idx = quote.indexOf(word);
        while (idx !== -1) {
          if (i >= idx && i < idx + word.length) {
            isHL = true;
            break;
          }
          idx = quote.indexOf(word, idx + 1);
        }
        if (isHL) break;
      }
      chars.push({ char, isHighlight: isHL });
    }
    return chars;
  }, [quote, highlightWords]);

  // Use scrollYProgress to reveal characters
  const revealProgress = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  // Subtext fade-in progress
  const subtextOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <div
      ref={containerRef}
      id={id}
      className="veil relative w-full py-32 sm:py-40 md:py-48 overflow-hidden flex items-center justify-center select-none"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-12 w-full">
        <motion.div
          style={{ y: textY }}
          className="flex flex-col items-center text-center"
        >
          {badge && (
            <span className="text-xs font-mono tracking-widest text-clay uppercase mb-8 border border-clay/30 px-4 py-1.5 rounded-full bg-clay/5 backdrop-blur-md shadow-[0_0_15px_rgba(181,80,42,0.05)]">
              {badge}
            </span>
          )}

          {/* Per-character reveal quote */}
          <motion.h2
            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
          >
            {quoteChars.map((item, i) => (
              <CharReveal
                key={i}
                char={item.char}
                index={i}
                total={quoteChars.length}
                isHighlight={item.isHighlight}
                progress={revealProgress}
              />
            ))}
          </motion.h2>

          {subtext && (
            <motion.p
              style={{
                opacity: subtextOpacity,
              }}
              className="mt-8 text-sm sm:text-base md:text-lg text-stone-500 font-light max-w-xl leading-relaxed"
            >
              {subtext}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
