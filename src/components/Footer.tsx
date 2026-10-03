import { ArrowUp } from 'lucide-react';
import { profileData } from '../data/profile';
import './chrome.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="section-shell">
        <div className="footer-topline">
          <a href="#hero" className="footer-brand">{profileData.name}<span>把想法，变成日常。</span></a>
          <a href="#hero" className="footer-back-top">返回顶部 <ArrowUp size={14} aria-hidden="true" /></a>
        </div>
        <div className="footer-bottomline">
          <span>Copyright © {new Date().getFullYear()} {profileData.name}. 保留所有权利。</span>
          <div className="footer-meta">
            <a href={`https://${profileData.domain}`} target="_blank" rel="noopener noreferrer">{profileData.domain}</a>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">{profileData.beian}</a>
            <span>中国 · 成都</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
