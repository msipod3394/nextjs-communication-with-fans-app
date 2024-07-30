import { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Auth オプション
export const AuthOptions: NextAuthOptions = {
  // 認証プロバイダーの設定
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  // サインインページの設定
  pages: {
    signIn: "/login",
  },
  // 認証後に返される情報
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
};
