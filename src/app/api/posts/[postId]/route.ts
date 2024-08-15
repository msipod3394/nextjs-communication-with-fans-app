import { AuthOptions } from "@/lib/auth/AuthOptions";
import { db } from "@/lib/db";
import { PostFormSchema } from "@/lib/editor/postFormSchema";
import { supabase } from "@/lib/supabaseClient";
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

    // 画像URL
    const public_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-image-bucket/`;

    // アクセス可能かのチェック
    if (!(await verifyCurrentUserHasAccessPost(id))) {
      return NextResponse.json("アクセス権限がありません", { status: 403 });
    }

    // 削除前に記事データ取得
    const post = await db.post.findUnique({
      where: {
        id,
      },
      select: {
        authorId: true,
      },
    });

    if (!post) {
      return NextResponse.json("記事が見つかりません", { status: 404 });
    }

    // storageの画像削除
    const images = await db.images.findMany({
      where: {
        userId: post.authorId,
      },
      select: {
        imageUrl: true,
      },
    });

    // 画像URLからファイルパスを抽出
    const filePaths = images.map((image) =>
      image.imageUrl.replace(public_url, "")
    );

    if (filePaths.length > 0) {
      const { error: deleteError } = await supabase.storage
        .from("public-image-bucket")
        .remove(filePaths);

      if (deleteError) {
        console.error("画像削除エラー:", deleteError.message);
        return NextResponse.json("画像削除エラー", { status: 500 });
      }
    }

    // 記事の削除
    await db.post.delete({
      where: {
        id,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("削除処理中にエラーが発生しました:", error);
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
