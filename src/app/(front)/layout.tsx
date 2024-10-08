export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="container py-8 sm:py-12">
        <main>{children}</main>
      </div>
    </div>
  );
}
