import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { profileData } from '../src/data/profile';
import { projectsData } from '../src/data/projects';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distHtmlPath = path.resolve(__dirname, '../dist/index.html');

// 提取所有项目数据用于 SEO 静态渲染
const publicProjects = projectsData.filter(p => p.visibility === 'public');
const projectTitles = publicProjects.map(p => p.title).join(', ');
const projectTags = Array.from(new Set(publicProjects.flatMap(p => p.tags || []))).join(', ');

// 构建 SEO 的隐藏直出 HTML
let seoHtml = `
<div id="seo-static-content" style="display:none;" aria-hidden="true" class="sr-only">
  <header>
    <h1>${profileData.name} - ${profileData.title}</h1>
    <p>${profileData.bio.paragraphs.join(' ')}</p>
  </header>
  <main>
    <h2>公开作品集与项目探索</h2>
    <ul>
`;

publicProjects.forEach(project => {
  seoHtml += `
      <li>
        <article>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <p>${project.description}</p>
          <p>技术栈: ${(project.technologies || []).join(', ')}</p>
          <p>标签: ${(project.tags || []).join(', ')}</p>
        </article>
      </li>`;
});

seoHtml += `
    </ul>
  </main>
</div>
`;

if (fs.existsSync(distHtmlPath)) {
  let html = fs.readFileSync(distHtmlPath, 'utf-8');
  
  // 注入静态 HTML 到 root 中
  html = html.replace('<div id="root"></div>', `<div id="root">${seoHtml}</div>`);
  
  // 动态丰富 meta keywords
  const metaKeywordsRegex = /<meta\s+name="keywords"\s+content="([^"]*)"\s*\/>/;
  const match = html.match(metaKeywordsRegex);
  if (match) {
    const originalKeywords = match[1];
    const newKeywords = `${originalKeywords}, ${projectTitles}, ${projectTags}`;
    // 去重
    const uniqueKeywords = Array.from(new Set(newKeywords.split(',').map(k => k.trim()))).join(', ');
    html = html.replace(match[0], `<meta name="keywords" content="${uniqueKeywords}" />`);
  }

  // 动态丰富 meta description
  const metaDescRegex = /<meta\s+name="description"\s+content="([^"]*)"\s*\/>/;
  const matchDesc = html.match(metaDescRegex);
  if (matchDesc) {
      const originalDesc = matchDesc[1];
      // 取前几个项目拼接
      const topProjects = publicProjects.slice(0, 3).map(p => p.title).join('、');
      const newDesc = `${originalDesc} 最新探索包括：${topProjects}等。`;
      html = html.replace(matchDesc[0], `<meta name="description" content="${newDesc}" />`);
  }

  fs.writeFileSync(distHtmlPath, html);
  console.log('✅ 成功将 SEO 静态内容及增强 Meta 注入到 dist/index.html');
} else {
  console.log('⚠️ dist/index.html 不存在，请先执行 vite build。');
}
