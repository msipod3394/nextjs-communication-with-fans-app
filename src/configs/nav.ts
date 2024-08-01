import { NavConfig } from "@/types/site";

export const NavItem: NavConfig = {
  // ヘッダー
  mainNav: [
    {
      title: "プロフィール",
      href: "/profile",
    },
    {
      title: "イベント情報",
      href: "/event",
    },
    {
      title: "ポートフォリオ",
      href: "/portfolio",
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
