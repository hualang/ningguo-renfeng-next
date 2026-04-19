import "server-only";

import { createClient, type QueryParams } from "next-sanity";

import { apiVersion, dataset, projectId, isSanityConfigured } from "../env";

function getClient() {
  if (!isSanityConfigured()) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
  });
}

export async function sanityFetch<QueryResponse>(
  query: string,
  params: QueryParams = {},
  tags?: string[],
): Promise<QueryResponse | null> {
  const client = getClient();
  if (!client) return null;
  // 避免 Next.js 默认缓存 fetch，否则 Studio 发布后首页仍长期显示旧内容
  return client.fetch<QueryResponse>(query, params, {
    cache: "no-store",
    next: { tags },
  });
}
