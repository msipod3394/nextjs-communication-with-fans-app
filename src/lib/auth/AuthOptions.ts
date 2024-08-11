import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "../db";

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
  adapter: PrismaAdapter(db),
  // サインインページの設定
  pages: {
    signIn: "/login",
  },
  // 認証後に返される情報
  callbacks: {
    // ユーザーが存在する場合、トークンにユーザーIDを追加
    async jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    // サインイン後にAPIエンドポイントを叩く
    async signIn({ user }) {
      try {
        const apiUrl = `${process.env.NEXTAUTH_URL}/api/create-stripe-customer?API_ROUTE_SECRET=${process.env.API_ROUTE_SECRET}`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            record: {
              id: user.id,
              email: user.email,
            },
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "API call failed");
        }
        console.log("API呼び出し成功", data);
      } catch (error) {
        console.error("API呼び出し失敗", error);
      }
      return true;
    },
  },
  // セッション管理をJWTに切替
  session: {
    strategy: "jwt",
  },
};
