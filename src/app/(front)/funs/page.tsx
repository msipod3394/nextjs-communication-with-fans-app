import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { PlanCard } from "@/components/front/funs/PlanCard";
import { getUserCurrent } from "@/lib/session";
import { getAllPlans } from "@/utils/getAllPlans";
import { getUserData } from "@/utils/getUserData";

export default async function FunsPage() {
  const [plans, session, user] = await Promise.all([
    // プラン情報の取得
    getAllPlans(),
    // ユーザーセッションの取得
    getUserCurrent(),
    // ユーザーデータの取得
    getUserData(),
  ]);
  // console.log(user);

  // セッションが存在している & サブスク契約している場合
  const showManageSubscriptionButton = !!session && !!user?.isSubscribed;

  // セッションが存在している & サブスク契約していない場合
  const showSubscribeButton = session && !user?.isSubscribed;

  // 未ログインの場合
  const showCreateAccountButton = !session;

  return (
    <div>
      <FrontHeading
        heading="Funs"
        description="もっと見たい・応援したいあなたへ"
      />
      <div className="mt-16 flex flex-row gap-8 justify-center">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            showSubscribeButton={showSubscribeButton}
            showManageSubscriptionButton={showManageSubscriptionButton}
            showCreateAccountButton={showCreateAccountButton}
          />
        ))}
      </div>
    </div>
  );
}
