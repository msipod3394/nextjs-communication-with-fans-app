import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { WorkListArticle } from "@/components/front/works/WorkListArticle";
import { microcmsClient } from "@/lib/microcmsClient";
import { WorksContentsList } from "@/types/cms";

export default async function WorksPage() {
  const contentList: WorksContentsList = await microcmsClient.get({
    endpoint: "e5gfdwcn",
  });
  return (
    <div>
      <FrontHeading heading="WORKS" description="イベントで撮影した写真集" />
      <div className="grid gap-x-4 gap-y-8 md:gap-10 my-12 grid-cols-2 md:grid-cols-3">
        {contentList.contents.map((content) => (
          <WorkListArticle key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}
