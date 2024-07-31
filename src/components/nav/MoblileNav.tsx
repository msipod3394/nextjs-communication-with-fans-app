import { siteConfig } from "@/configs/site";
import { NavItem } from "@/types/site";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Link from "next/link";

type MainNavProps = {
  items: NavItem[];
};

export default function MoblileNav({ items }: MainNavProps) {
  // body のスクロールをロック
  useLockBodyScroll();

  return (
    <div className="fixed top-20 left-0 z-100 p-8 shadow-md w-full md:hidden bg-black text-white animate-fade-in min-h-svh">
      <div className="grid gap-6">
        <Link href={"/"} className="md:flex item-center">
          <span className="font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>
        <nav className="text-sm flex gap-4 flex-col">
          {items?.map((item, index) => (
            <>
              {!item.disabled && (
                <Link key={index} href={item.href} className="">
                  {item.title}
                </Link>
              )}
            </>
          ))}
        </nav>
      </div>
    </div>
  );
}
