import Image from "next/image";
import Link from "next/link";

import { InquiryForm } from "@/components/InquiryForm";
import type { SiteDictionary } from "@/lib/i18n/copy/types";
import type { Locale } from "@/lib/i18n/config";
import type { ResolvedHomeCms } from "@/lib/i18n/resolve-cms";

/** 与「方案」区一致：头图 + 产品展示三张图 */
const HERO_GALLERY = [
  "/assets/categories/img-31.jpeg",
  "/assets/categories/img-29.jpeg",
  "/assets/categories/img-32.jpeg",
] as const;

/** 与 equipment captions 顺序一致 */
const EQUIPMENT_SRC: string[] = [
  "/assets/equipment/img-17.jpeg",
  "/assets/equipment/img-19.jpeg",
  "/assets/equipment/img-20.jpeg",
  "/assets/equipment/img-18.jpeg",
  "/assets/equipment/img-21.jpeg",
  "/assets/equipment/img-22.jpeg",
  "/assets/equipment/img-23.jpeg",
  "/assets/equipment/img-24.jpeg",
  "/assets/equipment/img-25.jpeg",
];

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mb-4 text-[1.75rem] font-semibold tracking-tight text-ink ${className}`}
    >
      {children}
    </h2>
  );
}

export function HomeContent({
  locale,
  dict,
  cms,
}: {
  locale: Locale;
  dict: SiteDictionary;
  cms: ResolvedHomeCms;
}) {
  const { heroTitle, heroLead, heroSub, spotlightTitle, spotlightBody } = cms;

  return (
    <main id="main">
      <section
        id="top"
        className="bg-gradient-to-b from-white to-surface px-6 pb-16 pt-14"
      >
        <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1fr_minmax(280px,46%)]">
          <div>
            <h1 className="mb-5 text-[clamp(2.1rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-tight text-ink">
              {heroTitle}
            </h1>
            <p className="mb-6 max-w-xl text-xl leading-snug text-ink-muted">
              {heroLead}
            </p>
            <p className="mb-8 max-w-2xl text-[0.95rem] leading-relaxed text-ink-muted">
              {heroSub}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[0.8rem] font-semibold text-white no-underline transition hover:bg-teal-dark bg-teal"
              >
                {dict.hero.contact}
              </a>
              <a
                href="https://www.renfengsp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded border border-line px-6 py-3.5 text-[0.8rem] font-semibold text-ink no-underline transition hover:border-teal hover:text-teal-dark"
              >
                {dict.hero.official}
              </a>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {HERO_GALLERY.map((src, i) => (
                <Link
                  key={src}
                  href="#products"
                  className="group relative block overflow-hidden rounded-lg border border-line shadow-md transition hover:border-teal/40 hover:shadow-lg"
                >
                  <Image
                    src={src}
                    alt={dict.hero.tileAlts[i] ?? ""}
                    width={400}
                    height={280}
                    className="aspect-[4/3] h-auto w-full object-cover transition group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 33vw, 18vw"
                    priority={i === 0}
                  />
                </Link>
              ))}
            </div>
            <p className="mt-3 text-center text-[0.72rem] text-ink-muted">
              {dict.hero.tileHint}
            </p>
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="bg-gradient-to-br from-teal-dark to-[#004a52] px-6 py-10 text-white"
      >
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="mb-3 text-[1.35rem] font-semibold">{spotlightTitle}</h2>
            <p className="max-w-2xl text-[0.95rem] leading-relaxed opacity-90">
              {spotlightBody}
            </p>
          </div>
          <a
            href="#quality"
            className="inline-flex shrink-0 items-center justify-center rounded bg-white px-6 py-3 text-[0.8rem] font-semibold text-teal-dark no-underline transition hover:bg-surface"
          >
            {dict.spotlight.ctaQuality}
          </a>
        </div>
      </section>

      <section id="pillars" className="mx-auto max-w-content px-6 py-16">
        <div className="mx-auto mb-11 max-w-xl text-center">
          <h2 className="mb-3 text-[clamp(1.65rem,3vw,2rem)] font-semibold tracking-tight text-ink">
            {dict.pillars.title}
          </h2>
          <p className="text-ink-muted">{dict.pillars.intro}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.pillars.cards.map((c) => (
            <article
              key={c.title}
              className="flex h-full flex-col rounded-lg border border-line bg-white p-6 transition hover:border-teal/35 hover:shadow-lg"
            >
              <h3 className="mb-2.5 text-[1.05rem] font-semibold text-ink">
                {c.title}
              </h3>
              <p className="mb-4 flex-1 text-[0.88rem] leading-relaxed text-ink-muted">
                {c.desc}
              </p>
              <a
                href={c.anchor}
                className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-teal-dark no-underline after:transition-transform after:content-['→'] hover:after:translate-x-1"
              >
                {c.link}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="solutions" className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-content">
          <div className="mx-auto mb-11 max-w-xl text-center">
            <h2 className="mb-3 text-[clamp(1.65rem,3vw,2rem)] font-semibold tracking-tight text-ink">
              {dict.solutions.title}
            </h2>
            <p className="text-ink-muted">{dict.solutions.intro}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {dict.solutions.items.map((item) => (
              <article
                key={item.title}
                className="flex flex-col overflow-hidden rounded-lg border border-line bg-white"
              >
                <div className="relative h-[200px] border-b border-line bg-teal-soft">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="mb-2.5 text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mb-5 flex-1 text-[0.92rem] leading-relaxed text-ink-muted">
                    {item.desc}
                  </p>
                  <a
                    href="#products"
                    className="mt-auto inline-flex w-fit rounded bg-teal-soft px-4 py-2 text-[0.78rem] font-semibold text-teal-dark no-underline hover:bg-teal/20"
                  >
                    {item.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-content px-6 pb-16">
        <SectionTitle>{dict.about.title}</SectionTitle>
        <div className="max-w-3xl space-y-4 text-ink-muted">
          {dict.about.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-content px-6">
          <h2 className="mb-6 text-[1.75rem] font-semibold text-ink">
            {dict.culture.title}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dict.culture.items.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-lg border border-line bg-white p-6"
              >
                <h3 className="mb-2.5 text-[1.05rem] font-semibold">{item.title}</h3>
                <p className="mb-4 flex-1 text-[0.88rem] text-ink-muted">{item.desc}</p>
                <a
                  href={item.href}
                  className="text-[0.78rem] font-semibold text-teal-dark no-underline"
                >
                  {item.more}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="factory" className="mx-auto max-w-content px-6 py-16">
        <SectionTitle className="mb-2">{dict.factory.title}</SectionTitle>
        <p className="mb-6 max-w-3xl text-ink-muted">{dict.factory.intro}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "slide11-11.jpeg",
            "slide11-12.jpeg",
            "slide11-13.jpeg",
            "slide11-14.jpeg",
            "slide11-15.jpeg",
            "slide11-16.jpeg",
          ].map((f, i) => (
            <figure
              key={f}
              className="m-0 overflow-hidden rounded-lg border border-line bg-white"
            >
              <div className="relative h-[190px]">
                <Image
                  src={`/assets/factory/${f}`}
                  alt={dict.factory.captions[i] ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <figcaption className="px-3 py-2.5 text-[0.72rem] text-ink-muted">
                {dict.factory.captions[i]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="equipment" className="mx-auto max-w-content px-6 pb-16">
        <SectionTitle>{dict.equipment.title}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EQUIPMENT_SRC.map((src, i) => (
            <figure
              key={src}
              className="m-0 overflow-hidden rounded-lg border border-line bg-white"
            >
              <div className="relative h-[190px]">
                <Image
                  src={src}
                  alt={dict.equipment.captions[i] ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <figcaption className="px-3 py-2.5 text-[0.72rem] text-ink-muted">
                {dict.equipment.captions[i]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="quality" className="mx-auto max-w-content px-6 pb-16">
        <SectionTitle>{dict.quality.title}</SectionTitle>
        <div className="mx-auto max-w-md">
          <figure className="m-0 rounded-lg border border-line bg-white p-2">
            <Image
              src="/assets/certs/image27.jpeg"
              alt={dict.quality.certAlt}
              width={400}
              height={300}
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section className="border-y border-line bg-white px-6 py-12 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-ink">{dict.midCta.title}</h2>
        <p className="mx-auto mb-6 max-w-lg text-ink-muted">{dict.midCta.desc}</p>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded bg-teal px-6 py-3.5 text-[0.8rem] font-semibold text-white no-underline transition hover:bg-teal-dark"
        >
          {dict.midCta.button}
        </a>
      </section>

      <section id="products" className="mx-auto max-w-content px-6 py-16">
        <SectionTitle className="mb-2">{dict.products.title}</SectionTitle>
        <h3 className="mb-4 text-lg font-semibold text-ink">
          {dict.products.showcaseTitle}
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {HERO_GALLERY.map((src, i) => (
            <figure
              key={src}
              className="m-0 overflow-hidden rounded-lg border border-line bg-white"
            >
              <div className="relative h-[220px]">
                <Image
                  src={src}
                  alt={dict.products.categories[i] ?? ""}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
              <figcaption className="px-3 py-2.5 text-center text-[0.85rem] font-medium text-ink">
                {dict.products.categories[i]}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mb-6 mt-10 max-w-3xl text-[0.95rem] leading-relaxed text-ink-muted">
          {dict.products.industriesOneLine}
        </p>
      </section>

      <section id="customers" className="mx-auto max-w-content px-6 pb-16">
        <SectionTitle className="mb-2">{dict.customers.title}</SectionTitle>
        <p className="mb-6 text-ink-muted">{dict.customers.intro}</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
          {Array.from({ length: 10 }, (_, i) => (
            <Image
              key={i}
              src={`/assets/customers/cust-${i + 1}.jpeg`}
              alt={dict.customers.altPat.replace("{n}", String(i + 1))}
              width={140}
              height={44}
              className="h-10 w-auto max-w-[120px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-content px-6 pb-20">
        <SectionTitle className="mb-2">{dict.contact.title}</SectionTitle>
        <div className="grid gap-10 lg:grid-cols-[1fr,1.05fr] lg:items-start">
          <div className="space-y-6 text-[0.95rem] text-ink-muted">
            <p className="m-0 leading-relaxed">{dict.contact.intro}</p>
            <dl className="m-0 space-y-4">
              <div>
                <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                  {dict.contact.emailLabel}
                </dt>
                <dd className="m-0">
                  <a
                    href={`mailto:${dict.contact.emailValue}`}
                    className="font-medium text-ink underline decoration-teal underline-offset-2"
                  >
                    {dict.contact.emailValue}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                  {dict.contact.mobileLabel}
                </dt>
                <dd className="m-0">
                  <a
                    href="tel:+64223994155"
                    className="font-medium text-ink underline decoration-teal underline-offset-2"
                  >
                    {dict.contact.mobileValue}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                  {dict.contact.whatsappLabel}
                </dt>
                <dd className="m-0">
                  <a
                    href={dict.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline decoration-teal underline-offset-2"
                  >
                    {dict.contact.whatsappDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                  {dict.contact.address}
                </dt>
                <dd className="m-0">
                  {dict.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                  {dict.contact.website}
                </dt>
                <dd className="m-0">
                  <a
                    href="https://www.renfengsp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline decoration-teal underline-offset-2"
                  >
                    www.renfengsp.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <InquiryForm locale={locale} labels={dict.inquiry} />
        </div>
      </section>

      <footer className="bg-ink px-6 py-10 text-[0.8rem] text-white/70">
        <div className="mx-auto max-w-content">
          <p className="m-0 text-center text-white/90">{dict.footer.copyright}</p>
        </div>
      </footer>
    </main>
  );
}
