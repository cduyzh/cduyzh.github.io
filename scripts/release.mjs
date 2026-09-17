#!/usr/bin/env node
/*
 * 本地发布 GitHub Release：构建 -> 打包 dist -> 创建 Release -> 回下载校验。
 *
 *   npm run release -- v0.4.0
 *   npm run release -- v0.4.0 --dry-run          # 全程空跑，不创建 Release
 *   npm run release -- v0.4.0 --notes ./n.md     # 自带说明文案
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const valueOf = (flag) => {
  const i = args.indexOf(flag);
  return i === -1 ? null : args[i + 1];
};
const tag = args.find((a) => !a.startsWith('--'));

const run = (cmd, cmdArgs = []) =>
  execFileSync(cmd, cmdArgs, { cwd: ROOT, encoding: 'utf8' }).trim();

const die = (msg, hint) => {
  console.error(`\n✗ ${msg}`);
  if (hint) console.error(`  ${hint}`);
  process.exit(1);
};

/* ---------- 前置检查 ---------- */

if (!tag) die('缺少版本号', '用法：npm run release -- v0.4.0 [--dry-run] [--notes 文件]');
if (!/^v\d+\.\d+\.\d+(-[\w.]+)?$/.test(tag)) die(`版本号格式不对：${tag}`, '需要形如 v0.4.0 或 v0.4.0-beta.1');

for (const [tool, hint] of [['gh', 'brew install gh && gh auth login'], ['zip', 'macOS 自带'], ['zipinfo', 'macOS 自带']]) {
  if (spawnSync(tool, ['--version'], { encoding: 'utf8' }).error) die(`找不到 ${tool}`, hint);
}

const repoSlug = (() => {
  const url = run('git', ['remote', 'get-url', 'origin']).replace(/\.git$/, '');
  const m = url.match(/[:/]([^/:]+\/[^/:]+)$/);
  if (!m) die(`无法从 remote 解析仓库：${url}`);
  return m[1];
})();

const head = run('git', ['rev-parse', 'HEAD']);
const shortHead = head.slice(0, 7);

const dirty = run('git', ['status', '--porcelain'])
  .split('\n')
  .filter((l) => l && !l.startsWith('??'));
if (dirty.length && !has('--allow-dirty')) {
  die('工作区有未提交改动', `Release 的产物必须对应已提交的版本。先提交，或确认无误后加 --allow-dirty\n  ${dirty.join('\n  ')}`);
}

/* 构建用的是工作区，tag 却指向远端提交：两者不一致就会发出一个对不上的包 */
const remoteMain = run('git', ['ls-remote', 'origin', 'refs/heads/main']).split(/\s+/)[0];
if (remoteMain !== head) {
  die('HEAD 还没推到远端', `远端 main=${remoteMain?.slice(0, 7)} 本地 HEAD=${shortHead}；先 git push origin main`);
}

if (run('git', ['tag', '-l', tag])) die(`${tag} 这个本地标签已存在`);
const existing = spawnSync('gh', ['release', 'view', tag, '--repo', repoSlug], { encoding: 'utf8' });
if (existing.status === 0) die(`${tag} 的 Release 已存在`, '换一个版本号，或 gh release delete ' + tag);

console.log(`发布 ${tag} <- ${repoSlug} @ ${shortHead}${has('--dry-run') ? '（dry-run）' : ''}\n`);

/* ---------- 构建 ---------- */

console.log('1/4 类型检查');
run('npx', ['tsc', '--noEmit']);

console.log('2/4 构建');
rmSync(join(ROOT, 'dist'), { recursive: true, force: true });
const buildOut = execFileSync('npx', ['vite', 'build'], { cwd: ROOT, encoding: 'utf8' });
const assets = [...buildOut.matchAll(/^(dist\/\S+\.(?:js|css))\s+([\d.,]+ kB)(?:\s+\| gzip:\s+([\d.,]+ kB))?$/gm)]
  .map(([, file, size, gzip]) => ({ file, size, gzip }));

