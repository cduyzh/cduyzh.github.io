import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { marqueeTech } from '../data/tech';
import { Layers, Cpu, Cloud, Terminal } from 'lucide-react';

export default function TechSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const marqueeX1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const marqueeX2 = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);

  const categories = [
    {
      title: 'Frontend Architecture',
      icon: Layers,
      items: ['React 19', 'TypeScript', 'Next.js (App Router)', 'Taro (Cross-platform)', 'Tailwind CSS', 'WebGL / Three.js', 'Motion & Spring Physics']
    },
    {
      title: 'AI & Generative Workflows',
      icon: Cpu,
      items: ['LLM Orchestration', 'Multi-Modal Reasoning', 'Autonomous Agent Hubs', 'Prompt Engineering', 'Vector Embeddings', 'Streaming Token Canvases']
    },
    {
      title: 'Infrastructure & Tools',
      icon: Cloud,
      items: ['Docker Containers', 'Nginx Reverse Proxy', 'Node.js / Express', 'Git Workflow & CI/CD', 'Cloud Run / Serverless', 'Performance Profiling']
    },
    {
      title: 'Design Systems & Craft',
      icon: Terminal,
      items: ['Accessible Primitives (WCAG)', 'Mathematical Typography Scales', 'Sub-millisecond Micro-Interactions', 'Dark Mode Ergonomics', 'Editorial Layouts']
    }
  ];

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="relative w-full py-28 md:py-36 bg-[#08080a] text-zinc-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 mb-16">
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-3">
          <span>/ 03 — CAPABILITIES</span>
          <span>·</span>
          <span>TECHNICAL DNA</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white"
        >
          TECHNICAL DOMAIN
        </motion.h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light max-w-xl">
          Crafting software at the intersection of rigorous systems engineering, fluid digital typography, and modern AI models.
        </p>
      </div>

      {/* Dynamic Marquee Ribbon 1 */}
      <div className="py-4 border-y border-white/[0.06] bg-white/[0.015] overflow-hidden whitespace-nowrap select-none my-6">
        <motion.div
          style={{ x: marqueeX1 }}
          className="flex items-center gap-8 font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-zinc-500/80 uppercase will-change-transform"
        >
          {[...marqueeTech, ...marqueeTech, ...marqueeTech].map((tech, i) => (
            <span key={i} className="flex items-center gap-8 hover:text-white transition-colors duration-300">
              <span>{tech}</span>
              <span className="text-zinc-700 font-light text-2xl">—</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Dynamic Marquee Ribbon 2 (Reverse direction) */}
      <div className="py-4 border-b border-white/[0.06] bg-white/[0.015] overflow-hidden whitespace-nowrap select-none mb-20">
        <motion.div
          style={{ x: marqueeX2 }}
          className="flex items-center gap-8 font-display font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight text-zinc-600/70 uppercase will-change-transform"
        >
          {[...marqueeTech.slice().reverse(), ...marqueeTech.slice().reverse(), ...marqueeTech.slice().reverse()].map((tech, i) => (
            <span key={i} className="flex items-center gap-8 hover:text-zinc-300 transition-colors duration-300">
              <span>{tech}</span>
              <span className="text-zinc-800 font-light text-xl">/</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Categorized Architecture Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="p-7 rounded-2xl bg-zinc-900/30 border border-white/[0.06] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 mb-6">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-4">
                    {cat.title}
                  </h3>
                  <ul className="space-y-2.5 text-xs font-mono text-zinc-400">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 hover:text-zinc-200 transition-colors">
                        <span className="w-1 h-1 rounded-full bg-zinc-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.04] text-[10px] font-mono text-zinc-600">
                  READY FOR SCALE
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
