import { NavItem } from "@/configs/nav";
import { AuthOptions } from "@/lib/auth/AuthOptions";
import { getServerSession } from "next-auth";
import { MainNav } from "./MainNav";
import { UserNav } from "./UserNav";

export default async function Header() {
  // セッション取得
  const session = await getServerSession(AuthOptions);

  return (
    <header className="z-40 bg-background px-6">
      <div className="flex h-20 py-6 justify-between items-center">
        <MainNav items={NavItem.mainNav} />
        <UserNav items={NavItem.userNav} session={session} />
      </div>
    </header>
  );
}
