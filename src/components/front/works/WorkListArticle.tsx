import { Content } from "@/types/works";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type WorkListArticleProps = {
  content: Content;
};

export const WorkListArticle = ({ content }: WorkListArticleProps) => {
  return (
    <article className="group relative flex flex-col space-y-4">
      <div className="relative aspect-w-4 aspect-h-3 overflow-hidden">
        <div className="h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-110">
          <Image
            src={content.photo_default[0].url}
            fill
            objectFit="cover"
            objectPosition="top"
            className="object-cover"
            alt={content.title}
          />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{content.title}</h2>
        <p className="text-md text-muted-foreground">{content.content}</p>
        <p className="text-sm text-muted-foreground">
          {format(new Date(content.shooting_date), "yyyy/MM/dd")}
        </p>
      </div>
      <Link className="absolute inset-0" href={`/works/${content.id}`}>
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
};
