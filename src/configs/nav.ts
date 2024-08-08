import { NavConfig } from "@/types/site";

export const NavItem: NavConfig = {
  // ヘッダー
  mainNav: [
    {
      title: "Top",
      href: "/",
    },
    {
      title: "Works",
      href: "/works",
    },
    {
      title: "Membership",
      href: "/membership",
      // disabled: true,
    },
    {
      title: "Contact",
      href: "/contact",
      // disabled: true,
    },
  ],
  // ログインユーザーのみ表示
  loginUserNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
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
      title: "メンバーシップ管理",
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
