import { z } from "zod";

export const AuthFormSchema = z.object({
  // メールアドレス
  email: z
    .string()
    .email({ message: "適切なメールアドレスを入力してください。" }),
  // パスワード
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上で入力してください。" })
    .max(10, { message: "パスワードは10文字以内で入力してください。" }),
});
