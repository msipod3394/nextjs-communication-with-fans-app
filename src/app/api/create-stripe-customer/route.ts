import { AuthOptions } from "@/lib/auth/AuthOptions";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    /**
     * stripeに顧客データを作成
     */
    const data = await req.json();
    const { email } = data;

    // stripe初期化
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // 顧客データ作成
    const customer = await stripe.customers.create({ email });

    /**
     * supabaseにstripe顧客idを追加
     */
    // セッション取得
    const session = await getServerSession(AuthOptions);

    // セッションがなければ、403エラーを返す
    if (!session) {
      return NextResponse.json("アクセス権限がありません", { status: 403 });
    }

    // セッションからuserを取り出す
    const { user } = session;

    // supabaseにstripe顧客idを追加
    const supabaseUser = await db.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });
    console.log(supabaseUser);

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
