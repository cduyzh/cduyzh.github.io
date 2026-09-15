import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Layers, Calendar, User, Compass, CheckCircle2, Clock } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  triggerElement: HTMLElement | null;
  onClose: () => void;
}

export default function ProjectModal({ project, triggerElement, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    // Lock background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the close button when opened
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Keyboard handlers: Escape to close, Tab to trap focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      // Return focus to triggering card button
      if (triggerElement) {
        triggerElement.focus();
      }
    };
  }, [project, triggerElement, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        id="project-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-stone-950/60 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          id={`project-modal-${project.slug}`}
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-[#faf8f4] border border-stone-300/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl my-auto text-stone-900 flex flex-col max-h-[88vh]"
        >
          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-[#faf8f4]/95 backdrop-blur-md border-b border-stone-200">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
              <span className="text-[#c85a32] font-semibold">项目档案 0{project.id}</span>
              <span>·</span>
              <span className="text-stone-400">/{project.slug}</span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200/80 text-stone-600 hover:text-stone-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
              aria-label="关闭项目档案"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-7">
            {/* Header & Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#c85a32] font-semibold mb-2">
                <span>PROJECT DOSSIER</span>
                <span>·</span>
                <span>真实记录</span>
              </div>
              <h2
                id="project-modal-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight"
              >
                {project.title}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-stone-700 font-normal leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Meta Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white border border-stone-200 text-xs font-mono">
              <div>
                <div className="text-stone-400 mb-1 flex items-center gap-1.5">
                  <Calendar size={13} /> 年份
                </div>
                <div className="text-stone-800 font-semibold">{project.year}</div>
              </div>
              <div>
                <div className="text-stone-400 mb-1 flex items-center gap-1.5">
                  <User size={13} /> 角色
                </div>
                <div className="text-stone-800 font-semibold">{project.role}</div>
              </div>
              <div>
                <div className="text-stone-400 mb-1 flex items-center gap-1.5">
                  <Layers size={13} /> 形态
                </div>
                <div className="text-stone-800 font-semibold">Web / 独立工具</div>
              </div>
              <div>
                <div className="text-stone-400 mb-1 flex items-center gap-1.5">
                  <Clock size={13} className="text-[#c85a32]" /> 状态
                </div>
                <div className="text-[#c85a32] font-semibold">{project.status}</div>
              </div>
            </div>

            {/* Visual Cover Preview */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
              <img
                src={project.cover}
                alt={project.coverAlt || `${project.title}示意图`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Background & Purpose */}
            <div className="space-y-2 text-sm sm:text-base text-stone-700 leading-relaxed">
              <h3 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
                <Compass size={17} className="text-[#c85a32]" />
                <span>构思背景与探索重点</span>
              </h3>
              <p>{project.description}</p>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#c85a32]" />
                  <span>核心实践要点</span>
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c85a32] mt-2 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono text-stone-400 tracking-wider">
                技术栈与工具
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md bg-white border border-stone-200 text-stone-700 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions / Links */}
            <div className="pt-5 border-t border-stone-200 flex flex-wrap items-center gap-3">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-stone-900 text-white font-medium text-xs font-mono hover:bg-[#c85a32] transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
                >
                  <span>访问在线演示</span>
                  <ExternalLink size={14} />
                </a>
              ) : null}

              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full border border-stone-300 bg-white text-stone-800 hover:bg-stone-100 transition-colors text-xs font-mono flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
                >
                  <Github size={14} />
                  <span>查看 GitHub 源码</span>
                </a>
              ) : null}

              {!project.demoUrl && !project.repoUrl && (
                <div className="text-xs font-mono text-stone-500 py-1">
                  💡 当前阶段聚焦功能设计与原型迭代，暂未对外开放公开体验地址。
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
