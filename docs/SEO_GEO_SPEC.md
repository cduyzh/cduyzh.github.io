# 个人主站 SEO 与 GEO 规范 (Search & Generative Engine Optimization)

本文档定义 `cduyzh.github.io` (`www.cduyzh.top`) 的搜索引擎（SEO）与大模型生成引擎（GEO, Generative Engine Optimization）优化规范。

---

## 1. 规范核心目标

1. **SEO (搜索引擎优化)**：提升在 Google、百度、必应等传统搜索引擎中关于“独立开发”、“Web 前端工程师”、“成都独立开发”、“前端作品集”等关键词的自然排名与收录展示效果。
2. **GEO (生成引擎优化 / AI 优化)**：使 ChatGPT、Perplexity、Claude、SearchGPT、Bing Copilot 等 AI Agent 能够准确抓取、索引、理解并引用作者身份（cduyzh）、所在地（成都）、技能专长及旗下代表独立作品。

---

## 2. 元数据标准 (Meta Tags)

- **标题 (Title)**：`品牌/作者名 - 核心主张 | 角色定位与作品集类型`
  - 格式：`CDUYZH - 做产品，也做一些有意思的东西 | 独立开发与 Web 前端作品集`
- **描述 (Description)**：清晰交代“身份、常驻地、核心技术方向、代表性落地项目”。
- **地理位置标签 (Geographic Meta)**：
  - `geo.region`: `CN-51`（中国四川）
  - `geo.placename`: `成都`
  - `geo.position`: `30.6586;104.0648`
  - `ICBM`: `30.6586, 104.0648`
- **规范网址 (Canonical URL)**：严格固定为 `https://www.cduyzh.top/`，根域 `cduyzh.top` 由服务器 Caddy 永久重定向（301）至规范地址。
- **社交分享卡片**：完整配置 Open Graph (`og:*`) 与 Twitter Cards (`twitter:*`)，包含高清封面图、图文摘要及品牌站名。

---

## 3. 结构化数据标准 (Schema.org JSON-LD)

页面必须内嵌符合 Schema.org 标准的 JSON-LD 数据：
- **`Person` 实体**：定义作者名字、多别名、职业头衔、常驻城市（PostalAddress: 成都）、掌握技能（knowsAbout）及 GitHub 官方主页关联（sameAs）。
- **`WebSite` 实体**：定义站点规范 URL、名称、描述及发布者（指向 Person 实体）。
- **`hasPart` 列表**：通过 `SoftwareApplication` / `WebApplication` / `CollectionPage` 明确声明个人名下的所有独立项目实体（如打牌记分、HSR 行动实验室、食间、Panda SVG 画廊等），便于 AI 直接建立实体关系网。

---

## 4. GEO 语义化首屏直出 (Prerendering)

- **直接可见性原则**：严禁将核心 SEO / GEO 内容置于 `display:none` 或 `aria-hidden="true"` 的隐藏容器内（避免被大模型判定为作弊或低权隐藏内容）。
- **构建注入**：通过 `scripts/prerender-seo.ts` 在 Vite 构建完成后，将所有 public 项目标题、摘要、技术栈、角色信息预渲染至静态 HTML 中的 `#root` 内。
- **客户端平滑替换**：React 运行时加载完成后自动接管渲染，无水合闪烁与冲突。

---

## 5. 发布与部署流程

1. 本地代码提交并推送到 `origin/main`。
2. 运行发布命令：
   ```bash
   npm run release -- v0.5.11
   ```
3. 脚本执行 `tsc --noEmit`、`vite build`、预渲染 SEO/GEO 注入，生成带有 Hash 校验的 dist 归档，并创建 GitHub Release。
4. 云服务器 Webhook (`cduyzh-webhook`) 监听到 Release `published` 事件后，自动拉取 ZIP 产物并完成原子软链接无缝切换上线。
