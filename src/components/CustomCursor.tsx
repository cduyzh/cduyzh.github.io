import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid motion
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Disable on touch devices, small screens, or when user prefers reduced motion
    const checkDisabled = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isSmall = window.innerWidth < 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setDisabled(isCoarse || isSmall || prefersReducedMotion);
    };

    checkDisabled();
    window.addEventListener('resize', checkDisabled);

    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleDocumentMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      const interactiveTarget = target.closest('a, button, [role="button"]') as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else if (interactiveTarget) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleDocumentMouseOver, { passive: true });

    return () => {
      window.removeEventListener('resize', checkDisabled);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleDocumentMouseOver);
    };
  }, [mouseX, mouseY, isVisible, disabled]);

  if (disabled || !isVisible) return null;

  return (
    <motion.div
      id="custom-cursor"
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        animate={{
          width: cursorText ? 76 : isHovered ? 38 : 8,
          height: cursorText ? 76 : isHovered ? 38 : 8,
          backgroundColor: cursorText ? 'rgba(28, 25, 23, 0.92)' : isHovered ? 'rgba(181,80,42, 0.12)' : 'rgba(28, 25, 23, 0.8)',
          borderColor: isHovered && !cursorText ? 'rgba(181,80,42, 0.6)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className={`rounded-full flex items-center justify-center backdrop-blur-[2px] transition-colors border ${
          cursorText ? 'text-white font-medium text-[11px] tracking-wider' : ''
        }`}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="select-none uppercase font-display"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
