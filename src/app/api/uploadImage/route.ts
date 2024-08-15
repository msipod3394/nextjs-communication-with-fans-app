import { AuthOptions } from "@/lib/auth/AuthOptions";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const imageCreateSchema = z.object({
  userId: z.string(),
  postId: z.string(),
  imageName: z.string(),
  imageUrl: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    // セッション取得
    const session = await getServerSession(AuthOptions);
    if (!session) {
      return NextResponse.json("アクセス権限がありません", { status: 403 });
    }

    // リクエストボディの取得と型検証
    const json = await req.json();
    const body = imageCreateSchema.parse(json);
    const { userId, postId, imageName, imageUrl } = body;

    // console.log(userId, postId, imageName, imageUrl);

    // DBに新規作成
    const createImage = await db.images.create({
      data: {
        userId,
        postId,
        imageName,
        imageUrl,
      },
      // idだけ取得
      select: {
        id: true,
      },
    });

    return NextResponse.json(createImage);
  } catch (error) {
    console.error("エラー:", error);
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
