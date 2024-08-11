import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BenefitPlanCard } from "@/components/front/membership/BenefitPlanCard";
import { SubscriptionManageButton } from "@/components/subscribe/subscriptionManageButton";
import { Button } from "@/components/ui/button";
import { getUserCurrent } from "@/lib/session";
import { getAllPlans } from "@/utils/getAllPlans";
import { getUserData } from "@/utils/getUserData";
import Link from "next/link";

export default async function SubscribePage() {
  const [plans, session, user] = await Promise.all([
    getAllPlans(),
    getUserCurrent(),
    getUserData(),
  ]);

  return (
    <DashboardShell>
      <DashboardHeader heading="メンバーシップ管理" description="" />
      <p className="text-md text-gray-700">
        メンバーシップ登録をすることで、非公開の投稿を閲覧することができます。
      </p>
      <div>
        {user?.isSubscribed ? (
          <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-lg font-semibold">契約中のプラン</h3>
            {plans.map((plan) => {
              const isSubscribed = plan.id === user.stripeSubscriptionId;

              return (
                <BenefitPlanCard
                  key={plan.id}
                  plan={plan}
                  className={`border p-4 rounded-md ${
                    isSubscribed
                      ? "border-blue-300 border-2"
                      : "border-gray-300"
                  }`}
                >
                  <div className="grid gap-2">
                    {isSubscribed && (
                      <span className="inline-block bg-blue-600 text-white text-center font-bold rounded text-sm py-1">
                        契約中です
                      </span>
                    )}
                    <SubscriptionManageButton />
                  </div>
                </BenefitPlanCard>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            <p>現在、契約中のプランはありません。</p>
            <Link href="/membership" passHref>
              <Button className="w-[220px] text-white hover:bg-blue-700">
                メンバーシップに登録する
              </Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
