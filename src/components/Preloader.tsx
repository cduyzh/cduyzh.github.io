import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const targets = [20, 45, 70, 88, 100];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < targets.length) {
        setProgress(targets[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 650);
        }, 200);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 bg-[#fbf9f5] flex flex-col justify-between p-8 md:p-14 text-stone-900 select-none pointer-events-auto paper-texture"
        >
          {/* Top meta */}
          <div className="flex justify-between items-center text-xs font-mono text-stone-500">
            <span>www.cduyzh.top</span>
            <span>个人数字工作室</span>
          </div>

          {/* Center Brand */}
          <div className="flex flex-col items-center justify-center my-auto">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight font-display text-stone-900"
            >
              CDUYZH
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm md:text-base text-stone-600 font-medium mt-3"
            >
              做产品，也做一些有意思的东西。
            </motion.p>
          </div>

          {/* Bottom Progress */}
          <div className="w-full max-w-lg mx-auto flex flex-col gap-2.5">
            <div className="flex justify-between items-baseline text-xs font-mono text-stone-500">
              <span>正在进入主页...</span>
              <span className="text-base font-semibold text-stone-900">{progress}%</span>
            </div>
            <div className="w-full h-[2px] bg-stone-200 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-[#c85a32] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

