import { z } from "zod";

export const PostFormSchema = z.object({
  // タイトル
  title: z
    .string()
    .min(1, {
      message: "タイトルは1文字以上で入力してください",
    })
    .max(120, {
      message: "タイトルは120文字以内で入力してください",
    }),
  // 本文（オプション）
  content: z.any().optional(),
});

// z.inferでPostFormSchemaの型を抽出
export type PostFormSchemaType = z.infer<typeof PostFormSchema>;
