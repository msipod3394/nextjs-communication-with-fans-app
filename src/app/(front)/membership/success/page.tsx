import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SuccessPage() {
  return (
    <div>
      <FrontHeading
        heading="Welcome FunClub"
        description="メンバーシップの登録が完了しました！"
      />

      <div className="mt-16 grid gap-4 w-20">
        <Button>
          <Link href={"/works"}>プレミアムコンテンツを見る</Link>
        </Button>
        <Button>
          <Link href={"/subscribe"}>メンバーシップ管理</Link>
        </Button>
      </div>
    </div>
  );
}
