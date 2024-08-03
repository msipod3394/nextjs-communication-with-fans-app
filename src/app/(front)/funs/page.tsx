import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { BenefitPlans } from "@/components/front/funs/BenefitPlans";
import { getUserCurrent } from "@/lib/session";
import { getAllPlans } from "@/utils/getAllPlans";
import { getUserData } from "@/utils/getUserData";

export default async function FunsPage() {
  const [plans, session, user] = await Promise.all([
    // プラン情報の取得
    await getAllPlans(),

    // ユーザーセッションの取得
    await getUserCurrent(),

    // ユーザーデータの取得
    await getUserData(),
  ]);

  // サブスク登録していない & サブスク登録ボタンを表示
  const showSubscribeButton = !!session && user?.isSubscribed;

  // サブスク登録している & 未ログインの場合
  const showCreateAccountButton = !session && user?.isSubscribed;

  // 未ログインの場合
  const showManageSubscriptionButton = !!session;

  return (
    <div>
      <FrontHeading
        heading="Funs"
        description="もっと見たい・応援したいあなたへ"
      />
      <div className="mt-8 flex flex-row gap-8">
        <BenefitPlans plans={plans} />
      </div>
    </div>
  );
}
