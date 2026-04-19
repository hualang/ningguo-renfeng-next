"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n/config";

export function LocaleSwitcher({
  locale,
  altLabel,
}: {
  locale: Locale;
  altLabel: string;
}) {
  const pathname = usePathname();
  const other: Locale = locale === "zh" ? "en" : "zh";
  const stripped = pathname.replace(/^\/(zh|en)/, "") || "";
  const href = `/${other}${stripped}`;

  return (
    <Link
      href={href}
      hrefLang={other}
      className="rounded-full border border-line px-3 py-1.5 text-[0.75rem] font-medium text-teal-dark no-underline transition hover:bg-teal-soft"
    >
      {altLabel}
    </Link>
  );
}
