import { SiteHeader } from "@/components/SiteHeader";
import { HomeContent } from "@/components/HomeContent";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-teal focus:px-3 focus:py-2 focus:text-white"
      >
        跳到正文
      </a>
      <SiteHeader />
      <HomeContent />
    </>
  );
}
