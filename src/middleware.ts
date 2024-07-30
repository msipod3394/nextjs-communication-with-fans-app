import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    try {
      const token = await getToken({ req });
      // console.log("Token:", token);

      // 特定のページかつトークンが存在する場合の処理
      const isAuth = !!token;
      const isAuthPage =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/signup");

      if (isAuthPage) {
        if (isAuth) {
          // ダッシュボードにリダイレクト
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return null;
      }

      // トークンが存在しない場合の処理
      if (!isAuth) {
        // ログインページにリダイレクト
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
  },
  {
    callbacks: {
      // 無限ループが起こってしまうので、常にtrueに設定
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
