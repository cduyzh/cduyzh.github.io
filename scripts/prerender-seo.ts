import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { zhProfile, zhProjects, zhUI } from '../src/data/i18n/zh';
import { enProfile, enProjects, enUI } from '../src/data/i18n/en';
import { faqEntries } from '../src/data/faq';
import { sitemapIndexEntries, networkSiteCatalog, canonicalHost } from '../src/data/discovery';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const distDir = path.resolve(__dirname, '../dist');
const distHtmlPath = path.resolve(distDir, 'index.html');
const distEnHtmlPath = path.resolve(distDir, 'en.html');
const distSitemapPath = path.resolve(distDir, 'sitemap.xml');
const distSitemapPagesPath = path.resolve(distDir, 'sitemap-pages.xml');
const distRobotsPath = path.resolve(distDir, 'robots.txt');
const distLlmsPath = path.resolve(distDir, 'llms.txt');
const distLlmsFullPath = path.resolve(distDir, 'llms-full.txt');

if (!fs.existsSync(distHtmlPath)) {
  console.error('⚠️ dist/index.html 不存在，请先执行 vite build。');
  process.exit(1);
}

// 1. 生成中文版 SEO 静态直出 HTML
let zhSeoHtml = `
<div id="seo-static-content" class="seo-prerender-container">
  <header>
    <h1>${zhProfile.name} - ${zhProfile.title}</h1>
    <p>${zhProfile.bio.paragraphs.join(' ')}</p>
    <p>常驻：${zhProfile.location} | 规范网址：<a href="https://${canonicalHost}/">https://${canonicalHost}/</a></p>
  </header>
  <main>
    <h2>公开作品集与独立项目</h2>
    <ul>
`;

zhProjects.forEach(project => {
  zhSeoHtml += `
      <li>
        <article>
          <h3>${project.title}</h3>
          <p><strong>项目概述：</strong>${project.summary}</p>
          <p><strong>详细介绍：</strong>${project.description}</p>
          <p><strong>技术栈：</strong>${(project.technologies || []).join(', ')}</p>
          <p><strong>标签：</strong>${(project.tags || []).join(', ')}</p>
          <p><strong>开发角色：</strong>${project.role || '独立开发'} (${project.year || '2026'})</p>
          ${project.demoUrl ? `<p><strong>体验地址：</strong><a href="${project.demoUrl}">${project.demoUrl}</a></p>` : ''}
        </article>
      </li>`;
});

zhSeoHtml += `
    </ul>
    <h2>常见问题与说明</h2>
    <dl>
`;

faqEntries.forEach(entry => {
  zhSeoHtml += `
      <dt><strong>${entry.zh.question}</strong></dt>
      <dd>${entry.zh.answer}</dd>
`;
});

zhSeoHtml += `
    </dl>
  </main>
</div>
`;

// 2. 生成英文版 SEO 静态直出 HTML
let enSeoHtml = `
<div id="seo-static-content" class="seo-prerender-container">
  <header>
    <h1>${enProfile.name} - ${enProfile.title}</h1>
    <p>${enProfile.bio.paragraphs.join(' ')}</p>
    <p>Location: ${enProfile.location} | Official Website: <a href="https://${canonicalHost}/en.html">https://${canonicalHost}/en.html</a></p>
  </header>
  <main>
    <h2>Featured Works & Indie Projects</h2>
    <ul>
`;

enProjects.forEach(project => {
  enSeoHtml += `
      <li>
        <article>
          <h3>${project.title}</h3>
          <p><strong>Summary: </strong>${project.summary}</p>
          <p><strong>Description: </strong>${project.description}</p>
          <p><strong>Tech Stack: </strong>${(project.technologies || []).join(', ')}</p>
          <p><strong>Tags: </strong>${(project.tags || []).join(', ')}</p>
          <p><strong>Role: </strong>${project.role || 'Solo Indie Maker'} (${project.year || '2026'})</p>
          ${project.demoUrl ? `<p><strong>Visit URL: </strong><a href="${project.demoUrl}">${project.demoUrl}</a></p>` : ''}
        </article>
      </li>`;
});

enSeoHtml += `
    </ul>
    <h2>Frequently Asked Questions</h2>
    <dl>
`;

faqEntries.forEach(entry => {
  enSeoHtml += `
      <dt><strong>${entry.en.question}</strong></dt>
      <dd>${entry.en.answer}</dd>
`;
});

enSeoHtml += `
    </dl>
  </main>
</div>
`;

// 读取 dist/index.html 基础模板
let baseHtml = fs.readFileSync(distHtmlPath, 'utf-8');

