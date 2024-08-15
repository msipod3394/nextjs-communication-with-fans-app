import { fontRoboto } from "@/configs/font";
import { siteConfig } from "@/configs/site";
import { Icon } from "../icon/icon";
import { SnsList } from "./SnsList";

export default function Footer() {
  // SNS
  const snsList = [
    { name: "x", href: siteConfig.links.x, Icon: Icon.x },
    {
      name: "instagram",
      href: siteConfig.links.instagram,
      Icon: Icon.instagram,
    },
    { name: "tiktok", href: siteConfig.links.tiktok, Icon: Icon.tiktok },
  ];

  return (
    <footer className="w-full gap-8 mb-8 pt-8 px-8 flex flex-col sm:flex-row items-center justify-between border-t">
      <SnsList snsList={snsList} />
      <div className="flex flex-col gap-8 md:gap-4">
        <p
          className="text-left text-xs"
          dangerouslySetInnerHTML={{ __html: siteConfig.footer.caution }}
        />
        <p
          className={`text-center md:text-right text-xs ${fontRoboto.className}`}
          dangerouslySetInnerHTML={{ __html: siteConfig.footer.copyright }}
        />
      </div>
    </footer>
  );
}
