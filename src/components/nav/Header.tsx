import { NavItem } from "@/configs/nav";
import { AuthOptions } from "@/lib/auth/AuthOptions";
import { getServerSession } from "next-auth";
import { MainNav } from "./MainNav";
import { UserNav } from "./UserNav";

export default async function Header() {
  // セッション取得
  const session = await getServerSession(AuthOptions);

  return (
    <header className="z-100 bg-black text-white px-6 fixed w-full z-40">
      <div className="flex h-20 py-6 justify-between items-center">
        <MainNav items={NavItem.mainNav} />
        <UserNav items={NavItem.loginUserNav} session={session} />
      </div>
    </header>
  );
}
