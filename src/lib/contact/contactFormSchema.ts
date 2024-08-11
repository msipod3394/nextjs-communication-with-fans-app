import { z } from "zod";

// 電話番号の正規表現
const phoneRegex = /^(\d{2,4}-?\d{2,4}-?\d{4})$/;

export const ContactFormSchema = z.object({
  // お名前
  name: z
    .string()
    .min(2, { message: "名前は2文字以上で入力してください。" })
    .max(20, { message: "名前は20文字以内で入力してください。" }),
  // メールアドレス
  email: z
    .string()
    .email({ message: "適切なメールアドレスを入力してください。" }),
  // 電話番号
  phone: z
    .string()
    .regex(phoneRegex, {
      message: "適切な電話番号を入力してください。",
    }),
  // 会社名
  company: z.string(),
  // お問合せ概要
  inquiry_category: z
    .string()
    .nonempty({ message: "お問い合わせ内容を選択してください。" }),
  // お問合せ内容
  inquiry_content: z.string(),
  // 個人情報の取り扱いに同意する
  privacy_policy: z.boolean().refine((val) => val === true, {
    message: "個人情報の取り扱いに同意する必要があります。",
  }),
});
