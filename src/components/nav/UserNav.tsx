"use client";
import styles from "@/styles/index.module.scss";
import { NavItem } from "@/types/site";
import { User } from "@prisma/client";
import Link from "next/link";
import { AuthClientButton } from "../auth/AuthClientButton";

type UserNavProps = {
  items: NavItem[];
  session: Pick<User, "id" | "name" | "email" | "image"> | null;
};

export const UserNav = ({ items, session }: UserNavProps) => {
  return (
    <nav aria-label="User navigation" className="flex items-center gap-6">
      <ul>
        {session &&
          items.map(
            (item, index) =>
              !item.disabled && (
                <li key={item.index}>
                  <Link
                    href={item.href}
                    className={`text-sm ${styles.animeUnderline}`}
                  >
                    {item.title}
                  </Link>
                </li>
              )
          )}
      </ul>
      <AuthClientButton session={session} />
    </nav>
  );
};
