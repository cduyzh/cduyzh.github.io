import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Layers, Calendar, User, Compass, CheckCircle2, Clock } from 'lucide-react';
import { Project, ProjectStatus } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const statusTone: Record<ProjectStatus, { text: string; dot: string }> = {
  '已上线': { text: 'text-emerald-300', dot: 'bg-emerald-400' },
  '内测中': { text: 'text-teal-300', dot: 'bg-teal-400' },
  '开发中': { text: 'text-clay', dot: 'bg-clay' },
  '研究中': { text: 'text-sky-300', dot: 'bg-sky-400' },
  '构思中': { text: 'text-ink-3', dot: 'bg-ink-3' }
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
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
    };
  }, [project, onClose]);

  if (!project) return null;

  const tone = statusTone[project.status] || statusTone['开发中'];

  return (
    <AnimatePresence>
      <div
        id="project-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-paper/85 backdrop-blur-md overflow-y-auto"
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
          className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl overflow-hidden border border-[rgba(127,229,221,0.20)] shadow-[0_40px_120px_rgba(0,0,0,0.55)] my-auto text-ink flex flex-col max-h-[88vh] bg-[linear-gradient(150deg,rgba(20,29,36,0.97),rgba(8,11,15,0.95))] backdrop-blur-xl"
        >
          {/* Ambient top glow, mirrors the site's spatial light */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(127,229,221,0.10),transparent_70%)]"
            aria-hidden
          />

          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-[rgba(9,12,16,0.82)] backdrop-blur-md border-b hairline">
            <div className="flex items-center gap-2 text-xs font-mono text-ink-3">
              <span className="text-clay font-semibold">项目档案 0{project.id}</span>
              <span className="text-ink-3/60">·</span>
              <span>/{project.slug}</span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full border border-white/10 bg-white/[0.03] text-ink-2 hover:text-clay hover:border-clay/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
              aria-label="关闭项目档案"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="relative overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Header & Title */}
            <div>
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-clay font-semibold mb-3">
                <span>PROJECT DOSSIER</span>
                <span className="w-px h-3 bg-ink/15" />
                <span>真实记录</span>
              </div>
              <h2
                id="project-modal-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight"
              >
                {project.title}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Meta Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
                <div className="text-ink-3 mb-1.5 flex items-center gap-1.5">
                  <Calendar size={13} /> 年份
                </div>
                <div className="text-ink font-semibold">{project.year}</div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
                <div className="text-ink-3 mb-1.5 flex items-center gap-1.5">
                  <User size={13} /> 角色
                </div>
                <div className="text-ink font-semibold">{project.role}</div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
                <div className="text-ink-3 mb-1.5 flex items-center gap-1.5">
                  <Layers size={13} /> 形态
                </div>
                <div className="text-ink font-semibold">Web / 独立工具</div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
                <div className="text-ink-3 mb-1.5 flex items-center gap-1.5">
                  <Clock size={13} className="text-clay" /> 状态
                </div>
                <div className={`font-semibold flex items-center gap-1.5 ${tone.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
                  {project.status}
                </div>
              </div>
            </div>

            {/* Visual Cover Preview */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-paper-sunk">
              <img
                src={project.cover}
                alt={project.coverAlt || `${project.title}示意图`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>

            {/* Background & Purpose */}
            <div className="space-y-2.5 text-sm sm:text-base text-ink-2 leading-relaxed pt-7 border-t hairline">
              <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
                <Compass size={17} className="text-clay" />
                <span>构思背景与探索重点</span>
              </h3>
              <p>{project.description}</p>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3 pt-7 border-t hairline">
                <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-clay" />
                  <span>核心实践要点</span>
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-ink-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-3 pt-7 border-t hairline">
              <h3 className="text-xs font-mono text-ink-3 tracking-widest">
                技术栈与工具
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md border border-white/10 bg-white/[0.04] text-ink-2 text-xs font-mono transition-colors hover:border-clay/40 hover:text-clay"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions / Links */}
            <div className="pt-6 border-t hairline flex flex-wrap items-center gap-3">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-clay text-[#071009] font-semibold text-xs font-mono hover:bg-[#d9ff9e] transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
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
                  className="px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.03] text-ink-2 hover:text-clay hover:border-clay/40 transition-colors text-xs font-mono flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                >
                  <Github size={14} />
                  <span>查看 GitHub 源码</span>
                </a>
              ) : null}

              {!project.demoUrl && !project.repoUrl && (
                <div className="text-xs font-mono text-ink-3 py-1">
                  当前阶段聚焦功能设计与原型迭代，暂未对外开放公开体验地址。
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
