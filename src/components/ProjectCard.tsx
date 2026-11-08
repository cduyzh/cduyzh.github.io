import { useEffect, useRef, useState, type Key } from 'react';
import type { LocalizedProject } from '../types/i18n';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  key?: Key;
  project: LocalizedProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { ui, language } = useLanguage();
  const [showQrModal, setShowQrModal] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const projectUrl = project.demoUrl || project.repoUrl;
  const isLive = project.status === '已上线' || project.status === 'Live';

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

  const p = ui.projects;

  return (
    <article
      id={`project-card-${project.slug}`}
      className="projects-card"
      aria-labelledby={`project-title-${project.slug}`}
    >
      <div className={`projects-cover${project.category === 'mac' || project.slug === 'mac-translator' || project.slug === 'iscreenshot' ? ' projects-cover-icon' : ''}`}>
        <img
          src={project.cover}
          alt={project.coverAlt || `${project.title}`}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
        />
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

        <div className="projects-card-bottom">
          <p className="projects-tags" aria-label={language === 'zh' ? '项目标签' : 'Project tags'}>
            {project.tags.slice(0, 3).join(' / ')}
          </p>
          <div className="projects-card-action">
            {project.qrCode ? (
              <button type="button" className="text-link" onClick={() => setShowQrModal(true)} aria-haspopup="dialog">
                {p.scanQr} <span aria-hidden="true">↗</span>
              </button>
            ) : projectUrl ? (
              <a
                className="text-link"
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.demoUrl ? p.openProject : p.viewSource}: ${project.title}`}
              >
                {project.demoUrl ? p.openProject : p.viewSource} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="projects-in-progress">
                {project.status === '即将上线' || project.status === 'Coming Soon' ? p.comingSoon : p.inProgress}
              </span>
            )}
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
            <button
              type="button"
              className="projects-qr-close"
              onClick={() => dialogRef.current?.close()}
              aria-label={p.qrModalClose}
            >
              <span aria-hidden="true">×</span>
            </button>
            <p className="eyebrow">{p.qrModalEyebrow}</p>
            <h3 id={`qr-title-${project.slug}`}>{project.title}</h3>
            <p id={`qr-description-${project.slug}`}>{p.qrModalDesc}</p>
            <img src={project.qrCode} alt={`${project.title} QR code`} width={288} height={288} />
            <button type="button" className="button-primary" onClick={() => dialogRef.current?.close()}>
              {p.qrModalDone}
            </button>
          </div>
        </dialog>
      )}
    </article>
  );
}
