import { SignInForm } from "@/components/auth/SignInForm";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="mx-auto w-full sm:w-[350px]">
      <div className="flex flex-col space-y-8 text-center">
        <div className="grid gap-4">
          <h1 className="font-semibold text-2xl md:text-3xl">新規登録</h1>
          <p className="text-sm text-muted-foreground">
            ログインするにはメールアドレスとパスワードを入力してください。
          </p>
        </div>
        <SignInForm />
        <p className="px-6 text-center text-sm text-muted-foreground">
          <Link
            href={"/login"}
            className="hover:text-brand underline underline-offset-4"
          >
            アカウントをお持ちの方はこちら
          </Link>
        </p>
      </div>
    </div>
  );
}
