import { FrontHeading } from "@/components/dashboard/FrontHeading";

export default async function CancelledPage() {
  return (
    <div>
      <FrontHeading
        heading="Cancel Subscription"
        description="メンバーシップの登録が解除されました。"
      />
    </div>
  );
}
