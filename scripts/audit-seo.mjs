import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const DEFAULT_HOSTS = [
  'www.cduyzh.top',
  'apps.cduyzh.top',
  'hsr-archive.cduyzh.top',
  'hsr-trend.cduyzh.top',
  'hsr.cduyzh.top',
  'panda.cduyzh.top',
  'shijian.cduyzh.top',
];
const PRIVATE_PATH = /^\/(?:api|admin|me|submit|_releases|\.netlify|webhook|auth)(?:\/|$)/i;
const STATIC_ASSET = /\.(?:png|jpe?g|webp|gif|svg|ico|css|js|mjs|json|xml|txt|md|zip|dmg|woff2?|ttf|mp4|webm|pdf)$/i;
const XML_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const concurrency = 5;

function argumentValue(name, fallback) {
  const position = process.argv.indexOf(name);
  return position >= 0 ? process.argv[position + 1] : fallback;
}

const hosts = argumentValue('--hosts', DEFAULT_HOSTS.join(',')).split(',').map((host) => host.trim()).filter(Boolean);
const outputDirectory = path.resolve(argumentValue('--out', 'docs/audits/latest'));
const pageLimit = Number(argumentValue('--max-pages', '600'));
const allowedHosts = new Set(hosts);

for (const host of hosts) assert.match(host, /^[a-z0-9.-]+$/i, `Invalid host: ${host}`);
assert.ok(Number.isInteger(pageLimit) && pageLimit > 0 && pageLimit <= 2000);

function decodeEntities(value = '') {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code[0] === '#') {
      const codePoint = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
    }
    return named[code.toLowerCase()] ?? entity;
  });
}

function normalizeUrl(value, baseUrl) {
  try {
    const url = new URL(decodeEntities(value), baseUrl);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    url.hash = '';
    url.hostname = url.hostname.toLowerCase();
    return url.href;
  } catch {
    return null;
  }
}

function publicPageUrl(value, baseUrl) {
    const normalized = normalizeUrl(value, baseUrl);
    if (!normalized) return null;
    const url = new URL(normalized);
    if (!allowedHosts.has(url.hostname) || PRIVATE_PATH.test(url.pathname) || STATIC_ASSET.test(url.pathname)) return null;
    url.search = '';
    return url.href;
}

async function request(url, expectedKind = 'page') {
  const chain = [];
  let currentUrl = url;
  for (let redirectCount = 0; redirectCount <= 5; redirectCount += 1) {
    try {
      const response = await fetch(currentUrl, {
        redirect: 'manual',
        signal: AbortSignal.timeout(25000),
        headers: { 'User-Agent': 'cduyzh-SEOAudit/1.0', Accept: expectedKind === 'page' ? 'text/html,*/*' : '*/*' },
      });
      const location = response.headers.get('location');
      chain.push({ url: currentUrl, status: response.status });
      if ([301, 302, 303, 307, 308].includes(response.status) && location) {
        const nextUrl = normalizeUrl(location, currentUrl);
        if (!nextUrl || chain.some((entry) => entry.url === nextUrl)) {
          return { url, finalUrl: currentUrl, status: response.status, chain, contentType: '', body: '', error: 'redirect-loop-or-invalid-location' };
        }
        currentUrl = nextUrl;
        continue;
      }
      const body = await response.text();
      return {
        url,
        finalUrl: currentUrl,
        status: response.status,
        chain,
        contentType: response.headers.get('content-type') ?? '',
        body,
        bytes: Buffer.byteLength(body),
      };
    } catch (error) {
      if (redirectCount === 0 && chain.length === 0) {
        chain.push({ url: currentUrl, status: 0 });
        continue;
      }
      return { url, finalUrl: currentUrl, status: 0, chain, contentType: '', body: '', error: error.message };
    }
  }
  return { url, finalUrl: currentUrl, status: 0, chain, contentType: '', body: '', error: 'too-many-redirects' };
}

function attribute(tag, name) {
  const expression = new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const match = tag.match(expression);
  return decodeEntities(match?.[1] ?? match?.[2] ?? match?.[3] ?? '').trim();
}

function metaContent(html, name, property = false) {
  const key = property ? 'property' : 'name';
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (attribute(match[0], key).toLowerCase() === name.toLowerCase()) return attribute(match[0], 'content');
  }
  return '';
}

