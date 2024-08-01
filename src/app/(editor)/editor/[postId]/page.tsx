import Editor from "@/components/editor/Editor";
import { db } from "@/lib/db";
import { getUserCurrent } from "@/lib/session";
import { User } from "@prisma/client";
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
  const user = await getUserCurrent();
  const userId = user?.id;

  if (!user) {
    redirect("/login");
  }

  const postId = params.postId;

  // 詳細記事の取得
  const post = await getPostForUser(postId, userId);
  // console.log("post", post);

  if (!post) {
    notFound();
  }

  return <Editor post={post} />;
}
