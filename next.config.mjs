/** @type {import('next').NextConfig} */
const staticHtmlExport = process.env.STATIC_HTML_EXPORT === "1";

const nextConfig = {
  ...(staticHtmlExport
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
  // Sanity Studio 依赖较多 ESM/子路径；不转译时易出现 vendor-chunks/@sanity.js 丢失、页面无样式等问题
  // next-sanity / sanity / @sanity/client 见下方 serverComponentsExternalPackages，勿重复出现在 transpilePackages
  transpilePackages: [
    "@sanity/vision",
    "@sanity/ui",
    "@sanity/icons",
    "@sanity/util",
    "styled-components",
  ],
  experimental: {
    // Next 14：避免 RSC 服务端把 Sanity 打进错误 chunk（vendor-chunks/@sanity.js）
    serverComponentsExternalPackages: [
      "@sanity/client",
      "next-sanity",
      "sanity",
      "@sanity/image-url",
    ],
  },
};

export default nextConfig;
