import { redirect } from "next/navigation";

import { defaultLocale } from "@/lib/i18n/config";

/** 根路径由 middleware 也会重定向；此处兜底 */
export default function RootRedirectPage() {
  redirect(`/${defaultLocale}`);
}
