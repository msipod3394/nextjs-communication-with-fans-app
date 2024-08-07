import { NewsContent } from "@/types/cms";
import { format } from "date-fns";

type NewsProps = {
  contents: NewsContent[];
};

export const News = ({ contents }: NewsProps) => {
  // console.log(contents);

  // 最新順に並べる
  const sortedContents = contents
    .slice()
    .sort(
      (a, b) =>
        new Date(b.post_date).getTime() - new Date(a.post_date).getTime()
    );

  // 表示する境界線の数を、contents の長さに合わせる
  const visibleBorders = sortedContents.length;

  return (
    <section id="news" className="container bg-slate-50 mt-40">
      <div className="grid grid-rows-auto gap-4">
        {sortedContents.slice(0, visibleBorders).map((content, index) => (
          <div
            key={content.id}
            className={`flex p-8 gap-4 ${
              index < visibleBorders - 1 ? "border-b" : ""
            }`}
          >
            <span className="text-xs text-muted-foreground">
              {format(new Date(content.post_date), "yyyy/MM/dd")}
            </span>
            <div className="grid grid-rows-auto gap-2">
              <p className="text-sm text-gray-800">{content.title}</p>
              <p className="text-xs text-muted-foreground">
                {content.contents}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
