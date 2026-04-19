/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sanity Studio 依赖较多 ESM/子路径；不转译时易出现 vendor-chunks/@sanity.js 丢失、页面无样式等问题
  transpilePackages: [
    "next-sanity",
    "sanity",
    "@sanity/vision",
    "@sanity/ui",
    "@sanity/icons",
    "@sanity/util",
    "@sanity/client",
    "styled-components",
  ],
};

export default nextConfig;
