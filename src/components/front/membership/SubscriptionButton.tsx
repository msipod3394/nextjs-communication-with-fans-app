"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SubscriptionButtonProps = {
  planId: string;
  user: User | null;
  showSubscribeButton: boolean | undefined;
  showManageSubscriptionButton: boolean | undefined;
  showCreateAccountButton: boolean | undefined;
};

export const SubscriptionButton = ({
  planId,
  user = null,
  showSubscribeButton,
  showManageSubscriptionButton,
  showCreateAccountButton,
}: SubscriptionButtonProps) => {
  const router = useRouter();

  // メンバーシップ登録状態
  const isRegistered = user ? planId === user.stripeSubscriptionId : false;

  // メンバーシップ契約実行
  const SignupSubscription = async (planId: string) => {
    const response = await fetch(`/api/subscription/${planId}`);
    const data = await response.json();

    // 決済画面へリダイレクト
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({
      sessionId: data.id,
    });
  };

  // メンバーシップ管理ページへリダイレクト
  const goToSubscriptionManagement = () => {
    router.push("/subscribe");
  };

  return (
    <>
      {showSubscribeButton && (
        <Button className="w-full" onClick={() => SignupSubscription(planId)}>
          メンバーシップ登録
        </Button>
      )}
      {showManageSubscriptionButton && (
        <Button
          className={`w-full ${
            isRegistered && "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={goToSubscriptionManagement}
          // onClick={
          //   isRegistered
          //     ? goToSubscriptionManagement
          //     : () => SignupSubscription(planId)
          // }
        >
          {isRegistered ? "ただいま契約中" : "メンバーシップ変更"}
        </Button>
      )}
      {showCreateAccountButton && (
        <Button className="block w-full">
          <Link href="/login" className="block w-full">
            ログイン
          </Link>
        </Button>
      )}
    </>
  );
};
