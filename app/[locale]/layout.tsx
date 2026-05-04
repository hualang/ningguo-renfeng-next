import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SyncHtmlLang } from "@/components/SyncHtmlLang";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getOrganizationJsonLd } from "@/lib/seo/organization-json-ld";
import { getSiteUrl } from "@/lib/site-url";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const d = getDictionary(params.locale);
  const base = getSiteUrl();
  const locale = params.locale;
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        "zh-CN": `${base}/zh`,
        en: `${base}/en`,
        "x-default": `${base}/zh`,
      },
    },
  };
}

export default function LocaleLayout({ children, params }: Props) {
  if (!isLocale(params.locale)) notFound();
  const jsonLd = getOrganizationJsonLd(params.locale);
  return (
    <>
      <SyncHtmlLang locale={params.locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {children}
    </>
  );
}
