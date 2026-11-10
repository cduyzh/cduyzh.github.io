import { ArrowUp } from 'lucide-react';
import { profileData } from '../data/profile';
import { useLanguage } from '../context/LanguageContext';
import './chrome.css';

export default function Footer() {
  const { ui } = useLanguage();

  return (
    <footer className="footer-section">
      <div className="section-shell">
        <div className="footer-topline">
          <a href="#hero" className="footer-brand">
            {profileData.name}
            <span>{ui.footer.tagline}</span>
          </a>
          <a href="#hero" className="footer-back-top">
            {ui.footer.backToTop} <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottomline">
          <span>Copyright © {new Date().getFullYear()} {profileData.name}. {ui.footer.rights}</span>
          <div className="footer-meta">
            <a href={`https://${profileData.domain}`} target="_blank" rel="noopener noreferrer">{profileData.domain}</a>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">{profileData.beian}</a>
            <span>{ui.footer.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
