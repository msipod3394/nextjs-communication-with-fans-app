import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  // console.log("webhook dispatch");

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
        await db.user.update({
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
        // console.log("customer.subscription.deleted");
        const customerSubscriptionDeleted = event.data.object;

        // userテーブルのサブスク状態を false に変更
        await db.user.update({
          where: { stripeCustomerId: customerSubscriptionDeleted.customer },
          data: {
            isSubscribed: false,
            stripeSubscriptionId: null,
          },
        });

        break;

      // 更新時
      case "customer.subscription.updated":
        // console.log("customer.subscription.updated");
        const customerSubscriptionUpdated = event.data.object;

        if (customerSubscriptionUpdated.status === "canceled") {
          await db.user.update({
            where: { stripeCustomerId: customerSubscriptionDeleted.customer },
            data: {
              isSubscribed: false,
              stripeSubscriptionId: null,
            },
          });
          break;
        } else {
          // userテーブルのサブスク状態を true に変更
          await db.user.update({
            where: { stripeCustomerId: customerSubscriptionUpdated.customer },
            data: {
              isSubscribed: true,
              stripeSubscriptionId:
                customerSubscriptionUpdated.items.data[0].plan.id,
            },
          });
          break;
        }
      default:
      // console.log(`${event.type}`);
    }
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json(`Webhook Error: ${err.message}`, { status: 401 });
  }
}
