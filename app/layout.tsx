import type { Metadata } from "next";
import { Lexend } from "next/font/google";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
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
