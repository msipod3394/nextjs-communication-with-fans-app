"use client";
import { NavItem } from "@/types/site";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import MoblileNav from "./MoblileNav";

type MainNavProps = {
  items: NavItem[];
  children?: ReactNode;
};

export default function MainNav({ items = [] }: MainNavProps) {
  // メニュー開閉の状態管理
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  // console.log(items);
  return (
    <div className="flex items-center md:gap-8">
      <Link href={"/"} className="hidden md:flex">
        <span className="font-bold hidden sm:inline-block">Post Writer</span>
      </Link>
      <nav className="md:flex gap-6 hidden">
        {items.map((item, index) => (
          <>
            {!item.disabled && (
              <Link key={index} href={item.href} className="">
                {item.title}
              </Link>
            )}
          </>
        ))}
      </nav>
      <Button
        className="md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <span>メニュー</span>
      </Button>
      {showMobileMenu && <MoblileNav items={items} />}
    </div>
  );
}
