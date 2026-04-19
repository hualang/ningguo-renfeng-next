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

## Sanity CMS（可选）

1. 在 [Sanity 管理后台](https://www.sanity.io/manage) 创建项目，记下 **Project ID** 与 **Dataset**（常用 `production`）。
2. 复制环境变量：将 `.env.local.example` 复制为 `.env.local`，填入 `NEXT_PUBLIC_SANITY_PROJECT_ID` 等。
3. 在 Sanity 项目 **API → CORS origins** 中加入 `http://localhost:3000` 与生产域名（如 Vercel 预览/正式 URL），否则本地或线上 **Studio** 可能无法连上 API。
4. 本地启动后访问 <http://localhost:3000/studio>，登录 Sanity 账号，新建 **「首页」** 类型文档并填写 Hero / 焦点条字段；保存后首页对应区块会从 CMS 读取，未配置或未填写时仍使用页面内默认文案。

## 构建

```bash
npm run build
npm start
```

## 与静态站关系

- 原版 HTML：`../ningguo-renfeng-site/`
- 图片更新：可同步覆盖 `../ningguo-renfeng-site/assets` → 本目录 `public/assets/`

## 同步到 GitHub（`github-monorepo-init-push`）

需已安装 [GitHub CLI](https://cli.github.com/)（`brew install gh`）。远端约定见根目录 **`project.env`**（`GIT_REPO` / `GIT_BRANCH`）。

推荐脚本（创建仓库 + 推送 `main`，与 Cursor skill 一致）：

```bash
cd /path/to/ningguo-renfeng-next
./scripts/gh-monorepo-push.sh
```

**凭证（任选其一）**

1. **交互登录（一次）**：`gh auth login -h github.com`
2. **非交互 PAT**：`export GITHUB_TOKEN=ghp_你的令牌` 后运行脚本（Classic PAT 勾选 `repo`；**不要把 token 写进仓库或聊天记录**）
3. **仅 SSH 推送**：请先在 GitHub 网页创建**同名空仓库** `hualang/ningguo-renfeng-next`，再执行：

```bash
git remote add origin git@github.com:hualang/ningguo-renfeng-next.git
git push -u origin main
```

若 `~/.config/gh` 不可写，可先：`export GH_CONFIG_DIR="$PWD/../.gh-config"` 再运行 `gh`。

兼容旧脚本：`./scripts/sync-to-github.sh`（行为类似，仅创建逻辑略简）。
