import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="container">
          <Breadcrumbs />
          <main className=" py-8 sm:py-12">{children}</main>
        </div>
      </div>
    </>
  );
}
