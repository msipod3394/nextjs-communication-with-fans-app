import { AuthOptions } from "@/lib/auth/AuthOptions";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(), // オプション
});

export async function POST(req: NextRequest) {
  try {
    // セッション取得
    const session = await getServerSession(AuthOptions);
    // セッションがなければ、403エラーを返す
    if (!session) {
      return NextResponse.json("アクセス権限がありません", { status: 403 });
    }

    // console.log(session);
    const { user } = session;

    // リクエストボディの取得と型検証
    const json = await req.json();
    const body = postCreateSchema.parse(json);
    const { title, content } = body;

    // DBに新規作成
    const post = await db.post.create({
      data: {
        title,
        content: content ?? "",
        authorId: user.id,
      },
      // idだけ取得
      select: {
        id: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    // Zodエラーの場合
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
