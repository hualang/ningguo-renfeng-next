import "server-only";

import type { HomePageData } from "@/types/sanity";

import { isSanityConfigured } from "../env";
import { sanityFetch } from "./client";
import { homePageQuery } from "./queries";

export async function getHomePage(): Promise<HomePageData | null> {
  if (process.env.STATIC_HTML_EXPORT === "1") return null;
  if (!isSanityConfigured()) return null;
  return sanityFetch<HomePageData>(homePageQuery, {}, ["homePage"]);
}
