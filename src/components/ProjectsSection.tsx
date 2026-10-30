import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { getPublicProjects } from '../data/projects';
import ProjectCard from './ProjectCard';
import './projects.css';

type ProjectCategory = 'all' | 'game' | 'mobile' | 'mac';

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'all', label: '全部作品' },
  { value: 'game', label: '游戏工具' },
  { value: 'mobile', label: '移动应用' },
  { value: 'mac', label: 'Mac 工具' },
];
const PAGE_SIZE = 6;
const projectPriority = (status: string) => status === '即将上线' ? 0 : status === '已上线' ? 1 : 2;

export default function ProjectsSection() {
  const [category, setCategory] = useState<ProjectCategory>('all');
  const reducedMotion = useReducedMotion();
  const [limit, setLimit] = useState(PAGE_SIZE);
  const results = getPublicProjects().filter((project) => {
    if (['研究中', '构思中', '开发中'].includes(project.status)) return false;
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
            <p className="eyebrow">作品与探索</p>
            <h2 id="projects-title">找到你需要的作品。</h2>
          </div>
          <p className="projects-intro">游戏工具、移动应用和 Mac 工具。<br className="projects-desktop-break" />从这里发现已经上线和即将上线的项目。</p>
        </header>

        <div className="projects-toolbar">
          <div className="projects-filters" role="group" aria-label="按作品分类筛选">
            {categories.map((item) => (
              <button key={item.value} type="button" aria-pressed={category === item.value} aria-controls="projects-list" onClick={() => { setCategory(item.value); resetLimit(); }}>
                {category === item.value && <motion.span className="projects-filter-indicator" layoutId="project-category-indicator" transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 440, damping: 34 }} aria-hidden="true" />}
                <span className="projects-filter-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="projects-results-bar">
          <p className="projects-count" role="status" aria-live="polite" aria-atomic="true">{results.length} 个作品{results.length > limit ? ` · 已展示 ${visibleProjects.length} 个` : ''}</p>
        </div>
        <div id="projects-list" className="projects-grid" key={category}>
          {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
        {limit < results.length && <div className="projects-more"><button type="button" onClick={() => setLimit((current) => current + PAGE_SIZE)}>查看更多作品 <span aria-hidden="true">↓</span></button></div>}
      </div>
    </section>
  );
}
