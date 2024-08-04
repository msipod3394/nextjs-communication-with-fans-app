import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PlanCard } from "@/components/front/membership/PlanCard";
import { Button } from "@/components/ui/button";
import { getUserCurrent } from "@/lib/session";
import { getAllPlans } from "@/utils/getAllPlans";
import { getUserData } from "@/utils/getUserData";
import Link from "next/link";

export default async function SubscribePage() {
  const [plans, session, user] = await Promise.all([
    // プラン情報の取得
    getAllPlans(),
    // ユーザーセッションの取得
    getUserCurrent(),
    // ユーザーデータの取得
    getUserData(),
  ]);
  // console.log(plans, session, user);

  return (
    <DashboardShell>
      <DashboardHeader heading="サブスクリプション管理" description="" />
      <p className="text-md text-gray-700">
        サブスクリプション登録をすることで、非公開の投稿を閲覧することができます。
      </p>
      <div>
        {user?.isSubscribed ? (
          <div className="mt-4 flex flex-col gap-4">
            <h3>契約中のプラン</h3>
            {plans.map((plan) => {
              if (plan.id === user.stripeSubscriptionId)
                return (
                  <PlanCard key={plan.id} plan={plan}>
                    <Button className="w-[220px]">
                      <Link href={"/membership"}>サブスクリプションの変更</Link>
                    </Button>
                  </PlanCard>
                );
            })}
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            <p>現在、契約中のプランはありません。</p>
            <Button className="w-[220px]">
              <Link href={"/membership"}>サブスクリプション契約をする</Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
