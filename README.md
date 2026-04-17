# 宁国人峰 · Next.js 演示站（方案 A 骨架）

由 `ningguo-renfeng-site/index-eos-style.html` 迁移的首页单页，静态资源位于 `public/assets/`（从原站复制）。

## 环境要求

- **Node.js ≥ 18.17**（Next.js 14 要求；本机若默认是 nvm 的 Node 16，请用 Homebrew 或其它方式切换到 Node 18+）

## 本地预览

```bash
cd ningguo-renfeng-next
export PATH="/opt/homebrew/bin:$PATH"   # 若需优先使用 Homebrew 的 node
npm run dev
```

浏览器打开 <http://localhost:3000>。

## 构建

```bash
npm run build
npm start
```

## 与静态站关系

- 原版 HTML：`../ningguo-renfeng-site/`
- 图片更新：可同步覆盖 `../ningguo-renfeng-site/assets` → 本目录 `public/assets/`

## 同步到 GitHub

需已安装 [GitHub CLI](https://cli.github.com/)（`brew install gh`）。

**第一次**：在本机登录（只需一次）：

```bash
gh auth login -h github.com
```

**之后**：在项目根目录执行：

```bash
./scripts/sync-to-github.sh
```

脚本会检测是否已配置 `origin`；若没有则创建 `ningguo-renfeng-next` 仓库并推送 `main`。自定义仓库名可设环境变量：`GITHUB_REPO_NAME=你的仓库名 ./scripts/sync-to-github.sh`。

> 说明：推送必须由已登录的账号完成，无法在无人值守环境下代替你完成 OAuth/Token 授权。