// ==================== A. 写入 dist/index.html (中文版) ====================
let zhHtml = baseHtml;
zhHtml = zhHtml.replace('<div id="root"></div>', `<div id="root">${zhSeoHtml}</div>`);

// 动态丰富中文 meta keywords
const zhProjectTitles = zhProjects.map(p => p.title).join(', ');
const zhProjectTags = Array.from(new Set(zhProjects.flatMap(p => p.tags || []))).join(', ');
const metaKeywordsRegex = /<meta\s+name="keywords"\s+content="([^"]*)"\s*\/>/;
const matchKw = zhHtml.match(metaKeywordsRegex);
if (matchKw) {
  const originalKeywords = matchKw[1];
  const newKeywords = `${originalKeywords}, ${zhProjectTitles}, ${zhProjectTags}`;
  const uniqueKeywords = Array.from(new Set(newKeywords.split(',').map(k => k.trim()))).join(', ');
  zhHtml = zhHtml.replace(matchKw[0], `<meta name="keywords" content="${uniqueKeywords}" />`);
}

fs.writeFileSync(distHtmlPath, zhHtml, 'utf-8');
console.log('✅ 成功更新 dist/index.html (中文版预渲染直出与 Meta 丰富)');

// ==================== B. 生成 dist/en.html (英文版) ====================
let enHtml = baseHtml;

// 1. 替换 html 标签
enHtml = enHtml.replace('<html lang="zh-CN">', '<html lang="en">');

// 2. 替换 Title
enHtml = enHtml.replace(/<title>.*?<\/title>/, `<title>${enUI.seo.title}</title>`);

// 3. 替换 Meta Description
enHtml = enHtml.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${enUI.seo.description}" />`);

// 4. 替换 Meta Keywords
const enProjectTitles = enProjects.map(p => p.title).join(', ');
const enProjectTags = Array.from(new Set(enProjects.flatMap(p => p.tags || []))).join(', ');
const allEnKeywords = Array.from(new Set(`${enUI.seo.keywords}, ${enProjectTitles}, ${enProjectTags}`.split(',').map(k => k.trim()))).join(', ');
enHtml = enHtml.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/, `<meta name="keywords" content="${allEnKeywords}" />`);

// 5. 替换 Geo Placename
enHtml = enHtml.replace(/<meta\s+name="geo\.placename"\s+content="[^"]*"\s*\/>/, `<meta name="geo.placename" content="Chengdu, China" />`);

// 6. 替换 Canonical
enHtml = enHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="https://www.cduyzh.top/en.html" />`);

// 7. 替换 OG 属性
enHtml = enHtml.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${enUI.seo.title}" />`);
enHtml = enHtml.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${enUI.seo.description}" />`);
enHtml = enHtml.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="https://www.cduyzh.top/en.html" />`);
enHtml = enHtml.replace(/<meta\s+property="og:locale"\s+content="[^"]*"\s*\/>/, `<meta property="og:locale" content="en_US" />`);
enHtml = enHtml.replace(/<meta\s+property="og:site_name"\s+content="[^"]*"\s*\/>/, `<meta property="og:site_name" content="CDUYZH Digital Studio" />`);

// 8. 替换 Twitter 属性
enHtml = enHtml.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${enUI.seo.title}" />`);
enHtml = enHtml.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${enUI.seo.description}" />`);

// 9. 替换全英文 Schema.org JSON-LD
const enJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.cduyzh.top/en.html#profilepage",
      "url": "https://www.cduyzh.top/en.html",
      "name": "CDUYZH - Indie Hacker & Creative Web Engineer Portfolio",
      "isPartOf": {
        "@id": "https://www.cduyzh.top/en.html#website"
      },
      "mainEntity": {
        "@id": "https://www.cduyzh.top/en.html#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.cduyzh.top/en.html#person",
      "name": "cduyzh",
      "alternateName": ["CDUYZH", "cduyzh"],
      "jobTitle": "Creative Web Engineer / Indie Maker",
      "url": "https://www.cduyzh.top/en.html",
      "image": "https://www.cduyzh.top/assets/avatar-cduyzh.png",
      "description": "Chengdu-based creative web engineer and indie developer specializing in web UI engineering, lightweight AI workflows, and daily utility products.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chengdu",
        "addressRegion": "Sichuan",
        "addressCountry": "CN"
      },
      "knowsAbout": [
        "React", "Vue", "TypeScript", "Tailwind CSS", "Three.js", "macOS Native Development", "Swift", "SwiftUI", "WeChat Mini Program", "AI Agents", "Frontend Engineering", "Indie Hacking"
      ],
      "sameAs": [
        "https://github.com/cduyzh"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.cduyzh.top/en.html#website",
      "url": "https://www.cduyzh.top/en.html",
      "name": "CDUYZH - Turning Ideas into Everyday Essentials",
      "description": "cduyzh's personal digital studio and public portfolio. Creative Web Engineering · AI Applications · Independent Products.",
      "inLanguage": "en",
      "publisher": {
        "@id": "https://www.cduyzh.top/en.html#person"
      },
      "hasPart": enProjects.map(p => ({
        "@type": p.category === 'mobile' ? "SoftwareApplication" : p.category === 'mac' ? "SoftwareApplication" : "WebApplication",
        "name": p.title,
        ...(p.demoUrl ? { "url": p.demoUrl } : {}),
        "applicationCategory": p.category === 'game' ? "GameApplication" : "UtilitiesApplication",
        "operatingSystem": p.category === 'mac' ? "macOS 14+" : p.category === 'mobile' ? "WeChat Mini Program" : "Web",
        "description": p.description,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }))
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.cduyzh.top/en.html#faq",
      "mainEntity": faqEntries.map(entry => ({
        "@type": "Question",
        "name": entry.en.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": entry.en.answer
        }
      }))
    }
  ]
};

