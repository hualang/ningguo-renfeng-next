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

## 环境变量（Vercel：Project → Settings → Environment Variables）

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | **建议配置**。正式站根地址（无尾斜杠），如 `https://www.example.com`。用于 sitemap、canonical、hreflang、Organization JSON-LD；不设则构建/本地默认 `http://localhost:3000`。 |
| `NEXT_PUBLIC_SANITY_*` | Sanity 站点内容，见仓库 `.env.local.example`。 |
| `RESEND_API_KEY` / `INQUIRY_TO_EMAIL` / `INQUIRY_FROM_EMAIL` | 询盘邮件（Resend）。 |
| `FEISHU_BITABLE_WEBHOOK_URL` | **可选**。飞书多维表格 Webhook 自动化地址；不填则只发邮件。 |

### 飞书多维表格对接（询盘第二落点）

1. 打开目标**多维表格**，按需新建列：`姓名`、`公司`、`邮箱`、`电话`、`国家`、`需求`、`语言`、`提交时间`（列名可自定）。
2. 右上角 **自动化** → **创建规则** → **触发条件** 选 **Webhook**（或「收到 Webhook 请求」类选项，以你当前飞书版本为准）→ 复制系统生成的 **请求 URL**。
3. **执行操作** 选 **新增记录**，把 **Webhook 请求体**里的字段映射到各列。请求体为 JSON，字段名固定为：`name`、`company`、`email`、`phone`、`country`、`message`、`locale`、`submittedAt`（ISO 时间字符串）。
4. 将 URL 写入 Vercel（或本地 `.env.local`）的 `FEISHU_BITABLE_WEBHOOK_URL`，重新部署。

邮件发送成功后会再 POST 到该地址；若飞书写入失败，用户仍看到提交成功，错误记在 **Vercel → Functions / 日志** 或本机终端。

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
