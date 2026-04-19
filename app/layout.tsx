import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { headers } from "next/headers";

import { getMetadataBase } from "@/lib/site-url";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
};

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const loc = h.get("x-locale");
  const htmlLang = loc === "en" ? "en" : "zh-CN";

  return (
    <html lang={htmlLang}>
      <body
        className={`${lexend.variable} antialiased`}
        style={{
          fontFamily:
            'var(--font-lexend), "PingFang SC", "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
