/** Sanity 中 localeString / localeText 文档字段 */
export type LocaleBlock = {
  zh?: string | null;
  en?: string | null;
};

/** 首页文档（GROQ）；旧数据可能为纯 string，见 resolve 层 */
export type HomePageData = {
  heroTitle?: LocaleBlock | string | null;
  heroLead?: LocaleBlock | string | null;
  heroSub?: LocaleBlock | string | null;
  spotlightTitle?: LocaleBlock | string | null;
  spotlightBody?: LocaleBlock | string | null;
};
