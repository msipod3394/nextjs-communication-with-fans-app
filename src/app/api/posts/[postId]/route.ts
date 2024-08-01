import { AuthOptions } from "@/lib/auth/AuthOptions";
import { db } from "@/lib/db";
import { PostFormSchema } from "@/lib/editor/postFormSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// zodで型を取り出し、型定義
const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // postIdの取得（型の検証をした上で取り出す）
    const { params } = routeContextSchema.parse(context);

    // アクセス可能かのチェック
    if (!(await verifyCurrentUserHasAccessPost(params.postId))) {
      return NextResponse.json("アクセス権限がありません", { status: 403 });
    }

    // 更新データの取得、型の検証
    const json = await req.json();
    const body = PostFormSchema.parse(json);
    const { title, content } = body;

    // 記事のアップデート
    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    } else {
      return NextResponse.json("データベースエラー", { status: 500 });
    }
  }
}

// 削除
export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // postIdの取得（型の検証をした上で取り出す）
    const { params } = routeContextSchema.parse(context);
    const id = params.postId;

    // アクセス可能かのチェック
    if (!(await verifyCurrentUserHasAccessPost(params.postId))) {
      return NextResponse.json("アクセス権限がありません", { status: 403 });
    }

    // 記事のアップデート
    await db.post.delete({
      where: {
        id: params.postId,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    } else {
      return NextResponse.json("データベースエラー", { status: 500 });
    }
  }
}

// ログインユーザーがこの記事にアクセスする権限があるか
async function verifyCurrentUserHasAccessPost(postId: string) {
  // ユーザー情報を取得
  const session = await getServerSession(AuthOptions);

  // 投稿件数を取得（データを持っているか確認）
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
  });

  // 記事を持っていればアクセスOK
  return count > 0;
}
