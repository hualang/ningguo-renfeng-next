# 部署到 Vercel（推荐）

## 为何选 Vercel

- Next.js 官方团队出品，**无需额外配置**即可构建与边缘部署。
- 自动 HTTPS、预览环境（每个 PR 一条预览链接）、与 GitHub 联动方便。
- 外贸站主要面向海外访问时，全球 CDN 体验较好。

**备选**：若你希望统一放在 Cloudflare 生态，可用 Cloudflare Pages，但 Next.js 全功能往往需要 `@cloudflare/next-on-pages` 等适配，上手比 Vercel 多几步。国内备案站点则考虑阿里云/腾讯云托管，与本项目「外贸」场景不同。

---

## 前置条件

1. 已安装 **Node ≥ 18**（本地开发用；Vercel 构建环境默认满足）。
2. 一个 **GitHub** 账号（或 GitLab / Bitbucket，Vercel 均支持）。

---

## 第一步：把本仓库推到 GitHub

本目录 `ningguo-renfeng-next` 已是独立 Git 仓库（`main` 分支）。

1. 在 GitHub 新建仓库（例如 `ningguo-renfeng-next`），**不要**勾选「用 README 初始化」（避免与本地冲突）。
2. 在终端执行（将 `YOUR_USER` 换成你的 GitHub 用户名）：

```bash
cd /path/to/ningguo-renfeng-next
git remote add origin https://github.com/YOUR_USER/ningguo-renfeng-next.git
git push -u origin main
```

若 GitHub 已启用 SSH：

```bash
git remote add origin git@github.com:YOUR_USER/ningguo-renfeng-next.git
git push -u origin main
```

---

## 第二步：登录 Vercel 并导入项目

1. 打开 <https://vercel.com> ，用 **GitHub 账号登录**（建议授权 Vercel 读取仓库）。
2. 点击 **Add New… → Project**。
3. **Import** 你刚推送的 `ningguo-renfeng-next` 仓库。
4. 配置保持默认即可：
   - **Framework Preset**：Next.js（应自动识别）
   - **Root Directory**：`.`（仓库根目录即 Next 项目根目录）
   - **Build Command**：`npm run build`（默认）
   - **Output Directory**：留空（Next 由 Vercel 处理）
5. 点击 **Deploy**。

首次部署约 1～3 分钟。成功后页面会给出 **`*.vercel.app`** 的预览域名。

---

## 第三步：绑定自己的域名（可选）

1. 在 Vercel 项目 → **Settings → Domains**。
2. 添加你的域名（如 `www.example.com`），按提示在域名 DNS 处添加 **CNAME** 或 **A 记录**。
3. 等待证书签发（通常几分钟内自动 HTTPS）。

---

## 常见问题

| 现象 | 处理 |
|------|------|
| 构建失败：Node 版本 | Vercel 项目 **Settings → General → Node.js Version** 选 `20.x` 或 `18.x`。 |
| 仓库在 monorepo 子目录 | 在 Import 时把 **Root Directory** 设为子目录（如 `ningguo-renfeng-next`）。 |
| 图片 404 | 确认 `public/assets` 已提交进 Git 并重新部署。 |

---

## 仅本地预览（不部署）

```bash
npm run dev
```

访问 <http://localhost:3000>。
