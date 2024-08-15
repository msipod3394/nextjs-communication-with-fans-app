import Editor from "@/components/editor/Editor";
import UploadImage from "@/components/editor/UploadImage";
import { db } from "@/lib/db";
import { getUserCurrent } from "@/lib/session";
import { getUserData } from "@/utils/getUserData";
import { Post, User } from "@prisma/client";
import { redirect } from "next/navigation";

type EditorProps = {
  params: { postId: string };
};

// 詳細記事のデータ取得
async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  const post = await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
  return post;
}

export default async function EditorPage({ params }: EditorProps) {
  // セッションとユーザー情報の取得
  const [session, user] = await Promise.all([getUserCurrent(), getUserData()]);
  if (!session || !user) {
    redirect("/login");
  }

  const userId = user.id;
  const postId = params.postId;

  // 記事の取得
  const post = await getPostForUser(postId, userId);

  // 投稿がなければ、ダッシュボードにリダイレクト
  if (!post) {
    redirect("/dashboard");
  }

  return (
    <>
      <UploadImage userId={userId} postId={postId} />
      <Editor post={post} />
    </>
  );
}
