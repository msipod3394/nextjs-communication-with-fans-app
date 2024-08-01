import { getServerSession } from "next-auth";

// セッションからユーザー情報を取得
export const getUserCurrent = async () => {
  const session = await getServerSession();
  return session?.user;
};
