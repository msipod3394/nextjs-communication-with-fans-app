export type SiteConfig = {
  name: string;
  description: string;
  keywords: Array[string];
  url: string;
  og: string;
  links: {
    x: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: string;
};

export type NavConfig = {
  mainNav: NavItem[];
  dashboardNav: NavItem[];
};
