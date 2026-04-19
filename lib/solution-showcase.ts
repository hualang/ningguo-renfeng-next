/**
 * 「了解我们的制造组合」三类方案：主图与各目录内产品展示图。
 * 源文件来自微信目录 `…/2026-04/{金属,橡胶,部件}/`，已复制到 `public/assets/solutions/{metal,rubber,parts}/`。
 * 更新素材：替换对应目录下 cover 与 gallery-* 文件即可。
 */
export type SolutionShowcaseKey = "metal" | "rubber" | "parts";

const metalGallery = Array.from(
  { length: 13 },
  (_, i) =>
    `/assets/solutions/metal/gallery-${String(i + 1).padStart(2, "0")}.jpg`,
);

const rubberGallery = Array.from(
  { length: 7 },
  (_, i) =>
    `/assets/solutions/rubber/gallery-${String(i + 1).padStart(2, "0")}.png`,
);

const partsGallery = Array.from(
  { length: 47 },
  (_, i) =>
    `/assets/solutions/parts/gallery-${String(i + 1).padStart(2, "0")}.png`,
);

export const solutionShowcaseAssets: Record<
  SolutionShowcaseKey,
  { cover: string; gallery: string[] }
> = {
  metal: {
    cover: "/assets/solutions/metal/cover.jpg",
    gallery: metalGallery,
  },
  rubber: {
    cover: "/assets/solutions/rubber/cover.png",
    gallery: rubberGallery,
  },
  parts: {
    cover: "/assets/solutions/parts/cover.png",
    gallery: partsGallery,
  },
};

export const solutionShowcaseOrder: SolutionShowcaseKey[] = [
  "metal",
  "rubber",
  "parts",
];
