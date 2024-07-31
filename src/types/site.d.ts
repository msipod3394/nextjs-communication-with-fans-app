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
  disabled?: boolean;
};

export type HeaderNavConfig = {
  mainNav: NavItem[];
};
