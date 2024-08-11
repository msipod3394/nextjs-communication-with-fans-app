export type SiteConfig = {
  name: string;
  description: string;
  keywords: string[];
  url: string;
  og: string;
  links: {
    x: string;
    // github: string;
    instagram: string;
    tiktok: string;
  };
  footer: {
    caution: string;
    copyright: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  islogin?: boolean;
};

export type NavConfig = {
  mainNav: NavItem[];
  loginUserNav: NavItem[];
  dashboardNav: NavItem[];
};
