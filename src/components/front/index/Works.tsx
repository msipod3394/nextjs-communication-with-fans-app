import { SquareLink } from "@/app/components/elements/Button/SquareLink";
import { Content } from "@/types/works";
import { WorksArticle } from "./WorksArticle";

type WorksProps = {
  contents: Content[];
};

export const Works = ({ contents }: WorksProps) => {
  return (
    <section
      id="works"
      className="space-y-12 bg-slate-50 py-8 dark:bg-transparent md:py-16 lg:py-40"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading tracking-tighter font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Works
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"></p>
      </div>
      <div className="grid my-12 sm:grid-cols-2 md:grid-cols-3">
        {contents.slice(0, 6).map((content) => (
          <WorksArticle key={content.id} content={content} />
        ))}
      </div>
      <div className="flex justify-center">
        <SquareLink href={"/works"} clasName="">
          View More
        </SquareLink>
      </div>
    </section>
  );
};
