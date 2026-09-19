import { useRef, useState, type Key, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project, ProjectStatus } from '../types';

interface ProjectCardProps {
  key?: Key;
  project: Project;
  index: number;
  onSelect: (project: Project, triggerEl?: HTMLElement | null) => void;
}

const statusStyles: Record<ProjectStatus, { bg: string; text: string; dot: string; glow: string }> = {
  '已上线': { bg: 'bg-emerald-50/90 border-emerald-200', text: 'text-emerald-800', dot: 'bg-emerald-500', glow: 'group-hover:border-emerald-300' },
  '内测中': { bg: 'bg-teal-50/90 border-teal-200', text: 'text-teal-800', dot: 'bg-teal-500', glow: 'group-hover:border-teal-300' },
  '开发中': { bg: 'bg-amber-50/90 border-amber-200', text: 'text-amber-900', dot: 'bg-clay', glow: 'group-hover:border-amber-300' },
  '研究中': { bg: 'bg-sky-50/90 border-sky-200', text: 'text-sky-900', dot: 'bg-sky-500', glow: 'group-hover:border-sky-300' },
  '构思中': { bg: 'bg-stone-100/90 border-stone-200', text: 'text-stone-700', dot: 'bg-stone-400', glow: 'group-hover:border-stone-300' }
};

export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const statusConfig = statusStyles[project.status] || statusStyles['开发中'];

  // 3D Tilt & Lighting Physics
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for perspective rotation
  const rotateX = useSpring(useTransform(y, [0, 1], [4.5, -4.5]), { damping: 20, stiffness: 220 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-4.5, 4.5]), { damping: 20, stiffness: 220 });

  // Glare position in percent
  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    x.set(clientX / rect.width);
    y.set(clientY / rect.height);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  const handleCardClick = () => {
    onSelect(project);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ perspective: 1100 }}
      className="h-full cursor-pointer"
    >
      <motion.article
        id={`project-card-${project.slug}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, scale: 0.97 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: (index % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col justify-between h-full bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(181,80,42,0.08)] hover:border-stone-300 transition-[border-color,box-shadow] duration-300 overflow-hidden select-none"
      >
        {/* Dynamic Specular Glass Glare Layer */}
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 opacity-60 mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 360px at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.7), transparent 70%)`
            }}
          />
        )}

        <div>
          {/* Visual Cover (16:10 aspect ratio) */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 border-b border-stone-100/90">
            <img
              src={project.cover}
              alt={project.coverAlt || `${project.title}视觉示意`}
              width={800}
              height={500}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-600 ease-out"
            />

            {/* Status Badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-md bg-white/95 border border-stone-200/80 shadow-xs">
              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
              <span className="text-stone-800">{project.status}</span>
            </div>

            {/* Project Index */}
            <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-xs font-mono text-stone-500 bg-white/90 backdrop-blur-md border border-stone-200/60 shadow-xs">
              0{index + 1}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-6 flex flex-col">
            {/* Metadata Row */}
            <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
              <span>{project.role}</span>
              <span className="text-stone-400">{project.year}</span>
            </div>

            {/* Semantic Title Button (keyboard-accessible trigger) */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
                className="text-left hover:text-clay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay rounded-xs"
                aria-haspopup="dialog"
              >
                {project.title}
              </button>
            </h3>

            {/* One-sentence Summary */}
            <p className="mt-2.5 text-sm sm:text-base text-stone-600 font-normal leading-relaxed line-clamp-2">
              {project.summary}
            </p>

            {/* Key Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5" aria-label="项目关键标签">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md bg-stone-100/90 border border-stone-200/80 text-stone-600 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Action Footer (links only) */}
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex items-center justify-between border-t border-stone-100/90 mt-2 text-xs font-mono">
          <span aria-hidden="true" className="text-stone-500">点击卡片查看档案</span>

          <div className="flex items-center gap-3 text-stone-500">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:text-stone-900 transition-colors flex items-center gap-1"
                title="访问在线演示"
                aria-label={`访问 ${project.title} 在线演示`}
              >
                <span>演示</span>
                <ExternalLink size={12} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:text-stone-900 transition-colors flex items-center gap-1"
                title="查看源码"
                aria-label={`查看 ${project.title} GitHub 源码`}
              >
                <Github size={13} />
                <span>源码</span>
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
