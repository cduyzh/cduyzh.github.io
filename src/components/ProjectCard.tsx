import { useRef, type Key } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project, ProjectStatus } from '../types';

interface ProjectCardProps {
  key?: Key;
  project: Project;
  index: number;
  onSelect: (project: Project, triggerEl?: HTMLElement | null) => void;
}

const statusStyles: Record<ProjectStatus, { bg: string; text: string; dot: string }> = {
  '已上线': { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', dot: 'bg-emerald-500' },
  '内测中': { bg: 'bg-teal-50 border-teal-200', text: 'text-teal-800', dot: 'bg-teal-500' },
  '开发中': { bg: 'bg-amber-50/80 border-amber-200', text: 'text-amber-900', dot: 'bg-[#c85a32]' },
  '研究中': { bg: 'bg-sky-50 border-sky-200', text: 'text-sky-900', dot: 'bg-sky-500' },
  '构思中': { bg: 'bg-stone-100 border-stone-200', text: 'text-stone-700', dot: 'bg-stone-400' }
};

export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const statusConfig = statusStyles[project.status] || statusStyles['开发中'];

  const handleCardClick = () => {
    onSelect(project, triggerButtonRef.current);
  };

  return (
    <motion.article
      id={`project-card-${project.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      className="group relative flex flex-col justify-between h-full bg-white rounded-2xl border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:border-stone-300 transition-[transform,box-shadow,border-color] duration-300 overflow-hidden"
    >
      <div>
        {/* Visual Cover (16:10 aspect ratio) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 border-b border-stone-100">
          <img
            src={project.cover}
            alt={project.coverAlt || `${project.title}视觉示意`}
            width={800}
            height={500}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />

          {/* Status Badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-md bg-white/95 border shadow-xs">
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

          {/* Semantic Title Button */}
          <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
            <button
              type="button"
              onClick={handleCardClick}
              className="text-left hover:text-[#c85a32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32] rounded-xs"
            >
              {project.title}
            </button>
          </h3>

          {/* One-sentence Summary */}
          <p className="mt-2.5 text-sm sm:text-base text-stone-600 font-normal leading-relaxed line-clamp-2">
            {project.summary}
          </p>

          {/* Key Tags (2 - 4 tags) */}
          <div className="mt-4 flex flex-wrap gap-1.5" aria-label="项目关键标签">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md bg-stone-100 border border-stone-200/80 text-stone-600 text-xs font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex items-center justify-between border-t border-stone-100 mt-2 text-xs font-mono">
        <button
          ref={triggerButtonRef}
          type="button"
          onClick={handleCardClick}
          className="inline-flex items-center gap-1.5 text-stone-900 hover:text-[#c85a32] font-semibold transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32] rounded-xs"
          aria-haspopup="dialog"
        >
          <span>查看项目档案</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-3 text-stone-500">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
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
  );
}
