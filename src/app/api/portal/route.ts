import { getUserData } from "@/utils/getUserData";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  // ユーザーデータの取得
  const user = await getUserData();

  if (!user || !user.stripeCustomerId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  // 環境変数のチェック
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!stripeSecretKey || !baseUrl) {
    return NextResponse.json("Server configuration error", { status: 500 });
  }

  // stripe初期化
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // customer が string 型であることを確認
  const customerId = user.stripeCustomerId;
  if (typeof customerId !== "string") {
    return NextResponse.json("Invalid customer ID", { status: 400 });
  }

  // カスタマーポータルを開く
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${baseUrl}/subscribe`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
