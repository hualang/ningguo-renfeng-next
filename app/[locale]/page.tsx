import { notFound } from "next/navigation";

import { HomeContent } from "@/components/HomeContent";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { resolveHomeCms } from "@/lib/i18n/resolve-cms";
import { getHomePage } from "@/sanity/lib/home";

/** 首页 ISR，避免 force-dynamic 在部分环境下与样式 chunk 加载偶发冲突；CMS 更新后最多延迟该秒数可见 */
export const revalidate = 60;

type Props = {
  params: { locale: string };
};

export default async function LocaleHomePage({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const raw = await getHomePage();
  const cms = resolveHomeCms(raw, locale, dict.cmsFallback);

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <HomeContent locale={locale} dict={dict} cms={cms} />
    </>
  );
}
