import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  console.log("webhook dispatch");

  // stripe初期化
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // 署名シークレット
  const endpointSecret = process.env.STRIPE_SIGNING_SECRET!;

  const signature = req.headers.get("stripe-signature");

  // リクエストをbufferに変換
  const reqBuffer = Buffer.from(await req.arrayBuffer());

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature!,
      endpointSecret
    );

    // イベントのタイプによってusersテーブルを更新
    switch (event.type) {
      // 作成時
      case "customer.subscription.created":
        const customerSubscriptionCreated = event.data.object;

        // userテーブル更新
        const supabaseUser = await db.user.update({
          where: { stripeCustomerId: event.data.object.customer },
          data: {
            isSubscribed: true,
            stripeSubscriptionId:
              customerSubscriptionCreated.items.data[0].plan.id,
          },
        });

        break;

      // 削除時
      case "customer.subscription.deleted":
        console.log("customer.subscription.deleted");
        const customerSubscriptionDeleted = event.data.object;

        // // userテーブルのサブスク状態を true に変更
        // const supabaseUser = await db.user.update({
        //   where: { id: user.id },
        //   data: {
        //     isSubscribed: false,
        //     // subscriptionPlan:customerSubscriptionCreated.items.data[0].plan
        //   },
        // });

        break;

      // 更新時
      case "customer.subscription.updated":
        console.log("customer.subscription.updated");
        const customerSubscriptionUpdated = event.data.object;

        // // userテーブルのサブスク状態を true に変更
        // const supabaseUser = await db.user.update({
        //   where: { id: user.id },
        //   data: { isSubscribed: false },
        // });

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    console.log("event", event);
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json(`Webhook Error: ${err.message}`, { status: 401 });
  }
}
