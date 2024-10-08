"use client";
import { useHandleDelete } from "@/hooks/useHandleDelete";
import {
  PostFormSchema,
  PostFormSchemaType,
} from "@/lib/editor/postFormSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { Icon } from "../icon/icon";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "../ui/use-toast";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

type EditorProps = {
  post: Post;
};

export default function Editor({ post }: EditorProps) {
  const router = useRouter();

  // 保存中（API通信中）の状態管理
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // 削除の状態管理
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // RHFで状態・バリデーション管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormSchemaType>({
    resolver: zodResolver(PostFormSchema),
  });

  const onSubmit = async (data: PostFormSchemaType) => {
    // コンテンツ情報の取得
    setIsSaving(true);

    // 更新用のAPI送信
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("送信エラー:", errorData);

      toast({
        title: "送信エラー",
        description: "正常に送信されませんでした。もう一度お試しください。",
        variant: "destructive",
      });
    }

    // 成功した場合
    router.refresh();
    toast({
      title: "更新しました",
      description: "記事が正常に更新されました。",
    });
  };

  // 投稿を破棄
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const handleDelete = useHandleDelete(post.id, setShowDeleteAlert);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-8 mb-16">
        <div className="max-w-[800px]">
          <TextareaAutosize
            id="title"
            {...register("title")}
            placeholder="タイトルを入力してください"
            defaultValue={post.title}
            className="w-full resize-none overflow-hidden bg-transparent text-2xl font-bold text-gray-100 leading-normal tracking-wide focus:outline-none border-b py-4"
          ></TextareaAutosize>
          {errors.title && (
            <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
          )}
        </div>
        <div className="max-w-[800px]">
          <TextareaAutosize
            id="content"
            {...register("content")}
            placeholder="テキストを入力してください"
            defaultValue={post.content}
            minRows={10}
            className="w-full resize-none overflow-hidden bg-transparent text-base text-gray-100 leading-normal tracking-wide focus:outline-none border-b py-4"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-2">
              {errors.content.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Button className={cn(buttonVariants())} type="submit">
          {isSaving && <Icon.spinner className="w-4 h-4 mr-2 animate-spin" />}
          <span>メモを保存</span>
        </Button>
        <Button
          className={cn(buttonVariants({ variant: "destructive" }))}
          type="button"
          onClick={() => setShowDeleteAlert(true)}
        >
          <span className="text-white">投稿を削除</span>
        </Button>
      </div>

      {/* 削除確認ダイアログ */}
      <DeleteConfirmDialog
        open={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </form>
  );
}
