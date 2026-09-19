import { useState } from 'react';
import { motion } from 'motion/react';
import { getPublicProjects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const publicProjects = getPublicProjects();

  // Maximum items shown on the main page
  const HOMEPAGE_LIMIT = 8;
  const [displayCount, setDisplayCount] = useState<number>(HOMEPAGE_LIMIT);

  const visibleProjects = publicProjects.slice(0, displayCount);
  const hasMoreThanLimit = publicProjects.length > HOMEPAGE_LIMIT;

  return (
    <section id="projects" className="veil-strong relative w-full py-20 sm:py-28 md:py-32 text-ink">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-300/70 pb-6 mb-10 sm:mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-clay font-semibold mb-3">
              <span>02 / 作品与探索</span>
              <span>·</span>
              {/* Dynamic Project Count */}
              <span>共收录 {publicProjects.length} 个公开项目</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900"
            >
              最近做的一些东西
            </motion.h2>
          </div>

          <div className="max-w-md text-sm md:text-base text-stone-600 font-normal leading-relaxed">
            从日常真实痛点与兴趣切入的自用工具与实验项目。聚焦清晰的功能架构、克制的排版美感与可靠的端侧体验。
          </div>
        </div>

        {/* 2-Column Grid on Desktop, 1-Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Only show '查看更多项目' when public projects exceed HOMEPAGE_LIMIT (8) */}
        {hasMoreThanLimit && (
          <div className="mt-12 text-center">
            {displayCount < publicProjects.length ? (
              <button
                type="button"
                onClick={() => setDisplayCount((prev) => prev + HOMEPAGE_LIMIT)}
                className="px-8 py-3.5 rounded-full bg-stone-900 text-white hover:bg-clay transition-colors font-mono text-xs font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay"
              >
                查看更多项目 ({publicProjects.length - displayCount})
              </button>
            ) : (
              <span className="text-xs font-mono text-stone-400">
                已展示全部 {publicProjects.length} 个公开项目
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
