import { db } from "@/lib/db";
import { getUserCurrent } from "@/lib/session";

// Stripeから商品情報を取得
export const getUserData = async () => {
  // ユーザーセッションの取得
  const user = await getUserCurrent();

  if (!user || !user.email) {
    console.error("ユーザーの取得に失敗しました");
    return null;
  }

  // セッションIDから
  const supabaseUser = await db.user.findUnique({
    where: { email: user.email },
    select: {
      id: true,
      email: true,
      isSubscribed: true,
      stripeCustomerId: true,
    },
  });

  return supabaseUser;
};
