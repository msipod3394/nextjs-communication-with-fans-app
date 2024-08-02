import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// stripeに顧客データを作成
export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email } = data;

  console.log(email);

  // stripe初期化
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // 顧客データ追加
  const customer = await stripe.customers.create({
    email,
  });
  console.log(customer);

  return NextResponse.json({
    message: `stripeに顧客情報が追加されました ${customer.id}`,
  });
}
