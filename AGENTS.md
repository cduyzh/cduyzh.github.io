# 仓库协作约定

React 19 + Vite 6 + Tailwind CSS v4 + Three.js 的个人作品集站点（GitHub Pages 用户站点，绑定自定义域名）。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地开发，端口 3000，`--host=0.0.0.0` |
| `npm run build` | 生产构建到 `dist/` |
| `npm run preview` | 预览构建产物 |
| `npm run lint` | `tsc --noEmit` |
| `npm run release -- vX.Y.Z` | 见下方「发布项目」 |

`@google/genai`、`express`、`dotenv` 在 `src/` 下没有任何引用，不需要配 `.env` 也能跑。

## 「发布项目」触发词

用户在对话里说**发布项目 / 发 Release / 打包发布**时，执行：

```bash
npm run release -- vX.Y.Z
```

该脚本一条命令完成：类型检查 → 构建 → 打包 `dist/` → `gh release create` → 回下载资产比对 SHA-256。它只做发布，**不碰 git**。

版本号规则：用户没给就基于 `gh release list` 的最新 tag 递增 patch（`v0.3.0` → `v0.4.0`），执行前把版本号报给用户确认。

## 边界：git 由用户自己处理

- **不要**替用户 `git commit` 或 `git push` 代码改动。
- 发布脚本要求「工作区干净 + HEAD 已推到 `origin/main`」。任一不满足时**停下来报告原因**，把该做的提交列给用户，不要为了跑通而加 `--allow-dirty`，也不要自己提交。
- 唯一例外：用户当次明确要求提交或推送。

## 并行会话提醒

这个仓库会同时开多个会话改同一批文件。动 `git` 之前先 `git status --short`；发现不是自己写的改动，先报告归属再问怎么处理。按路径 `git add` 很容易把别人**在途**的 hunk 一起提交掉——提交后、推送前用临时 worktree 在纯 HEAD 上跑一次 `tsc --noEmit` 兜底。

## 文档门禁

**重大网站改动必须在同一轮里更新 `docs/wiki/`，只改代码不算完成，只写提交信息也不算过门禁。**

命中以下任一条即属重大改动：

- **视觉体系**：设计令牌、配色、分区遮罩与层级、字体与描边规则
- **Three.js 场景**：材质、形体构成、滚动关键帧、降级与性能策略
- **构建与体积**：代码分割、chunk 划分、依赖增减、包管理器与锁文件变更
- **发布链路**：`scripts/release.mjs`、workflow、Pages 配置
- **破坏性变更**：删除组件、改数据结构（如 `profileData` 字段）

不必写文档：文案微调、单处间距或颜色修正、typo、纯测试补充。

### 写入位置

| 改动类型 | 页面 |
| --- | --- |
| 发布流程与脚本行为 | `docs/wiki/01-发布流程.md` |
| 视觉系统与 3D 背景 | `docs/wiki/02-视觉系统.md` |
| 已知缺陷、待决事项 | `docs/wiki/03-已知缺陷.md` |
| 新增页面 | 建页并在 `docs/wiki/00-总览.md` 索引中挂载 |

### 四条硬规则

1. **数字必须实测后再写**。体积取 `npm run build` 输出，引用数取 `grep`，条目数取实际计数；推测值不写进文档。
2. **文档只描述已提交的状态**。工作区里未定的在途改动写进 `03-已知缺陷.md` 的待决条目，不混进正文叙述。
3. **跨页链接不带锚点**，只用文件名。改完跑一次自检：

   ```bash
   cd docs/wiki && for f in *.md; do grep -o '](\([0-9][0-9]-[^)]*\.md\))' "$f" | sed 's/](//;s/)//' | while read -r l; do [ -f "$l" ] || echo "BROKEN $f -> $l"; done; done
   ```

4. **交付时如实列出改了哪几页**，并说明哪些事实是实测得到的。
