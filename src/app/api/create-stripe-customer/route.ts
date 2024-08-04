import { AuthOptions } from "@/lib/auth/AuthOptions";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    // API呼び出しが適切なシークレットキーを含んでいるかどうかを確認
    // const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
    // console.log("query", query);
    // if (query !== process.env.API_ROUTE_SECRET) {
    //   return NextResponse.json({
    //     message: "APIを叩く権限がありません",
    //   });
    // }

    /**
     * stripeに顧客データを作成
     */
    // リクエストデータを取得
    // const data = await req.json();
    // const { id, email } = data.record;
    // console.log("リクエストデータを取得", data);

    // stripe初期化
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // セッション取得
    const session = await getServerSession(AuthOptions);

    // セッションがなければ、403エラーを返す
    if (!session) {
      return NextResponse.json("アクセス権限がありません", { status: 403 });
    }

    // セッションからuserを取り出す
    const { user } = session;

    /**
     * supabaseにstripe顧客idを追加
     */

    // 顧客データ作成
    const customer = await stripe.customers.create({ email: user.email });
    // console.log("customer", customer);

    // supabaseにstripe顧客idを追加
    const supabaseUser = await db.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });
    // console.log("supabaseUser", supabaseUser);

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
