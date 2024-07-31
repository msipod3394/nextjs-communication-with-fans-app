import { HeaderNavConfig } from "@/types/site";

export const NavItem: HeaderNavConfig = {
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
};
