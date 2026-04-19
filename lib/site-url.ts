/**
 * 正式环境在 Vercel / .env.local 设置 NEXT_PUBLIC_SITE_URL（无尾斜杠），
 * 例如 https://www.example.com
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

/** Next.js metadataBase（用于 OG、canonical 等相对路径解析） */
export function getMetadataBase(): URL {
  const base = getSiteUrl();
  return new URL(`${base}/`);
}
