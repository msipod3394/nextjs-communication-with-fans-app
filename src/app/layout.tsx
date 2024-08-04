import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";
import { Toaster } from "@/components/ui/toaster";
import { fontNotoSansJP } from "@/configs/font";
import { siteConfig } from "@/configs/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

// メタデータ設定
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "msipod3394",
    },
  ],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "ja",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [`${siteConfig.url}/og/jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og/${siteConfig.og}`],
    creator: "@msipod3394",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={cn(
          "bg-back-ground antialiased min-h-screen",
          fontNotoSansJP.className
        )}
      >
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <hr className="border-t" />
          {children}
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
