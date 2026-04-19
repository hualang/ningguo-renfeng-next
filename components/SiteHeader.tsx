import Image from "next/image";
import Link from "next/link";

import type { SiteDictionary } from "@/lib/i18n/copy/types";
import type { Locale } from "@/lib/i18n/config";

import { LocaleSwitcher } from "./LocaleSwitcher";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: SiteDictionary;
}) {
  const nav = [
    { href: "#capabilities", label: dict.header.nav.capabilities },
    { href: "#solutions", label: dict.header.nav.solutions },
    { href: "#factory", label: dict.header.nav.factory },
    { href: "#quality", label: dict.header.nav.quality },
    { href: "#products", label: dict.header.nav.products },
    { href: "#contact", label: dict.header.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href={`/${locale}#top`}
          className="flex items-center gap-3.5 text-inherit no-underline"
        >
          <Image
            src="/assets/hero/logo-mark.png"
            alt={dict.header.brand}
            width={120}
            height={44}
            className="h-11 w-auto object-contain"
          />
          <div className="flex flex-col gap-0.5">
            <strong className="text-[0.92rem] font-semibold tracking-wide">
              {dict.header.brand}
            </strong>
            <span className="text-[0.68rem] tracking-wide text-ink-muted">
              {dict.header.tagline}
            </span>
          </div>
        </Link>
        <nav
          className="hidden flex-wrap items-center gap-x-6 gap-y-1 md:flex"
          aria-label="Main"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b-2 border-transparent pb-1 text-[0.82rem] font-medium text-ink no-underline transition-colors hover:border-teal hover:text-teal-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} altLabel={dict.header.altLocaleLabel} />
        </div>
      </div>
    </header>
  );
}
