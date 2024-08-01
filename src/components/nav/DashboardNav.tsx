"use client";
import { NavItem } from "@/types/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon as Icons } from "../icon/icon";

type DashboardNavProps = {
  items: NavItem[];
};

export default function DashboardNav({ items }: DashboardNavProps) {
  // カレントページにハイライト
  const path = usePathname();
  // console.log(path);

  if (!items.length) {
    return null;
  }

  return (
    <nav className="grid gap-2 mr-8">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];

        return (
          <>
            {!item.disabled && (
              <Link key={index} href={item.href!}>
                <span
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground
                    ${path === item.href ? "bg-accent" : "bg-transparent"}`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.title}
                </span>
              </Link>
            )}
          </>
        );
      })}
    </nav>
  );
}
