import type { HomePageData, LocaleBlock } from "@/types/sanity";

import type { Locale } from "./config";

/** 旧版 Sanity 纯 string 或新版 { zh, en } */
function normalizeBlock(
  v: LocaleBlock | string | null | undefined,
): LocaleBlock | null {
  if (v == null) return null;
  if (typeof v === "string") return { zh: v, en: null };
  return v;
}

/**
 * 取当前语言文案；空则回退另一语再回退 defaultStrings[locale]
 */
export function pickLocalized(
  v: LocaleBlock | string | null | undefined,
  locale: Locale,
  fallbackZh: string,
  fallbackEn: string,
): string {
  const b = normalizeBlock(v);
  const fall = locale === "en" ? fallbackEn : fallbackZh;
  if (!b) return fall;
  const primary = locale === "en" ? b.en : b.zh;
  const secondary = locale === "en" ? b.zh : b.en;
  const t = (primary ?? "").trim() || (secondary ?? "").trim();
  return t || fall;
}

export type ResolvedHomeCms = {
  heroTitle: string;
  heroLead: string;
  heroSub: string;
  spotlightTitle: string;
  spotlightBody: string;
};

export function resolveHomeCms(
  home: HomePageData | null,
  locale: Locale,
  fb: {
    heroTitle: { zh: string; en: string };
    heroLead: { zh: string; en: string };
    heroSub: { zh: string; en: string };
    spotlightTitle: { zh: string; en: string };
    spotlightBody: { zh: string; en: string };
  },
): ResolvedHomeCms {
  const h = home ?? {};
  return {
    heroTitle: pickLocalized(h.heroTitle, locale, fb.heroTitle.zh, fb.heroTitle.en),
    heroLead: pickLocalized(h.heroLead, locale, fb.heroLead.zh, fb.heroLead.en),
    heroSub: pickLocalized(h.heroSub, locale, fb.heroSub.zh, fb.heroSub.en),
    spotlightTitle: pickLocalized(
      h.spotlightTitle,
      locale,
      fb.spotlightTitle.zh,
      fb.spotlightTitle.en,
    ),
    spotlightBody: pickLocalized(
      h.spotlightBody,
      locale,
      fb.spotlightBody.zh,
      fb.spotlightBody.en,
    ),
  };
}