enHtml = enHtml.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${JSON.stringify(enJsonLd, null, 2)}\n    </script>`);

// 10. 替换 initial-loader 提示语
enHtml = enHtml.replace('<div class="initial-loader-tip">做产品，也做一些有意思的东西</div>', '<div class="initial-loader-tip">Turning ideas into everyday essentials</div>');

// 10.5 替换 inline 检测脚本，强制首屏为英文
enHtml = enHtml.replace(
  /<script>\s*\(function\s*\(\)\s*\{[\s\S]*?window\.__INITIAL_LANG__[\s\S]*?<\/script>/,
  `<script>
      (function () {
        document.documentElement.lang = 'en';
        window.__INITIAL_LANG__ = 'en';
      })();
    </script>`
);

// 11. 注入全英文静态直出内容
enHtml = enHtml.replace('<div id="root"></div>', `<div id="root">${enSeoHtml}</div>`);

fs.writeFileSync(distEnHtmlPath, enHtml, 'utf-8');
console.log('✅ 成功生成 dist/en.html (全英文版静态直出、Meta 与 JSON-LD Schema)');

const today = new Date().toISOString().split('T')[0];

// ==================== C. 生成 sitemapindex 与 sitemap-pages.xml ====================
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexEntries.map(loc => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>
`;

const sitemapPagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.cduyzh.top/</loc>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://www.cduyzh.top/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://www.cduyzh.top/en.html" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.cduyzh.top/en.html" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.cduyzh.top/en.html</loc>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://www.cduyzh.top/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://www.cduyzh.top/en.html" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.cduyzh.top/en.html" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;

fs.writeFileSync(distSitemapPath, sitemapIndexXml.trim() + '\n', 'utf-8');
fs.writeFileSync(distSitemapPagesPath, sitemapPagesXml.trim() + '\n', 'utf-8');
fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapIndexXml.trim() + '\n', 'utf-8');
fs.writeFileSync(path.resolve(publicDir, 'sitemap-pages.xml'), sitemapPagesXml.trim() + '\n', 'utf-8');
console.log('✅ 成功生成 sitemap.xml (Sitemap Index) 与 sitemap-pages.xml (主站双语映射)');

// ==================== D. 生成 dist/robots.txt ====================
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.cduyzh.top/sitemap.xml
Sitemap: https://www.cduyzh.top/sitemap-pages.xml
`;

fs.writeFileSync(distRobotsPath, robotsTxt, 'utf-8');
fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
console.log('✅ 成功生成 robots.txt');

// ==================== E. 生成 llms.txt 与 llms-full.txt (GEO 语义发现文件) ====================
const llmsTxt = `# CDUYZH Digital Studio

> cduyzh is a creative developer and indie maker based in Chengdu, China (常驻四川成都). Specializing in modern web interface engineering, native macOS utilities, and lightweight AI workflows.

Official website: https://www.cduyzh.top/
English portal: https://www.cduyzh.top/en.html
Sitemap index: https://www.cduyzh.top/sitemap.xml
Full LLM documentation: https://www.cduyzh.top/llms-full.txt
GitHub: https://github.com/cduyzh

## Core Projects & Public URLs

