export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex h-screen items-center justify-center">
      {/* <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-2 absolute left-4 top-4 md:left-8 md:top-8">
        <Link href="/">
          <Button variant="ghost">
            <ChevronLeft className="h-4 w-4" />
            <span className="pl-2">Back</span>
          </Button>
        </Link>
      </div> */}
      <main className="min-h-[500px]">{children}</main>
    </div>
  );
}
