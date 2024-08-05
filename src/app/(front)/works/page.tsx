import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { WorkListArticle } from "@/components/front/works/WorkListArticle";
import { microcmsClient } from "@/lib/microcmsClient";
import { ContentList } from "@/types/works";

export default async function WorksPage() {
  const contentList: ContentList = await microcmsClient.get({
    endpoint: "works",
  });
  return (
    <div>
      <FrontHeading heading="WORKS" description="イベントで撮影した写真集" />
      <div className="grid gap-10 my-12 sm:grid-cols-2 md:grid-cols-3">
        {contentList.contents.map((content) => (
          <WorkListArticle key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}
