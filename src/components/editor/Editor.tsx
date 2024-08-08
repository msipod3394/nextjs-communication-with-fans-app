"use client";
import {
  PostFormSchema,
  PostFormSchemaType,
} from "@/lib/editor/postFormSchema";
import { cn } from "@/lib/utils";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { Icon } from "../icon/icon";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "../ui/use-toast";

type EditorProps = {
  post: Post;
};

export default function Editor({ post }: EditorProps) {
  const ref = useRef<EditorJS>();
  const router = useRouter();

  // 保存中（API通信中）の状態管理
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // マウントしたかの状態管理
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // EditorJSのインスタンス化
  const initializeEditor = useCallback(async () => {
    // 型を検証
    const body = PostFormSchema.parse(post);

    const editor = new EditorJS({
      holder: "editor",
      onReady() {
        ref.current = editor;
      },
      placeholder: "ここに内容を書いてください",
      data: body.content,
      inlineToolbar: true,
      tools: {
        header: Header,
        list: {
          class: List,
          inlineToolbar: true,
        },
        // linkTool: LinkTool,
      },
    });
    return editor;
  }, [post]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  // 初回ロード時に発火
  useEffect(() => {
    if (isMounted) {
      initializeEditor();
    }
    return () => {
      ref.current?.destroy();
      ref.current = undefined;
    };
  }, [isMounted, initializeEditor]);

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
    const block = await ref.current?.save();
    // console.log("block", block);
    setIsSaving(true);

    // 更新用のAPI送信
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: block,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">公開状態：公開</p>
          <Button className={cn(buttonVariants())} type="submit">
            {isSaving && <Icon.spinner className="w-4 h-4 mr-2 animate-spin" />}
            <span>保存</span>
          </Button>
        </div>
        <div className="max-w-[800px]">
          <TextareaAutosize
            id="title"
            {...register("title")}
            placeholder="タイトルを入力してください"
            defaultValue={post.title}
            className="w-full resize-none overflow-hidden bg-transparent text-3xl font-bold text-gray-100 leading-normal tracking-wide focus:outline-none border-b py-4"
          ></TextareaAutosize>
        </div>
        <div id="editor" className="min-h-[500px]"></div>
        <p className="text-sm text-gray-500">
          USE
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>
          to open the command menu
        </p>
      </div>
    </form>
  );
}
