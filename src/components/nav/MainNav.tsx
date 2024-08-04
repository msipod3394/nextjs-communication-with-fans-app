"use client";
import { siteConfig } from "@/configs/site";
import { NavItem } from "@/types/site";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

type MainNavProps = {
  items: NavItem[];
  children?: ReactNode;
};

export const  MainNav = ({ items }: MainNavProps) => {
  // メニュー開閉の状態管理
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex items-center md:gap-8">
      <Link href={"/"} className="hidden md:flex">
        <span className="font-bold hidden sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="md:flex gap-6 hidden">
        {items.map(
          (item) =>
            !item.disabled && (
              <Link key={item.title} href={item.href} className="text-sm">
                {item.title}
              </Link>
            )
        )}
      </nav>
      <Button
        className="md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <span>メニュー</span>
      </Button>
      {showMobileMenu && <MobileNav items={items} />} {/* 修正箇所 */}
    </div>
  );
}
