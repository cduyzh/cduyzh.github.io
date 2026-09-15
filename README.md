# CDUYZH — 个人数字工作室与作品集

> **做产品，也做一些有意思的东西。**  
> 域名：[www.cduyzh.top](https://www.cduyzh.top)

基于 **Photography × Three.js × Typography** 设计理念打造的个人作品集与数字体验空间。采用暖米白、灰蓝与陶土橙配色，融合 WebGL 动态形体与平滑滚动体验。

---

## 🛠 技术栈

- **前端框架**：React 19, TypeScript
- **构建工具**：Vite 6
- **三维渲染**：Three.js（轻量级半透明流体材质着色器）
- **动效库**：Motion (Framer Motion)
- **平滑滚动**：Lenis Smooth Scroll
- **样式方案**：Tailwind CSS v4
- **图标系统**：Lucide React

---

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动本地开发服务 (默认端口 3000)
npm run dev

# 构建生产版本 (产物位于 dist/)
npm run build

# 本地预览构建产物
npm run preview
```

---

## 🌐 域名与 GitHub Pages 部署

本仓库根目录已包含 `public/CNAME` 文件，绑定域名为 **`www.cduyzh.top`**。同时配置了自动化 CI/CD 工作流 (`.github/workflows/deploy.yml`)。

### 开启 GitHub Pages 步骤：
1. 进入 GitHub 仓库页面，点击 **Settings** -> **Pages**；
2. 在 **Build and deployment** > **Source** 下拉菜单中选择 **GitHub Actions**；
3. 后续每当推送代码至 `main` 分支时，GitHub 将自动打包并发布至 `www.cduyzh.top`。

### DNS 解析配置：
- **记录类型**：`CNAME`
- **主机记录**：`www`
- **记录值**：`<你的 GitHub 用户名>.github.io`
