import DashboardNav from "@/components/nav/DashboardNav";
import { NavItem } from "@/configs/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container min-h-full grid flex-1 gap-12 md:grid-cols-[240px_1fr] py-12">
        <aside className="hidden md:flex w-[240px] flex-col border-r">
          <DashboardNav items={NavItem.dashboardNav} />
        </aside>
        <main className="flex flex-col w-full flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </>
  );
}
