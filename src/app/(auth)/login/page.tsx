import { AuthLogin } from "@/components/auth/AuthLogin";
import Link from "next/link";
import { pagesPath } from "../../../../utils/$path";

export default function Login() {
  return (
    <div className="mx-auto w-full sm:w-[360px]">
      <div className="flex flex-col space-y-8 text-center">
        <div className="grid gap-4">
          <h1 className="font-semibold text-2xl md:text-3xl">ログイン</h1>
          <p className="text-sm text-muted-foreground">
            いずれかの認証方法でログインしてください。
          </p>
        </div>
        <AuthLogin />
        <p className="px-6 text-center text-sm text-muted-foreground">
          <Link
            href={pagesPath.signup.$url().path}
            className="hover:text-brand underline underline-offset-4"
          >
            アカウントをお持ちでない方はこちら
          </Link>
        </p>
      </div>
    </div>
  );
}
