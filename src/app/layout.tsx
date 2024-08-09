import styles from "@/components/front/index/index.module.scss";
import Footer from "@/components/nav/Footer";
import Header from "@/components/nav/Header";
import { Toaster } from "@/components/ui/toaster";
import { fontNotoSansJP } from "@/configs/font";
import { siteConfig } from "@/configs/site";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
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
          "bg-back-ground antialiased bg-black text-white dark",
          fontNotoSansJP.className
        )}
      >
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <hr className="border-t" />
          <div className={`mt-16 sm:mt-20 ${styles.mainHeight}`}>{children}</div>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
