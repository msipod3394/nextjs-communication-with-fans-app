import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { Button } from "@/components/ui/button";

export default async function SuccessPage() {
  return (
    <div>
      <FrontHeading
        heading="Welcome FunClub"
        description="サブスクリプションの登録が完了しました！"
      />

      <div className="mt-16 grid gap-4 w-20">
        <Button>プレミアムコンテンツを見る</Button>
        <Button>サブスクリプション管理</Button>
      </div>
    </div>
  );
}
