import DashboardNav from "@/components/nav/DashboardNav";
import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";
import { NavItem } from "@/configs/nav";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <hr className="border-t" />
      <div className="container grid flex-1 gap-12 md:grid-cols-[240px_1fr] py-12">
        <aside className="hidden md:flex w-[240px] flex-col border-r">
          <DashboardNav items={NavItem.dashboardNav} />
        </aside>
        <main className="flex flex-col w-full flex-1">{children}</main>
      </div>
      <hr className="border-t" />
      <Footer />
    </div>
  );
}
