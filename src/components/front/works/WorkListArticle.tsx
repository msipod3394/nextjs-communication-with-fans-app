import { WorksContents } from "@/types/cms";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type WorkListArticleProps = {
  content: WorksContents;
};

export const WorkListArticle = ({ content }: WorkListArticleProps) => {
  console.log(content);

  return (
    <article className="group relative flex flex-col space-y-4">
      <div className="relative aspect-w-9 aspect-h-16 sm:aspect-w-9 sm:aspect-h-16 group">
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
          href={`/works/${content.id}`}
          className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center"
        >
          <div className="flex flex-col gap-2 text-center">
            <span className="block text-lg text-white transition-all duration-300 ease-in-out group-hover:tracking-widest">
              View More
            </span>
          </div>
        </Link>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm sm:text-md font-semibold">{content.title}</h2>
        <p className="text-sm text-muted-foreground">
          {format(new Date(content.createdAt), "yyyy/MM/dd")}
        </p>
      </div>
      <Link className="absolute inset-0" href={`/works/${content.id}`}>
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
};
