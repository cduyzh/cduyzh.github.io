import { useEffect, useRef, useState, type Key } from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  key?: Key;
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const [showQrModal, setShowQrModal] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const projectUrl = project.demoUrl || project.repoUrl;
  const isLive = project.status === '已上线';

  useEffect(() => {
    if (!showQrModal || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [showQrModal]);

  return (
    <article
      id={`project-card-${project.slug}`}
      className={`projects-card${featured ? ' projects-card-featured' : ''}`}
      aria-labelledby={`project-title-${project.slug}`}
    >
      <div className="projects-cover">
        <img
          src={project.cover}
          alt={project.coverAlt || `${project.title}项目封面`}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
        />
        {!isLive && <span className="projects-cover-caption">概念与探索</span>}
      </div>

      <div className="projects-card-content">
        <div className="projects-meta">
          <span className={`projects-status${isLive ? ' projects-status-live' : ''}`}>
            <span aria-hidden="true" />{project.status}
          </span>
          <span>{project.year}</span>
        </div>
        <h3 id={`project-title-${project.slug}`}>{project.title}</h3>
        <p className="projects-summary">{project.summary}</p>
        {featured && project.highlights?.[0] && (
          <p className="projects-highlight">{project.highlights[0]}</p>
        )}

        <div className="projects-card-bottom">
          <p className="projects-tags" aria-label="项目类别">{project.tags.slice(0, 3).join(' / ')}</p>
          <div className="projects-card-action">
            {project.qrCode ? (
              <button type="button" className="text-link" onClick={() => setShowQrModal(true)} aria-haspopup="dialog">
                扫码体验 <span aria-hidden="true">↗</span>
              </button>
            ) : projectUrl ? (
              <a className="text-link" href={projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.demoUrl ? '访问' : '查看源码：'}${project.title}（新窗口打开）`}>
                {project.demoUrl ? '打开项目' : '查看源码'} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="projects-in-progress">{project.role}</span>
            )}
            <span className="projects-card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {showQrModal && project.qrCode && (
        <dialog
          ref={dialogRef}
          className="projects-qr-dialog"
          aria-labelledby={`qr-title-${project.slug}`}
          aria-describedby={`qr-description-${project.slug}`}
          onClose={() => setShowQrModal(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close();
          }}
          data-lenis-prevent
        >
          <div className="projects-qr-content">
            <button type="button" className="projects-qr-close" onClick={() => dialogRef.current?.close()} aria-label="关闭二维码">
              <span aria-hidden="true">×</span>
            </button>
            <p className="eyebrow">微信小程序</p>
            <h3 id={`qr-title-${project.slug}`}>{project.title}</h3>
            <p id={`qr-description-${project.slug}`}>打开微信，扫一扫，即可开始体验。</p>
            <img src={project.qrCode} alt={`${project.title}小程序二维码`} width={288} height={288} />
            <button type="button" className="button-primary" onClick={() => dialogRef.current?.close()}>完成</button>
          </div>
        </dialog>
      )}
    </article>
  );
}
