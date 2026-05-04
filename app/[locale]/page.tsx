import { notFound } from "next/navigation";

import { HomeContent } from "@/components/HomeContent";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { resolveHomeCms } from "@/lib/i18n/resolve-cms";
import { getHomePage } from "@/sanity/lib/home";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** 离线静态包构建（npm run build:static-html）：与 output export 对齐，不写 ISR */
export const dynamic =
  process.env.STATIC_HTML_EXPORT === "1" ? "force-static" : undefined;

export const revalidate =
  process.env.STATIC_HTML_EXPORT === "1" ? undefined : 60;

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
