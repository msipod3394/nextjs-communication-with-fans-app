import AuthNotifications from "@/components/auth/AuthNotifications";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PostCreateButton } from "@/components/dashboard/PostCreateButton";
import { PostItem } from "@/components/dashboard/PostItem";
import { AuthOptions } from "@/lib/auth/AuthOptions";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export default async function DashboardPage() {
  // セッションの取得
  const session = await getServerSession(AuthOptions);

  // 取得できなければ、リダイレクト
  if (!session) {
    return NextResponse.redirect("/login");
  }

  // postテーブルから情報取得
  const posts = await db.post.findMany({
    where: {
      authorId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
      authorId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <DashboardShell>
        <DashboardHeader
          heading="写真投稿"
          description="イベントで撮影した写真をシェアすることができます"
        >
          <PostCreateButton />
        </DashboardHeader>
        <div>
          {posts.length ? (
            <div className="divide-y border rounded-md">
              {posts.map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="grid grid-1">
              <p className="font-semibold text-gray-100">
                写真を投稿してみましょう！
              </p>
            </div>
          )}
        </div>
      </DashboardShell>
          {/* <AuthNotifications /> */}
    </>
  );
}
