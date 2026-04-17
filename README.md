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
