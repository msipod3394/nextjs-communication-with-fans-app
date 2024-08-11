import { getUserData } from "@/utils/getUserData";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(
  req: NextRequest,
  { params }: { params: { priceId: string } }
) {
  // priceIdの取得
  const priceId = params.priceId;

  // ユーザーデータの取得
  const user = await getUserData();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  /**
   * 決済処理
   */
  // stripe初期化
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // customer が string 型であることを確認
  const customerId = user.stripeCustomerId;
  if (typeof customerId !== "string") {
    return NextResponse.json("Invalid customer ID", { status: 400 });
  }

  // 決済処理
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership/success/`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership/canceled/`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
