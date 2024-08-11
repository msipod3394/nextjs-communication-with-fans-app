import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    // API呼び出しが適切なシークレットキーを含んでいるかどうかを確認
    const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
    if (query !== process.env.API_ROUTE_SECRET) {
      return NextResponse.json({
        message: "APIを叩く権限がありません",
      });
    }

    /**
     * stripeに顧客データを作成
     */
    // リクエストデータを取得
    const data = await req.json();
    const { id, email } = data.record;

    // stripe初期化
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // 顧客データ作成
    const customer = await stripe.customers.create({ email: email });

    // supabaseにstripe顧客idを追加
    const supabaseUser = await db.user.update({
      where: { id: id },
      data: { stripeCustomerId: customer.id },
    });

    return NextResponse.json({
      message: `stripeに顧客情報が追加されました ${customer.id}`,
    });
  } catch (error) {
    console.error("error", error);

    return NextResponse.json(
      {
        error: "サーバーエラー",
      },
      { status: 500 }
    );
  }
}
