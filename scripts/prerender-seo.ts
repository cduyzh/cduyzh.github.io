import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { zhProfile, zhProjects, zhUI } from '../src/data/i18n/zh';
import { enProfile, enProjects, enUI } from '../src/data/i18n/en';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const distHtmlPath = path.resolve(distDir, 'index.html');
const distEnHtmlPath = path.resolve(distDir, 'en.html');
const distSitemapPath = path.resolve(distDir, 'sitemap.xml');
const distRobotsPath = path.resolve(distDir, 'robots.txt');

if (!fs.existsSync(distHtmlPath)) {
  console.error('⚠️ dist/index.html 不存在，请先执行 vite build。');
  process.exit(1);
}

// 1. 生成中文版 SEO 静态直出 HTML
let zhSeoHtml = `
<div id="seo-static-content" class="seo-prerender-container" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important; opacity: 0 !important; pointer-events: none !important;">
  <header>
    <h1>${zhProfile.name} - ${zhProfile.title}</h1>
    <p>${zhProfile.bio.paragraphs.join(' ')}</p>
    <p>常驻：${zhProfile.location} | 规范网址：<a href="https://${zhProfile.name.toLowerCase()}.top">https://www.cduyzh.top/</a></p>
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
  </main>
</div>
`;

// 2. 生成英文版 SEO 静态直出 HTML
let enSeoHtml = `
<div id="seo-static-content" class="seo-prerender-container" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important; opacity: 0 !important; pointer-events: none !important;">
  <header>
    <h1>${enProfile.name} - ${enProfile.title}</h1>
    <p>${enProfile.bio.paragraphs.join(' ')}</p>
    <p>Location: ${enProfile.location} | Official Website: <a href="https://www.cduyzh.top/en.html">https://www.cduyzh.top/en.html</a></p>
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
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the core features of iScreenshot for Mac?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "iScreenshot (Fast Screenshot) is a lightweight native macOS menu-bar utility featuring instant shortcuts, precise color picking, scrolling long screenshots, and beautiful gradient backgrounds with soft shadows."
          }
        },
        {
          "@type": "Question",
          "name": "How does iTrans AI provide privacy-first translation on macOS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "iTrans resides in the macOS menu bar and supports native side-by-side translation powered directly by DeepSeek and Google Translate, with zero cloud middleman and local terminology storage."
          }
        },
        {
          "@type": "Question",
          "name": "What does Cards Score WeChat Mini Program do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cards Score is a zero-setup scorekeeping assistant for poker, mahjong, and board games with real-time multi-player room sync, offline support, and automatic round settlements."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Honkai: Star Rail Endgame Speedrun Archive?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The HSR Archive (https://hsr-archive.cduyzh.top/) curates genuine endgame speedruns and zero-cycle clears across Memory of Chaos, Pure Fiction, and Apocalyptic Shadow, filterable by limited gold cost and team lineups."
          }
        }
      ]
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

// ==================== C. 生成 dist/sitemap.xml ====================
const today = new Date().toISOString().split('T')[0];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
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

fs.writeFileSync(distSitemapPath, sitemapXml.trim(), 'utf-8');
console.log('✅ 成功生成 dist/sitemap.xml (包含双语多语言 alternate 映射)');

// ==================== D. 生成 dist/robots.txt ====================
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.cduyzh.top/sitemap.xml
`;

fs.writeFileSync(distRobotsPath, robotsTxt, 'utf-8');
console.log('✅ 成功生成 dist/robots.txt');
