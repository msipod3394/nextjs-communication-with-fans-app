import Footer from "../../components/nav/Footer";
import Header from "../../components/nav/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex h-screen w-screen flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