console.log('3/4 打包');
const distFiles = run('find', ['dist', '-type', 'f']).split('\n').filter(Boolean);
if (!distFiles.includes('dist/index.html')) die('dist/index.html 不存在', '构建产物不完整，检查 vite 配置');

const work = mkdtempSync(join(tmpdir(), 'release-'));
const zipName = `${repoSlug.split('/')[1]}-dist-${shortHead}.zip`;
const zipPath = join(work, zipName);
execFileSync('zip', ['-r', '-X', zipPath, 'dist', '-x', '*.DS_Store'], { cwd: ROOT, stdio: 'ignore' });

/* 曾经因为多写了 -x '*.html' 打出一个没有入口页的包，这里逐项核对 */
const zipped = run('zipinfo', ['-1', zipPath]).split('\n').filter((l) => l && !l.endsWith('/'));
const missing = distFiles.filter((f) => !zipped.includes(f));
if (missing.length) die('压缩包缺文件', missing.join(', '));
if (!zipped.includes('dist/index.html')) die('压缩包里没有被 index.html');

/* ---------- 说明文案 ---------- */

const notesPath = valueOf('--notes');
const notes = notesPath
  ? readFileSync(notesPath, 'utf8')
  : [
      `构建产物：\`${repoSlug}\` 站点，源提交 \`${shortHead}\`。`,
      '',
      `- 工具链：Node ${process.version} / Vite ${run('npx', ['vite', '--version']).replace(/[^.\d]/g, '')}`,
      '- 命令：`tsc --noEmit` 通过后 `vite build`',
      `- 产物：${distFiles.length} 个文件`,
      '',
      '| 文件 | 体积 | gzip |',
      '| --- | --- | --- |',
      ...assets.map((a) => `| \`${a.file.replace('dist/assets/', '')}\` | ${a.size} | ${a.gzip ?? '-'} |`),
      '',
      '解压后 `dist/` 内的全部文件即为静态站点根目录内容，可直接部署。',
    ].join('\n');
const notesFile = join(work, 'notes.md');
writeFileSync(notesFile, notes + '\n');

/* ---------- 发布与校验 ---------- */

console.log('4/4 发布');
if (has('--dry-run')) {
  console.log(`\n[dry-run] 将执行：`);
  console.log(`  gh release create ${tag} --repo ${repoSlug} --target main \\`);
  console.log(`    --title "${repoSlug.split('/')[1]} ${tag}" --notes-file <临时文件> ${zipName}`);
  console.log(`\n[dry-run] 包内容（${zipped.length} 个文件）：\n  ${zipped.join('\n  ')}`);
  rmSync(work, { recursive: true, force: true });
  process.exit(0);
}

execFileSync('gh', ['release', 'create', tag, '--repo', repoSlug, '--target', 'main',
  '--title', `${repoSlug.split('/')[1]} ${tag}`, '--notes-file', notesFile, zipPath],
  { cwd: ROOT, stdio: 'inherit' });

/* 校验只认 gh release download：curl 直连 CDN 下载链接会被本机代理切断并返回 http=000 */
const back = join(work, 'verify');
execFileSync('gh', ['release', 'download', tag, '--repo', repoSlug, '--dir', back], { cwd: ROOT, stdio: 'inherit' });
const got = join(back, zipName);
if (!existsSync(got)) die('回下载没找到该资产', zipName);

const local = createHash('sha256').update(readFileSync(zipPath)).digest('hex');
const remote = createHash('sha256').update(readFileSync(got)).digest('hex');
if (local !== remote) die('本地与远端包 SHA-256 不一致', `local=${local.slice(0, 16)}… remote=${remote.slice(0, 16)}…`);

rmSync(work, { recursive: true, force: true });
console.log(`\n✓ ${tag} 已发布，资产 SHA-256 一致（${local.slice(0, 16)}…）`);
console.log(`  ${run('gh', ['release', 'view', tag, '--repo', repoSlug, '--json', 'url', '--jq', '.url'])}`);
