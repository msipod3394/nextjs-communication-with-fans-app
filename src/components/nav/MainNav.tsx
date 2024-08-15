"use client";
import { fontRoboto } from "@/configs/font";
import styles from "@/styles/index.module.scss";
import { NavItem } from "@/types/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "../icon/icon";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

type MainNavProps = {
  items: NavItem[];
};

export const MainNav = ({ items }: MainNavProps) => {
  // カレントページにハイライト
  const path = usePathname();
  console.log(path);

  // メニュー開閉の状態管理
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex items-center md:gap-8">
      <nav className="md:flex gap-6 hidden justify-between">
        <div className="md:flex gap-6">
          {items.map(
            (item, index) =>
              !item.disabled && (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`${fontRoboto.className} text-md font-semibold ${
                      styles.animeUnderline
                    } ${path === item.href ? styles.isCurrent : ""}`}
                  >
                    {item.title}
                  </Link>
                </li>
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
      {showMobileMenu && <MobileNav items={items} />}
    </div>
  );
};
