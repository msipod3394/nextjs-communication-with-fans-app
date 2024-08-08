import Editor from "@/components/editor/Editor";
import UploadImage from "@/components/editor/UploadImage";
import { db } from "@/lib/db";
import { getUserCurrent } from "@/lib/session";
import { getUserData } from "@/utils/getUserData";
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
  const session = await getUserCurrent();
  const user = await getUserData();

  if (!session || !user) {
    redirect("/login");
  }

  const userId = user.id;
  const postId = params.postId;

  // console.log(userId, postId);

  // 詳細記事の取得
  const post = await getPostForUser(postId, userId);
  // console.log("post", post);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Editor post={post} />
      <UploadImage userId={userId} postId={postId} />
    </>
  );
}
