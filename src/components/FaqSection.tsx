import { useLanguage } from '../context/LanguageContext';
import { faqEntries } from '../data/faq';
import './chrome.css';

export default function FaqSection() {
  const { lang } = useLanguage();

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="section-shell">
        <header className="faq-header">
          <p className="eyebrow">{lang === 'zh' ? '常见问题' : 'FAQ'}</p>
          <h2 id="faq-heading">{lang === 'zh' ? '关于作品与使用方式' : 'About the projects and how they work'}</h2>
        </header>
        <div className="faq-list">
          {faqEntries.map((entry) => {
            const content = entry[lang];
            return (
              <details key={entry.id} className="faq-item">
                <summary>{content.question}</summary>
                <p>{content.answer}</p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
