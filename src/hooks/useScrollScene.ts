import { useCallback, useRef, useSyncExternalStore } from 'react';
import { useScroll, useTransform } from 'motion/react';

function useMediaQuery(query: string) {
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', notify);
    return () => media.removeEventListener('change', notify);
  }, [query]);
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

// 进度与 sticky 可滚动距离一致，逐帧更新 MotionValue 而非 React state。
export function useScrollScene() {
  const ref = useRef<HTMLElement>(null);
  const isCompact = useMediaQuery('(max-width: 767px)');
  const isStatic = useMediaQuery('(prefers-reduced-motion: reduce), (max-height: 600px)');
  const isShort = useMediaQuery('(max-height: 700px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // 使用同一份 JS 进度，避免原生 timeline 的 opacity 区间与 transform scrub 分歧。
  const progress = useTransform(scrollYProgress, value => value);
  return { ref, progress, isCompact, isStatic, isShort };
}
