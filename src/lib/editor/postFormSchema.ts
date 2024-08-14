import { z } from "zod";

export const PostFormSchema = z.object({
  // タイトル
  title: z
    .string()
    .min(1, {
      message: "タイトルの入力は必須です",
    })
    .max(120, {
      message: "タイトルは120文字以内で入力してください",
    }),
  // 本文（オプション）
  content: z
    .string()
    .max(200, {
      message: "本文は200文字以内で入力してください",
    })
    .optional(),
});

// z.inferでPostFormSchemaの型を抽出
export type PostFormSchemaType = z.infer<typeof PostFormSchema>;
