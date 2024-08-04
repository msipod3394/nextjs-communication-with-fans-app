import { cn } from "@/lib/utils";
import { NavItem } from "@/types/site";
import { User } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

type UserNavProps = {
  items: {
    isLogin: NavItem[];
    isNotLogin: NavItem[];
  };
  session: Pick<User, "id" | "name" | "email" | "image"> | null;
};

export const UserNav = ({ items, session }: UserNavProps) => {
  return (
    <div>
      {session ? (
        <div className="flex gap-2">
          {items.isLogin.map(
            (item) =>
              !item.disabled && (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: `${item.variant}`, size: "sm" }),
                    "px-4 font-bold text-sm"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </div>
      ) : (
        <div>
          {items.isNotLogin.map(
            (item) =>
              !item.disabled && (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: `${item.variant}`, size: "sm" }),
                    "px-4 font-bold text-sm"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </div>
      )}
    </div>
  );
};
