import { useState } from 'react';
import { getPublicProjects } from '../data/projects';
import ProjectCard from './ProjectCard';
import './projects.css';

type ProjectFilter = 'live' | 'exploring';

const filters: { value: ProjectFilter; label: string }[] = [
  { value: 'live', label: '已上线' },
  { value: 'exploring', label: '探索中' },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('live');
  const publicProjects = getPublicProjects();
  const visibleProjects = publicProjects.filter((project) => {
    if (activeFilter === 'live') return project.status === '已上线';
    if (activeFilter === 'exploring') return project.status !== '已上线';
    return true;
  });

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="section-shell">
        <header className="projects-header">
          <div>
            <p className="eyebrow">作品与探索</p>
            <h2 id="projects-title">一些想法，<br />已经成为作品。</h2>
          </div>
          <p className="projects-intro">
            从自己的日常出发，把一个小小的念头，<br className="projects-desktop-break" />做成可以使用、值得打磨的东西。
          </p>
        </header>

        <div className="projects-toolbar">
          <div className="projects-filters" role="group" aria-label="按项目状态筛选">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={activeFilter === filter.value}
                aria-controls="projects-list"
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p className="projects-count" role="status" aria-live="polite" aria-atomic="true">
            {visibleProjects.length} 个{activeFilter === 'live' ? '已上线项目' : '探索中的项目'}
          </p>
        </div>

        <div id="projects-list" className="projects-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              featured={index === 0 && activeFilter !== 'exploring'}
            />
          ))}
        </div>
        <p className="projects-footnote">持续创造，也持续迭代。探索中的项目以当前真实阶段展示。</p>
      </div>
    </section>
  );
}
