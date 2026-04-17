import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "宁国人峰机械零部件有限公司 · 制造解决方案",
  description:
    "金属与橡胶零部件制造，IATF16949，出口协作。Ningguo Renfeng Machinery Parts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
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
