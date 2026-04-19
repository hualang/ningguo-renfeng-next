import "server-only";

import { groq } from "next-sanity";

/** 首页单例：在 Studio 里新建一条类型为「首页」的文档即可（建议只保留一条） */
export const homePageQuery = groq`
  *[_type == "homePage"] | order(_updatedAt desc)[0]{
    heroTitle,
    heroLead,
    heroSub,
    spotlightTitle,
    spotlightBody
  }
`;
