import { NavConfig } from "@/types/site";

export const NavItem: NavConfig = {
  // ヘッダー
  mainNav: [
    {
      title: "ABOUT",
      href: "/about",
    },
    {
      title: "EVENT",
      href: "/event",
    },
    {
      title: "WORKS",
      href: "/works",
    },
    {
      title: "サブスク登録",
      href: "/subscribe",
      disabled: true,
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
