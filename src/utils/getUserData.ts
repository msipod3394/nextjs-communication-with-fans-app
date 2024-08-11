import { db } from "@/lib/db";
import { getUserCurrent } from "@/lib/session";
import { User } from "@prisma/client";

// type UserData = Pick<
//   User,
//   "id" | "email" | "isSubscribed" | "stripeCustomerId" | "stripeSubscriptionId"
// >;

// Stripeから商品情報を取得
export const getUserData = async (): Promise<User | null> => {
  // ユーザーセッションの取得
  const user = await getUserCurrent();

  if (!user || !user.email) {
    console.error("ユーザーの取得に失敗しました");
    return null;
  }

  // セッションIDから
  const supabaseUser = await db.user.findUnique({
    where: { email: user.email },
    // select: {
    //   id: true,
    //   email: true,
    //   isSubscribed: true,
    //   stripeCustomerId: true,
    //   stripeSubscriptionId: true,
    // },
  });

  return supabaseUser;
};
