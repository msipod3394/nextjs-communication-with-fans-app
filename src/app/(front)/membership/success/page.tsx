import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pagesPath } from "../../../../../utils/$path";

export default async function SuccessPage() {
  return (
    <div>
      <FrontHeading
        heading="Welcome FunClub"
        description="メンバーシップの登録が完了しました！"
      />

      <div className="mt-16 grid gap-4 w-20">
        <Button>
          <Link href={pagesPath.works.$url().path}>プレミアムコンテンツを見る</Link>
        </Button>
        <Button>
          <Link href={pagesPath.subscribe.$url().path}>メンバーシップ管理</Link>
        </Button>
      </div>
    </div>
  );
}