function stripHtml(html) {
  return decodeEntities(html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<template\b[\s\S]*?<\/template>/gi, ' ')
    .replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function schemaTypes(value, result = []) {
  if (Array.isArray(value)) {
    for (const item of value) schemaTypes(item, result);
  } else if (value && typeof value === 'object') {
    const type = value['@type'];
    if (type) result.push(...(Array.isArray(type) ? type : [type]));
    for (const child of Object.values(value)) {
      if (child && typeof child === 'object') schemaTypes(child, result);
    }
  }
  return result;
}

function inspectHtml(response) {
  const html = response.body;
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html;
  const title = stripHtml(head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const description = metaContent(head, 'description');
  const keywords = metaContent(head, 'keywords');
  const canonicalRaw = [...head.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => attribute(tag, 'rel').toLowerCase() === 'canonical')
    .map((tag) => attribute(tag, 'href'));
  const alternates = [...head.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => attribute(tag, 'rel').toLowerCase() === 'alternate' && attribute(tag, 'hreflang'))
    .map((tag) => ({ lang: attribute(tag, 'hreflang'), url: normalizeUrl(attribute(tag, 'href'), response.finalUrl) }));
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripHtml(match[1]));
  const htmlLang = attribute(html.match(/<html\b[^>]*>/i)?.[0] ?? '', 'lang');
  const robots = metaContent(head, 'robots');
  const jsonLd = [];
  const schemaErrors = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      jsonLd.push(JSON.parse(match[1]));
    } catch (error) {
      schemaErrors.push(error.message);
    }
  }
  const visibleText = stripHtml(html);
  const cjkCharacters = (visibleText.match(/[\u3400-\u9fff]/g) ?? []).length;
  const latinWords = (visibleText.match(/[A-Za-z][A-Za-z0-9'’-]*/g) ?? []).length;
  const keywordText = `${title} ${description} ${headings.join(' ')} ${keywords}`;
  const hiddenSeo = /seo-prerender-container[\s\S]{0,800}(?:opacity:\s*0|clip:\s*rect\(0,\s*0,\s*0,\s*0\))/i.test(html)
    && /id=["']seo-static-content["']/i.test(html);
  const links = [...html.matchAll(/<a\b[^>]*>/gi)]
    .map((match) => publicPageUrl(attribute(match[0], 'href'), response.finalUrl))
    .filter(Boolean);
  const canonical = canonicalRaw.length === 1 ? normalizeUrl(canonicalRaw[0], response.finalUrl) : null;
  const issues = [];
  const addIssue = (severity, code, message) => issues.push({ severity, code, message });
  const softNotFound = /\.txt|\.xml|\.md/i.test(new URL(response.url).pathname) && /html/i.test(response.contentType);

  if (response.status !== 200) addIssue('error', 'http-status', `Expected HTTP 200, received ${response.status || 'network failure'}.`);
  if (softNotFound) addIssue('error', 'soft-404', 'A discovery-file URL returned the HTML application shell.');
  if (!softNotFound && response.status === 200) {
    if (!title) addIssue('error', 'missing-title', 'The initial HTML has no title.');
    if (!description) addIssue('error', 'missing-description', 'The initial HTML has no meta description.');
    if (canonicalRaw.length !== 1 || !canonical) addIssue('error', 'canonical-count', `Expected one valid canonical, found ${canonicalRaw.length}.`);
    if (canonical && canonical !== response.finalUrl) addIssue('error', 'canonical-mismatch', `Canonical ${canonical} differs from final URL ${response.finalUrl}.`);
    if (headings.length !== 1) addIssue('error', 'h1-count', `Expected one H1, found ${headings.length}.`);
    if (/\bnoindex\b/i.test(robots)) addIssue('error', 'noindex', `Robots directive is "${robots}".`);
    if (!htmlLang) addIssue('error', 'missing-lang', 'The html element has no lang attribute.');
    if (schemaErrors.length) addIssue('error', 'invalid-json-ld', schemaErrors.join('; '));
    if (hiddenSeo) addIssue('error', 'hidden-seo-content', 'Prerendered SEO content is visually clipped or transparent.');
    if (visibleText.length < 300) addIssue('warning', 'thin-initial-html', `Only ${visibleText.length} characters are readable without JavaScript.`);
    if (description && (description.length < 60 || description.length > 180)) addIssue('warning', 'description-length', `Description length is ${description.length}.`);
    if (title && title.length > 70) addIssue('warning', 'long-title', `Title length is ${title.length}.`);
    if (!keywords) addIssue('warning', 'missing-keywords', 'No explicit keywords; confirm topic coverage in visible copy instead.');
    if (!jsonLd.length) addIssue('warning', 'missing-json-ld', 'No JSON-LD structured data.');
    for (const field of ['og:title', 'og:description', 'og:url', 'og:image']) {
      if (!metaContent(head, field, true)) addIssue('warning', 'missing-open-graph', `Missing ${field}.`);
    }
    if (!metaContent(head, 'twitter:card')) addIssue('warning', 'missing-twitter-card', 'Missing twitter:card.');
    if (/^zh/i.test(htmlLang) && cjkCharacters < 15) addIssue('error', 'language-content-mismatch', 'A Chinese page has almost no Chinese body content.');
    if (/^en/i.test(htmlLang) && latinWords < 40) addIssue('error', 'language-content-mismatch', 'An English page has almost no English body content.');
  }

  return {
    ...response,
    body: undefined,
    title,
    description,
    keywords,
    canonical,
    canonicalCount: canonicalRaw.length,
    htmlLang,
    robots,
    h1: headings,
    alternates,
    openGraph: Object.fromEntries(['og:title', 'og:description', 'og:url', 'og:image', 'og:locale'].map((field) => [field, metaContent(head, field, true)])),
    twitterCard: metaContent(head, 'twitter:card'),
    schemaTypes: [...new Set(jsonLd.flatMap((entry) => schemaTypes(entry)))],
    schemaErrors,
    visibleTextLength: visibleText.length,
    contentHash: createHash('sha256').update(visibleText).digest('hex'),
    cjkCharacters,
    latinWords,
    keywordLanguages: {
      zh: /[\u3400-\u9fff]/.test(keywordText),
      en: /[A-Za-z]{3}/.test(keywordText),
    },
    links: [...new Set(links)],
    issues,
  };
}

async function mapWithConcurrency(values, worker) {
  const results = [];
  let cursor = 0;
  async function runWorker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(values[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, runWorker));
  return results;
}

function sitemapUrls(body) {
  return [...body.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)].map((match) => normalizeUrl(match[1])).filter(Boolean);
}

async function discoverHost(host) {
  const origin = `https://${host}`;
  const robotsResponse = await request(`${origin}/robots.txt`, 'discovery');
  const robotsHtml = /html/i.test(robotsResponse.contentType);
  const sitemapSeeds = robotsHtml ? [] : [...robotsResponse.body.matchAll(/^Sitemap:\s*(\S+)/gim)].map((match) => normalizeUrl(match[1], origin)).filter(Boolean);
  if (!sitemapSeeds.length) sitemapSeeds.push(`${origin}/sitemap.xml`);
  const sitemaps = [];
  const pageUrls = new Set([`${origin}/`]);
  const visited = new Set();
  const queue = sitemapSeeds.map((url) => ({ url, depth: 0 }));
  while (queue.length) {
    const { url, depth } = queue.shift();
    if (visited.has(url) || depth > 3) continue;
    visited.add(url);
    const response = await request(url, 'discovery');
    const isHtml = /html/i.test(response.contentType);
    const isIndex = /<sitemapindex\b/i.test(response.body);
    const isUrlset = /<urlset\b/i.test(response.body);
    const locations = isHtml ? [] : sitemapUrls(response.body);
    const issues = [];
    if (response.status !== 200 || isHtml || (!isIndex && !isUrlset)) issues.push('missing-or-invalid-sitemap');
    if (!response.body.includes(XML_NAMESPACE)) issues.push('missing-sitemap-namespace');
    if (isUrlset && locations.some((location) => new URL(location).hostname !== new URL(url).hostname)) issues.push('cross-host-urlset');
    sitemaps.push({ url: response.url, finalUrl: response.finalUrl, status: response.status, contentType: response.contentType, kind: isIndex ? 'index' : isUrlset ? 'urlset' : 'invalid', urlCount: locations.length, issues });
    for (const location of locations) {
      if (isIndex) queue.push({ url: location, depth: depth + 1 });
      else {
        const pageUrl = publicPageUrl(location, url);
        if (pageUrl) pageUrls.add(pageUrl);
      }
    }
  }
  const llms = [];
  for (const filename of ['llms.txt', 'llms-full.txt']) {
    const response = await request(`${origin}/${filename}`, 'discovery');
    const valid = response.status === 200 && !/html/i.test(response.contentType) && /^#\s+.+/m.test(response.body);
    llms.push({ url: `${origin}/${filename}`, status: response.status, contentType: response.contentType, valid, bytes: response.bytes });
  }
  return {
    host,
    robots: { url: `${origin}/robots.txt`, status: robotsResponse.status, contentType: robotsResponse.contentType, valid: robotsResponse.status === 200 && !robotsHtml, sitemapSeeds },
    sitemaps,
    llms,
    pageUrls: [...pageUrls],
  };
}

const discovery = await mapWithConcurrency(hosts, discoverHost);
const pending = [...new Set(discovery.flatMap((entry) => entry.pageUrls))];
const queued = new Set(pending);
const pages = [];
while (pending.length && pages.length < pageLimit) {
  const batch = pending.splice(0, Math.min(concurrency, pageLimit - pages.length));
  const inspected = await mapWithConcurrency(batch, async (url) => inspectHtml(await request(url)));
  pages.push(...inspected);
  for (const page of inspected) {
    for (const link of page.links) {
      if (!queued.has(link) && new URL(link).hostname === new URL(page.finalUrl).hostname) {
        queued.add(link);
        pending.push(link);
      }
    }
    for (const alternate of page.alternates) {
      const alternateUrl = alternate.url ? publicPageUrl(alternate.url, page.finalUrl) : null;
      if (alternateUrl && !queued.has(alternateUrl)) {
        queued.add(alternateUrl);
        pending.push(alternateUrl);
      }
    }
  }
  process.stdout.write(`Audited ${pages.length} pages; ${pending.length} queued\n`);
}

const byUrl = new Map(pages.map((page) => [page.finalUrl, page]));
const byContent = new Map();
for (const page of pages) {
  if (page.status !== 200 || page.visibleTextLength < 300) continue;
  const duplicates = byContent.get(page.contentHash) ?? [];
  duplicates.push(page.finalUrl);
  byContent.set(page.contentHash, duplicates);
}
for (const page of pages) {
  for (const alternate of page.alternates) {
    const target = alternate.url ? byUrl.get(alternate.url) : null;
    if (!target && alternate.url && allowedHosts.has(new URL(alternate.url).hostname)) {
      page.issues.push({ severity: 'warning', code: 'hreflang-target-unchecked', message: `${alternate.lang}: ${alternate.url} was not crawled.` });
    } else if (target && !target.alternates.some((entry) => entry.url === page.canonical || entry.url === page.finalUrl)) {
      page.issues.push({ severity: 'error', code: 'hreflang-not-reciprocal', message: `${alternate.url} does not link back to this page.` });
    }
  }
  if ((byContent.get(page.contentHash) ?? []).length > 1) {
    page.issues.push({ severity: 'warning', code: 'duplicate-initial-content', message: `Same initial text as ${byContent.get(page.contentHash).filter((url) => url !== page.finalUrl).join(', ')}.` });
  }
}

const hostSummaries = hosts.map((host) => {
  const hostPages = pages.filter((page) => new URL(page.finalUrl).hostname === host);
  const hostDiscovery = discovery.find((entry) => entry.host === host);
  return {
    host,
    pages: hostPages.length,
    passed: hostPages.filter((page) => !page.issues.some((issue) => issue.severity === 'error')).length,
    errors: hostPages.reduce((count, page) => count + page.issues.filter((issue) => issue.severity === 'error').length, 0),
    warnings: hostPages.reduce((count, page) => count + page.issues.filter((issue) => issue.severity === 'warning').length, 0),
    zhPages: hostPages.filter((page) => /^zh/i.test(page.htmlLang)).length,
    enPages: hostPages.filter((page) => /^en/i.test(page.htmlLang)).length,
    robotsValid: hostDiscovery.robots.valid,
    sitemapValid: hostDiscovery.sitemaps.length > 0 && hostDiscovery.sitemaps.every((entry) => entry.issues.length === 0),
    llmsValid: hostDiscovery.llms.find((entry) => entry.url.endsWith('/llms.txt'))?.valid ?? false,
    llmsFullValid: hostDiscovery.llms.find((entry) => entry.url.endsWith('/llms-full.txt'))?.valid ?? false,
  };
});
const issueCounts = {};
for (const page of pages) {
  for (const issue of page.issues) issueCounts[issue.code] = (issueCounts[issue.code] ?? 0) + 1;
}
const report = {
  generatedAt: new Date().toISOString(),
  scope: hosts,
  pageLimit,
  uncrawledQueue: pending,
  summary: {
    pages: pages.length,
    passed: pages.filter((page) => !page.issues.some((issue) => issue.severity === 'error')).length,
    errors: pages.reduce((count, page) => count + page.issues.filter((issue) => issue.severity === 'error').length, 0),
    warnings: pages.reduce((count, page) => count + page.issues.filter((issue) => issue.severity === 'warning').length, 0),
    issueCounts,
    hostSummaries,
  },
  discovery,
  pages: pages.map((page) => ({ ...page, links: undefined })),
};

const markdown = [
  '# cduyzh.top SEO / GEO 全站审计',
  '',
  `检测时间：${report.generatedAt}`,
  '',
  `范围：${hosts.join('、')}。仅公开内容页；排除管理、投稿凭证、API 与私有路径。`,
  '',
  `共检查 ${pages.length} 个页面，${report.summary.passed} 个无阻断错误；错误 ${report.summary.errors} 项，警告 ${report.summary.warnings} 项。`,
  '',
  '| 域名 | 页面 | 无阻断错误 | 中文页 | 英文页 | robots | sitemap | llms | llms-full |',
  '| --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- |',
  ...hostSummaries.map((entry) => `| ${entry.host} | ${entry.pages} | ${entry.passed} | ${entry.zhPages} | ${entry.enPages} | ${entry.robotsValid ? '通过' : '失败'} | ${entry.sitemapValid ? '通过' : '失败'} | ${entry.llmsValid ? '通过' : '缺失/无效'} | ${entry.llmsFullValid ? '通过' : '缺失/无效'} |`),
  '',
  '## 问题分布',
  '',
  ...Object.entries(issueCounts).sort((left, right) => right[1] - left[1]).map(([code, count]) => `- \`${code}\`: ${count}`),
  '',
  '## 逐页结果',
  '',
  '| URL | 语言 | HTTP | 标题 | 错误 | 警告 |',
  '| --- | --- | ---: | --- | --- | --- |',
  ...pages.map((page) => `| ${page.finalUrl} | ${page.htmlLang || '-'} | ${page.status} | ${(page.title || '-').replace(/\|/g, '\\|')} | ${page.issues.filter((issue) => issue.severity === 'error').map((issue) => issue.code).join(', ') || '-'} | ${page.issues.filter((issue) => issue.severity === 'warning').map((issue) => issue.code).join(', ') || '-'} |`),
  '',
  '## 判定边界',
  '',
  '- 这是原始 HTML、HTTP、sitemap、robots、JSON-LD 与双语覆盖的技术审计，不代表搜索排名、收录量或 AI 引用率。',
  '- meta keywords 不是 Google 排名信号；关键词是否有效以可见标题、描述、正文与用户意图为准。',
  '- llms.txt 是可选的机器可读发现约定，不是 Google AI Overviews / AI Mode 的必需文件或排名保证。',
  '- 未执行浏览器视觉验收；未查询 Search Console 收录报告或各 AI 平台的真实引用结果。',
  '',
].join('\n');

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(path.join(outputDirectory, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
writeFileSync(path.join(outputDirectory, 'report.md'), markdown);
console.log(JSON.stringify(report.summary, null, 2));
console.log(`Report written to ${outputDirectory}`);
if (process.argv.includes('--strict')) assert.equal(report.summary.errors, 0, 'SEO audit found blocking errors');
