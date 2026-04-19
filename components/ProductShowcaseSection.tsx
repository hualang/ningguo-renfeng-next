"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { SectionTitle } from "@/components/SectionTitle";
import {
  solutionShowcaseAssets,
  solutionShowcaseOrder,
  type SolutionShowcaseKey,
} from "@/lib/solution-showcase";
import type { SiteDictionary } from "@/lib/i18n/copy/types";

/** 大屏约 4 列 × 3 行；少于此数量不显示「查看更多」 */
const PREVIEW_MAX = 12;

type Props = {
  dict: Pick<SiteDictionary, "solutions" | "productShowcase">;
};

function CategoryBlock({
  catKey,
  categoryTitle,
  galleryLabel,
  showMore,
  showLess,
}: {
  catKey: SolutionShowcaseKey;
  categoryTitle: string;
  /** 用于图片 alt，与区块主标题一致 */
  galleryLabel: string;
  showMore: string;
  showLess: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const uid = useId();
  const assets = solutionShowcaseAssets[catKey];
  const images = assets.gallery;
  const needsToggle = images.length > PREVIEW_MAX;
  const visible = !needsToggle || expanded ? images : images.slice(0, PREVIEW_MAX);
  const panelId = `${uid}-${catKey}-panel`;

  return (
    <div
      id={`product-showcase-${catKey}`}
      className="scroll-mt-24 border-b border-line pb-10 last:border-b-0 last:pb-0"
    >
      <h3 className="mb-4 text-[1.25rem] font-semibold text-ink">{categoryTitle}</h3>
      <div
        id={panelId}
        className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        role="region"
        aria-label={categoryTitle}
      >
        {visible.map((src, gi) => (
          <div
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-white"
          >
            <Image
              src={src}
              alt={`${categoryTitle} — ${galleryLabel} ${gi + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        ))}
      </div>
      {needsToggle ? (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-line bg-white px-5 py-2.5 text-[0.82rem] font-semibold text-teal-dark transition hover:border-teal hover:bg-teal-soft"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-controls={panelId}
          >
            {expanded ? showLess : showMore}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function ProductShowcaseSection({ dict }: Props) {
  return (
    <section
      id="product-showcase"
      className="bg-surface px-6 py-16"
      aria-labelledby="product-showcase-heading"
    >
      <div className="mx-auto max-w-content">
        <SectionTitle id="product-showcase-heading" className="mb-6">
          {dict.productShowcase.title}
        </SectionTitle>
        <div className="space-y-10">
          {solutionShowcaseOrder.map((key) => (
            <CategoryBlock
              key={key}
              catKey={key}
              categoryTitle={dict.solutions[key].title}
              galleryLabel={dict.productShowcase.title}
              showMore={dict.productShowcase.showMore}
              showLess={dict.productShowcase.showLess}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
