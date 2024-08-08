"use client";
import { NavItem } from "@/types/site";
import { User } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "../icon/icon";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

type MainNavProps = {
  items: [NavItem[], NavItem[]];
  session: Pick<User, "id" | "name" | "email" | "image"> | null;
};

export const MainNav = ({ items, session }: MainNavProps) => {
  // メニュー開閉の状態管理
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  // ナビの取り出し
  const [mainNav, loginUserNav] = items;

  return (
    <div className="flex items-center md:gap-8">
      <nav className="md:flex gap-6 hidden justify-between">
        <div className="md:flex gap-6">
          {mainNav.map(
            (item) =>
              !item.disabled && (
                <Link key={item.title} href={item.href} className="text-sm">
                  {item.title}
                </Link>
              )
          )}
        </div>
        <div className="md:flex gap-6">
          {session &&
            loginUserNav.map(
              (item) =>
                !item.disabled && (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-sm  text-black"
                  >
                    {item.title}
                  </Link>
                )
            )}
        </div>
      </nav>
      <Button
        className="md:hidden w-10 h-10 p-0"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Icon.menu className="w-full h-full bg-black text-white" />
      </Button>
      {/* モバイルメニュー表示 */}
      {showMobileMenu && (
        <MobileNav items={[mainNav, loginUserNav]} session={session} />
      )}
    </div>
  );
};
