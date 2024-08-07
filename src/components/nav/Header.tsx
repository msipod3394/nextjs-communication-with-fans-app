import { NavItem } from "@/configs/nav";
import { AuthOptions } from "@/lib/auth/AuthOptions";
import { getServerSession } from "next-auth";
import { AuthClientButton } from "../auth/AuthClientButton";
import { MainNav } from "./MainNav";

export default async function Header() {
  // セッション取得
  const session = await getServerSession(AuthOptions);

  return (
    <header className="z-40 bg-background px-6 fixed w-full z-40">
      <div className="flex h-20 py-6 justify-between items-center">
        <MainNav
          items={[NavItem.mainNav, NavItem.loginUserNav]}
          session={session}
        />
        <AuthClientButton session={session} />
      </div>
    </header>
  );
}
