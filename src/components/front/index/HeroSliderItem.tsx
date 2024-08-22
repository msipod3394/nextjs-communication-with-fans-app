import { fontRoboto } from "@/configs/font";
import { WorksContents } from "@/types/cms";
import Image from "next/image";
import Link from "next/link";
import { pagesPath } from "../../../../utils/$path";

type HeroSliderItemProps = {
  content: WorksContents;
};

export const HeroSliderItem = ({ content }: HeroSliderItemProps) => (
  <div className="relative w-full min-h-screen group">
    <div className="absolute inset-0">
      <Image
        src={content.photo_default[0].url}
        alt={`${content.title}`}
        layout="fill"
        objectFit="cover"
        className="transition-opacity duration-300 ease-in-out"
      />
    </div>
    <Link
      href={pagesPath.works._id(content.id).$url().path}
      className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center"
    >
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-semibold text-white transition-all duration-300 ease-in-out group-hover:tracking-widest">
          {content.title}
        </h2>
        <span
          className={`${fontRoboto.className} block text-xl font-semibold text-white transition-all duration-300 ease-in-out group-hover:tracking-widest`}
        >
          View More
        </span>
      </div>
    </Link>
  </div>
);
