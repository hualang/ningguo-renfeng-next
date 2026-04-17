import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "#capabilities", label: "能力" },
  { href: "#solutions", label: "方案" },
  { href: "#factory", label: "实景" },
  { href: "#quality", label: "质量" },
  { href: "#products", label: "产品" },
  { href: "#customers", label: "客户" },
  { href: "#contact", label: "联系" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="#top" className="flex items-center gap-3.5 text-inherit no-underline">
          <Image
            src="/assets/hero/logo-mark.png"
            alt="宁国人峰"
            width={120}
            height={44}
            className="h-11 w-auto object-contain"
          />
          <div className="flex flex-col gap-0.5">
            <strong className="text-[0.92rem] font-semibold tracking-wide">
              宁国人峰机械零部件
            </strong>
            <span className="text-[0.68rem] tracking-wide text-ink-muted">
              Ningguo Renfeng Machinery Parts
            </span>
          </div>
        </Link>
        <nav
          className="hidden flex-wrap items-center gap-x-6 gap-y-1 md:flex"
          aria-label="主导航"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b-2 border-transparent pb-1 text-[0.82rem] font-medium text-ink no-underline transition-colors hover:border-teal hover:text-teal-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <span
          className="rounded-full border border-line px-3 py-1.5 text-[0.75rem] font-medium text-ink-muted"
          title="静态 HTML 版位于同仓库 ningguo-renfeng-site/index.html"
        >
          Next 演示版
        </span>
      </div>
    </header>
  );
}
