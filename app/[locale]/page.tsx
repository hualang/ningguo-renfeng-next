import { notFound } from "next/navigation";

import { HomeContent } from "@/components/HomeContent";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { resolveHomeCms } from "@/lib/i18n/resolve-cms";
import { getHomePage } from "@/sanity/lib/home";

export const dynamic = "force-dynamic";

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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-teal focus:px-3 focus:py-2 focus:text-white"
      >
        {dict.skipToContent}
      </a>
      <SiteHeader locale={locale} dict={dict} />
      <HomeContent locale={locale} dict={dict} cms={cms} />
    </>
  );
}
