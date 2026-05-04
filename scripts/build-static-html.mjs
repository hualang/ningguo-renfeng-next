/**
 * 生成本仓库可离线分发的静态站（不含 /api/inquiry、不含 Sanity 拉取、不含 Studio）。
 * 产物：`out/` 目录；若在 PATH 中存在 `zip` 命令则额外生成 `renfeng-site-static.zip`
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mwPath = path.join(root, "middleware.ts");
const mwBak = path.join(root, "middleware.__omit_for_static_export.ts");
const studioPath = path.join(root, "app", "studio");
const studioBak = path.join(root, ".static-export-bak", "studio");

mkdirSync(path.join(root, ".static-export-bak"), { recursive: true });

let mwRenamed = false;
let studioRenamed = false;

try {
  if (existsSync(mwPath)) {
    renameSync(mwPath, mwBak);
    mwRenamed = true;
  }
  if (existsSync(studioPath)) {
    renameSync(studioPath, studioBak);
    studioRenamed = true;
  }

  const env = {
    ...process.env,
    STATIC_HTML_EXPORT: "1",
    NEXT_PUBLIC_STATIC_HTML_EXPORT: "true",
    /** 离线包 canonical 占位；可自行改成正式域名后再执行脚本 */
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  };

  const r = spawnSync("npx", ["next", "build"], { cwd: root, env, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);

  const readme = `# 离线静态包说明

由 \`npm run build:static-html\` 生成，仅用于预览版式与文案。

- **无**服务器询盘接口，联系请用站内「离线包」邮箱链接或电话联系。
- 建议在本地用静态服务器打开（避免浏览器对 \`file://\` 限制），例如在项目根执行：
  \`npx serve out\`
  再访问控制台里给出的地址。
- **中文首页**：\`/zh/index.html\`（或部署后访问路径 \`/zh/\`）；**英文**：\`/en/index.html\`（\`/en/\`）。
`;

  writeFileSync(path.join(root, "out", "README-STATIC.txt"), readme, "utf8");

  const zip = spawnSync("zip", ["-r", "-q", "-y", "renfeng-site-static.zip", "out"], {
    cwd: root,
    stdio: "inherit",
  });
  if (zip.status !== 0) {
    console.warn(
      "[build-static-html] 未检测到 zip 命令或未打包成功：请手动将 `out/` 文件夹压缩后发送。\n产物路径:",
      path.join(root, "out"),
    );
  } else {
    console.log(
      "[build-static-html] 完成：",
      path.join(root, "out"),
      "\nZIP:",
      path.join(root, "renfeng-site-static.zip"),
    );
  }
} finally {
  if (mwRenamed && existsSync(mwBak)) {
    renameSync(mwBak, mwPath);
  }
  if (studioRenamed && existsSync(studioBak)) {
    renameSync(studioBak, studioPath);
  }
}
