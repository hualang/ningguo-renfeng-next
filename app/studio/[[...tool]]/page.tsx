"use client";

import dynamic from "next/dynamic";

import config from "@/sanity.config";

/** 仅浏览器加载 Studio，避免 dev 下 vendor-chunks/@sanity.js 等路径解析异常 */
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false, loading: () => <p className="p-6 text-ink-muted">Loading Studio…</p> },
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
