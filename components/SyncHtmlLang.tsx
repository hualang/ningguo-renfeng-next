"use client";

import { useLayoutEffect } from "react";

/** 与中英路由同步 <html lang>（根 layout 无法用 headers() 时再区分，否则 static export 无法构建） */
export function SyncHtmlLang({ locale }: { locale: string }) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
  }, [locale]);

  return null;
}
