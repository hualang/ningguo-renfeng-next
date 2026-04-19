import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "zh" ? 1 : 0.9,
  }));
}
