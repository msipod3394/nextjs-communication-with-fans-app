import { buttonVariants } from "@/components/ui/button";
import { NavItem } from "@/configs/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MainNav from "./MainNav";

export default function Header() {
  return (
    <header className="z-40 bg-background px-6">
      <div className="flex h-20 py-6 justify-between">
        <MainNav items={NavItem.mainNav} />
        <Link
          href={"/login"}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "px-4 font-bold text-sm"
          )}
        >
          ログイン
        </Link>
      </div>
    </header>
  );
}
