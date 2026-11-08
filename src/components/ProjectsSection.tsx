import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import ProjectCard from './ProjectCard';
import './projects.css';

type ProjectCategory = 'all' | 'game' | 'mobile' | 'mac';
const PAGE_SIZE = 6;

const projectPriority = (status: string) => {
  if (status === '即将上线' || status === 'Coming Soon') return 0;
  if (status === '已上线' || status === 'Live') return 1;
  return 2;
};

export default function ProjectsSection() {
  const { ui, projects } = useLanguage();
  const [category, setCategory] = useState<ProjectCategory>('all');
  const reducedMotion = useReducedMotion();
  const [limit, setLimit] = useState(PAGE_SIZE);

  const categories: { value: ProjectCategory; label: string }[] = [
    { value: 'all', label: ui.projects.categoryAll },
    { value: 'game', label: ui.projects.categoryGame },
    { value: 'mobile', label: ui.projects.categoryMobile },
    { value: 'mac', label: ui.projects.categoryMac },
  ];

  const results = projects.filter((project) => {
    if (['研究中', '构思中', '开发中', 'In Research', 'Concept', 'In Progress'].includes(project.status)) return false;
    if (category !== 'all' && project.category !== category) return false;
    return true;
  }).sort((a, b) => projectPriority(a.status) - projectPriority(b.status));

  const visibleProjects = results.slice(0, limit);
  const resetLimit = () => setLimit(PAGE_SIZE);

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="section-shell">
        <header className="projects-header">
          <div>
            <p className="eyebrow">{ui.projects.eyebrow}</p>
            <h2 id="projects-title">{ui.projects.heading}</h2>
          </div>
          <p className="projects-intro">
            {ui.projects.description}
          </p>
        </header>

        <div className="projects-toolbar">
          <div className="projects-filters" role="group" aria-label={ui.projects.filterGroupAria}>
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={category === item.value}
                aria-controls="projects-list"
                onClick={() => { setCategory(item.value); resetLimit(); }}
              >
                {category === item.value && (
                  <motion.span
                    className="projects-filter-indicator"
                    layoutId="project-category-indicator"
                    transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 440, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span className="projects-filter-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="projects-results-bar">
          <p className="projects-count" role="status" aria-live="polite" aria-atomic="true">
            {results.length} {ui.projects.countLabel}
            {results.length > limit ? ` · ${ui.projects.showingLabel} ${visibleProjects.length}` : ''}
          </p>
        </div>

        <div id="projects-list" className="projects-grid" key={category}>
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {limit < results.length && (
          <div className="projects-more">
            <button type="button" onClick={() => setLimit((current) => current + PAGE_SIZE)}>
              {ui.projects.loadMore} <span aria-hidden="true">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
