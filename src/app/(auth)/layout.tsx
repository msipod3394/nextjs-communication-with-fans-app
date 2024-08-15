export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex h-screen items-center justify-center">
      <main className="min-h-[500px]">{children}</main>
    </div>
  );
}
