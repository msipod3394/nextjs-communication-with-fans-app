import { getUserData } from "@/utils/getUserData";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  // ユーザーデータの取得
  const user = await getUserData();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  // stripe初期化
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // カスタマーポータルを開く
  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
  });

  return NextResponse.json({ url: session.url });
}
