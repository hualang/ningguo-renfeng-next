import { getSiteUrl } from "@/lib/site-url";

/** 首页 Organization 结构化数据（JSON-LD） */
export function getOrganizationJsonLd(localePath: string): string {
  const base = getSiteUrl();
  const payload = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "宁国人峰机械零部件有限公司",
    alternateName: "Ningguo Renfeng Machinery Parts Co., Ltd.",
    url: `${base}/${localePath}`,
    logo: `${base}/assets/hero/logo-mark.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No.116, Xingning Road",
      addressLocality: "Ningguo City",
      addressRegion: "Anhui Province",
      addressCountry: "CN",
    },
  };
  return JSON.stringify(payload);
}
