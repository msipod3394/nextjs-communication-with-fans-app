import Editor from "@/components/editor/Editor";
import UploadImage from "@/components/editor/UploadImage";
import { db } from "@/lib/db";
import { getUserCurrent } from "@/lib/session";
import { getUserData } from "@/utils/getUserData";
import { Post, User } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

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

interface EditorProps {
  params: { postId: string };
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

  if (!post) {
    notFound();
  }

  return (
    <>
      <UploadImage userId={userId} postId={postId} />
      <Editor post={post} />
    </>
  );
}
