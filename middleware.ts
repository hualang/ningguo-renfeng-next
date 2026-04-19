import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    pathname.endsWith(".ico") ||
    /\.(png|jpg|jpeg|gif|webp|svg|txt|xml|json|webmanifest)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const first = pathname.split("/").filter(Boolean)[0];
  const hasLocale = first && locales.includes(first as "zh" | "en");

  const requestHeaders = new Headers(request.headers);
  if (hasLocale) {
    requestHeaders.set("x-locale", first!);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * 排除整段 /_next/*（含 static、webpack、RSC、CSS chunk），以及 api、favicon；
     * 比只排除 _next/static|_next/image 更稳，避免个别环境下中间件误伤样式脚本。
     */
    "/((?!api|_next|favicon.ico).*)",
  ],
};
