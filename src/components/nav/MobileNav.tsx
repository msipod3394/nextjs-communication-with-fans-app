"use client";
import { siteConfig } from "@/configs/site";
import { NavItem } from "@/types/site";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Link from "next/link";

type MainNavProps = {
  items: [NavItem[], NavItem[]];
  session: Pick<User, "id" | "name" | "email" | "image"> | null;
};

export default function MobileNav({ items, session }: MainNavProps) {
  // body のスクロールをロック
  useLockBodyScroll();

  // ナビの取り出し
  const [mainNav, loginUserNav] = items;

  return (
    <div className="fixed top-20 left-0 z-100 p-8 shadow-md w-full md:hidden bg-black text-white animate-fade-in min-h-svh">
      <div className="grid gap-6">
        <Link href={"/"} className="md:flex item-center">
          <span className="font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>
        <nav className="text-sm flex gap-4 flex-col">
          {mainNav.map(
            (item) =>
              !item.disabled && (
                <Link key={item.title} href={item.href} className="text-sm">
                  {item.title}
                </Link>
              )
          )}
          {session &&
            loginUserNav.map(
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
