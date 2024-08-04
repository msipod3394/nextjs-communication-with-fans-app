import { NavConfig } from "@/types/site";

export const NavItem: NavConfig = {
  // ヘッダー
  mainNav: [
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
  // ログイン状態に基づくユーザーナビ
  userNav: {
    isLogin: [
      {
        title: "ダッシュボード",
        href: "/dashboard",
      },
      {
        title: "ログアウト",
        href: "/dashboard",
        variant: "secondary",
      },
    ],
    isNotLogin: [
      {
        title: "ログイン",
        href: "/login",
        variant: "secondary",
      },
    ],
  },
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
