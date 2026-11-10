import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BookHeart, Check, Copy, Github, Mail, MessageSquare, X } from 'lucide-react';
import { contactData, socialsData } from '../data/socials';
import { useLanguage } from '../context/LanguageContext';
import './chrome.css';

type CopyNotice = { kind: 'success' | 'error'; message: string };

function fallbackCopy(text: string) {
  const previousFocus = document.activeElement;
  const input = document.createElement('textarea');
  input.value = text;
  input.readOnly = true;
  input.tabIndex = -1;
  input.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
  document.body.appendChild(input);
  try {
    input.select();
    input.setSelectionRange(0, text.length);
    if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
  } finally {
    input.remove();
    if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
  }
}

function SocialIcon({ name }: { name?: string }) {
  switch (name) {
    case 'Github': return <Github size={22} aria-hidden="true" />;
    case 'Mail': return <Mail size={22} aria-hidden="true" />;
    case 'MessageSquare': return <MessageSquare size={22} aria-hidden="true" />;
    case 'BookHeart': return <BookHeart size={22} aria-hidden="true" />;
    default: return <ArrowUpRight size={22} aria-hidden="true" />;
  }
}

export default function ContactSection() {
  const { lang, ui } = useLanguage();
  const [notice, setNotice] = useState<CopyNotice | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(true);
  const copyRequest = useRef(0);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (noticeTimer.current !== null) clearTimeout(noticeTimer.current);
    };
  }, []);

  const handleCopy = async (text: string, label: string) => {
    const request = ++copyRequest.current;
    if (noticeTimer.current !== null) clearTimeout(noticeTimer.current);
    setNotice(null);
    setCopiedItem(null);
    try {
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(text);
      } catch {
        if (!mounted.current || request !== copyRequest.current) return;
        fallbackCopy(text);
      }
      if (!mounted.current || request !== copyRequest.current) return;
      setCopiedItem(label);
      setNotice({
        kind: 'success',
        message: lang === 'zh' ? `已复制${label}` : `Copied ${label} to clipboard`,
      });
      noticeTimer.current = setTimeout(() => {
        setCopiedItem(null);
        setNotice(null);
        noticeTimer.current = null;
      }, 3000);
    } catch {
      if (!mounted.current || request !== copyRequest.current) return;
      setNotice({
        kind: 'error',
        message: lang === 'zh' ? `复制失败，请手动复制：${text}` : `Failed to copy, please copy manually: ${text}`,
      });
    }
  };

  const emailLabel = lang === 'zh' ? '邮箱地址' : 'Email Address';

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="section-shell">
        <div className="contact-intro">
          <p className="eyebrow">{ui.contact.eyebrow}</p>
          <h2 id="contact-heading">
            {ui.contact.heading}<br />
            <span>{ui.contact.headingHighlight}</span>
          </h2>
          <p className="contact-description">{ui.contact.description}</p>
          <div className="contact-email-actions">
            <a href={`mailto:${contactData.email}`} className="button-primary contact-email-send">
              {ui.contact.sendEmail} <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="contact-email-copy"
              onClick={() => void handleCopy(contactData.email, emailLabel)}
              aria-label={`${ui.contact.copyEmailAria} ${contactData.email}`}
            >
              {contactData.email}
              {copiedItem === emailLabel ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div className="contact-channels" aria-label={ui.contact.channelsAria}>
          {socialsData.map((social) => {
            const label = social.name === 'Email' ? emailLabel : `${social.name}`;
            const content = (
              <>
                <span className="contact-channel-icon"><SocialIcon name={social.icon} /></span>
                <span className="contact-channel-content">
                  <span className="contact-channel-name">{social.name}</span>
                  <span className="contact-channel-handle">{social.handle}</span>
                </span>
                <span className="contact-channel-action">
                  {social.isCopyable ? (
                    copiedItem === label ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />
                  ) : <ArrowUpRight size={18} aria-hidden="true" />}
                </span>
              </>
            );

            return social.isCopyable ? (
              <button
                key={social.name}
                type="button"
                className="contact-channel"
                aria-label={`${ui.contact.copyEmailAria} ${social.name}: ${social.copyValue ?? social.handle ?? ''}`}
                disabled={!social.copyValue}
                onClick={() => social.copyValue && void handleCopy(social.copyValue, label)}
              >
                {content}
              </button>
            ) : (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="contact-channel">
                {content}
              </a>
            );
          })}
        </div>

        <p className="contact-availability"><span aria-hidden="true" />{ui.contact.availability}</p>
      </div>

      <div className="contact-live-status" aria-live="polite" aria-atomic="true">{notice?.message ?? ''}</div>
      {notice && (
        <div className={`contact-notice contact-notice-${notice.kind}`}>
          {notice.kind === 'success' && <Check size={17} aria-hidden="true" />}
          <span>{notice.message}</span>
          <button type="button" aria-label="Close notice" onClick={() => setNotice(null)}><X size={16} aria-hidden="true" /></button>
        </div>
      )}
    </section>
  );
}
