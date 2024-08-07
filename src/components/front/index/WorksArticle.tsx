import { Content } from "@/types/works";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";

type WorksArticleProps = {
  content: Content;
};

export const WorksArticle = ({ content }: WorksArticleProps) => {
  return (
    <article className="group relative flex flex-col space-y-4">
      <div className="relative aspect-w-4 aspect-h-3 overflow-hidden">
        <div className="h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-110">
          <Image
            src={content.photo_default[0].url}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            className="object-cover"
            alt={content.title}
          />
          <span
            className={`${styles.gradientAnimation} block absolute inset-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100`}
          />
        </div>
        <Link
          className="absolute inset-0 flex items-center justify-center flex-col gap-2"
          href={`/works/${content.id}`}
        >
          <h2 className="text-2xl font-semibold text-white transition-all duration-300 ease-in-out group-hover:tracking-widest">
            {content.title}
          </h2>
          <span className="block text-lg text-white transition-all duration-300 ease-in-out group-hover:tracking-widest">
            View More
          </span>
        </Link>
      </div>
    </article>
  );
};
