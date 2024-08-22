"use client";
import { siteConfig } from "@/configs/site";
import { NavItem } from "@/types/site";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Link from "next/link";
import { pagesPath } from "../../../utils/$path";

type MainNavProps = {
  items: NavItem[];
};

export default function MobileNav({ items }: MainNavProps) {
  // body のスクロールをロック
  useLockBodyScroll();

  return (
    <div className="fixed top-20 left-0 z-100 p-8 shadow-md w-full md:hidden bg-black text-white animate-fade-in min-h-svh">
      <div className="grid gap-6">
        <Link href={pagesPath.$url().path} className="md:flex item-center">
          <span className="font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>
        <nav className="text-sm flex gap-4 flex-col">
          {items.map(
            (item) =>
              !item.disabled && (
                <Link key={item.title} href={item.href} className="text-sm">
                  {item.title}
                </Link>
              )
          )}
        </nav>
      </div>
    </div>
  );
}