- [iScreenshot (Mac)](https://apps.cduyzh.top/iScreenshot/): Native macOS menu-bar screenshot, scrolling long capture, color picker, and mockup framing studio.
- [极速截屏 iScreenshot 中文版](https://apps.cduyzh.top/iScreenshot/zh.html): 原生轻量 Mac 截图、长图滚动拼接、屏幕取色与样机美化。
- [iTrans (Mac)](https://apps.cduyzh.top/iTrans/): Native macOS menu-bar and selection translator powered directly by DeepSeek and Google with private local terminology memory.
- [极译 AI iTrans 中文版](https://apps.cduyzh.top/iTrans/zh.html): 原生 Mac 划词极速翻译软件，自带 DeepSeek API Key 官方直连，免订阅月租。
- [Cards Score 打牌记分](https://www.cduyzh.top/): Zero-setup WeChat mini program for poker, mahjong, and tabletop scorekeeping with offline support and automated settlements.
- [HSR Endgame Speedrun Archive](https://hsr-archive.cduyzh.top/): Verified endgame combat logs, zero-cycle clears, and low-cost team compositions for Honkai: Star Rail.
- [HSR Endgame HP Inflation Visualizer](https://hsr-trend.cduyzh.top/): Interactive telemetry dashboard tracking monster effective HP trends and numerical inflation.
- [HSR Action Lab 行动实验室](https://hsr.cduyzh.top/): Precision action value, speed breakpoints, action advance, and turn planning calculator for Honkai: Star Rail.
- [Panda Cycling Lab 熊猫骑行实验室](https://panda.cduyzh.top/): Standardized benchmark testing major AI models (GPT, Claude, Gemini, DeepSeek, Qwen) on native SVG vector animation.
- [Shijian 食间](https://shijian.cduyzh.top/): Local-first meal planning, seasonal recipe guidance, and grocery list organizer for two-person households.

## Geographic & Entity Context (GEO)

- Author: cduyzh (Chengdu, Sichuan, China / 中国四川成都)
- Primary Domains: Web frontend development, native macOS utilities (Swift / AppKit), WeChat Mini Programs, AI workflows & benchmarks.
- Languages Supported: Chinese (zh-CN) and English (en).
`;

let llmsFullTxt = `# CDUYZH Digital Studio — Complete LLM Knowledge Base

> Comprehensive machine-readable documentation of projects, technical architectures, and public endpoints by cduyzh (Chengdu, Sichuan, China).

Author: cduyzh
Location: Chengdu, Sichuan, China (中国四川成都)
Canonical URL: https://www.cduyzh.top/
English Portal: https://www.cduyzh.top/en.html
Sitemap Index: https://www.cduyzh.top/sitemap.xml
GitHub Profile: https://github.com/cduyzh

---

## 1. Network Sites & Endpoints

`;

networkSiteCatalog.forEach(site => {
  llmsFullTxt += `### ${site.zh.title} (${site.host})
- Host: https://${site.host}/
- Sitemap: ${site.sitemapUrl}
${site.llmsUrl ? `- LLM discovery: ${site.llmsUrl}\n` : ''}- Chinese Description: ${site.zh.description}
- English Description: ${site.en.description}
- Chinese Keywords: ${site.zh.keywords.join(', ')}
- English Keywords: ${site.en.keywords.join(', ')}
- Public URLs:
${site.pages.map(url => `  - ${url}`).join('\n')}

`;
});

llmsFullTxt += `---

## 2. Featured Projects Catalog

`;

zhProjects.forEach((p, idx) => {
  const en = enProjects.find(e => e.id === p.id) || enProjects[idx];
  llmsFullTxt += `### ${p.title} / ${en?.title || p.title}
- Category: ${p.category}
- Status: ${p.status} (${en?.status || 'Active'})
- Year: ${p.year}
- Role: ${p.role}
${p.demoUrl ? `- Demo / Live URL: ${p.demoUrl}\n` : ''}- Technologies: ${(p.technologies || []).join(', ')}
- Chinese Summary: ${p.summary}
- English Summary: ${en?.summary || ''}
- Chinese Highlights:
${(p.highlights || []).map(h => `  - ${h}`).join('\n')}

`;
});

llmsFullTxt += `---

## 3. Frequently Asked Questions (FAQ)

`;

faqEntries.forEach(entry => {
  llmsFullTxt += `### Q: ${entry.zh.question} / ${entry.en.question}
**中文回答**：${entry.zh.answer}

**English Answer**: ${entry.en.answer}

`;
});

fs.writeFileSync(distLlmsPath, llmsTxt, 'utf-8');
fs.writeFileSync(distLlmsFullPath, llmsFullTxt, 'utf-8');
fs.writeFileSync(path.resolve(publicDir, 'llms.txt'), llmsTxt, 'utf-8');
fs.writeFileSync(path.resolve(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
console.log('✅ 成功生成 llms.txt 与 llms-full.txt (GEO 知识库)');
