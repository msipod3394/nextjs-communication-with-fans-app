"use client";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

type SubscriptionButtonProps = {
  planId: string;
  showSubscribeButton: boolean;
  showManageSubscriptionButton: boolean;
  showCreateAccountButton: boolean;
};

export const SubscriptionButton = ({
  planId,
  showSubscribeButton,
  showManageSubscriptionButton,
  showCreateAccountButton,
}: SubscriptionButtonProps) => {
  // console.log("planId", planId);

  // サブスクリプション契約実行ボタン
  const signupSubscription = async (planId: string) => {
    const response = await fetch(`/api/subscription/${planId}`);
    const data = await response.json();

    // 決済画面へリダイレクト
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return (
    <>
      {showSubscribeButton && (
        <Button className="w-full" onClick={() => signupSubscription(planId)}>
          サブスクリプション登録
        </Button>
      )}
      {showManageSubscriptionButton && (
        <Button className="w-full">
          <Link href={"/subscribe"}>サブスクリプションを管理する</Link>
        </Button>
      )}
      {showCreateAccountButton && <Button className="w-full">ログイン</Button>}
    </>
  );
};
