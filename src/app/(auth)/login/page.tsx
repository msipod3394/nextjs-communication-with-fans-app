import { AuthLogin } from "@/components/auth/AuthLogin";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="mx-auto w-full sm:w-[350px]">
      <div className="flex flex-col space-y-8 text-center">
        <div className="grid gap-4">
          <h1 className="font-semibold text-2xl md:text-3xl">ログイン</h1>
          <p className="text-sm text-muted-foreground">
            ログインするには、
            <br />
            メールアドレスとパスワードを入力してください。
          </p>
        </div>
        <LoginForm />
        <AuthLogin />
        <p className="px-6 text-center text-sm text-muted-foreground">
          <Link
            href={"/signup"}
            className="hover:text-brand underline underline-offset-4"
          >
            アカウントをお持ちでない方はこちら
          </Link>
        </p>
      </div>
    </div>
  );
}
