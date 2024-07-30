import { z } from "zod";

export const AuthFormSchema = z.object({
  // メールアドレス
  email: z
    .string()
    .email({ message: "適切なメールアドレスを入力してください。" }),
  // パスワード
  password: z
    .string()
    .min(2, { message: "パスワードは2文字以上で入力してください。" })
    .max(10, { message: "パスワードは10文字以内で入力してください。" }),
});
