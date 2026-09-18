import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface SectionDividerProps {
  color?: string;
  className?: string;
}

export default function SectionDivider({ color = '#b9ff62', className = '' }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative py-8 sm:py-12 flex items-center justify-center ${className}`}>
      <motion.div
        style={{ width: lineWidth, opacity }}
        className="h-px max-w-2xl mx-auto"
      >
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(to right, transparent, ${color}40, ${color}, ${color}40, transparent)`,
          }}
        />
      </motion.div>
    </div>
  );
}
