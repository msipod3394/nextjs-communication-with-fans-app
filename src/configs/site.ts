import { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "ファンコミュ",
  description: "このサイトでは、〇〇のイベント活動状況について発信しています。",
  keywords: ["Next.js", "React"],
  url: "http://localhost:3000",
  og: "og.jpg",
  links: {
    x: "https://twitter.com/yanyan_cos",
    instagram: "https://www.instagram.com/yanyan05050923/",
    tiktok: "https://www.tiktok.com/@yanyan05050923",
  },
  footer: {
    caution:
      "写真のすべてに関する著作権は私に帰属しており、無断での複製や転載は厳しく禁じられています。<br>他のウェブサイト、印刷物、電子メディアなどへの転載は一切許可されません。無断転載には法的措置を取る可能性があります。<br>ご理解とご協力をよろしくお願いいたします。",
    copyright: "Copyright &copy; xxx All Rights Reserved.",
  },
};
