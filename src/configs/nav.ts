import { NavConfig } from "@/types/site";

export const NavItem: NavConfig = {
  // ヘッダー
  mainNav: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Event",
      href: "/event",
    },
    {
      title: "Works",
      href: "/works",
    },
    {
      title: "Funs",
      href: "/funs",
      // disabled: true,
    },
  ],
  // ダッシュボード
  dashboardNav: [
    {
      title: "写真投稿",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "サブスクリプション管理",
      href: "/subscribe",
      icon: "billing",
    },
    {
      title: "設定",
      href: "/setting",
      icon: "settings",
    },
  ],
};
