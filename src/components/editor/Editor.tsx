"use client";
import { cn } from "@/lib/utils";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button, buttonVariants } from "../ui/button";

export default function Editor() {
  // マウントしたかの状態管理
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // EditorJSのインスタンス化
  const initializeEditor = async () => {
    const editor = new EditorJS({
      holder: "editor",
      placeholder: "ここに内容を書いてください",
      inlineToolbar: true,
      tools: {
        header: Header,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "/api/uploadFile",
              byUrl: "/api/fetchUrl",
            },
            field: "image", // フォームデータフィールド名の指定
            types: "image/*", // 許可されるファイルタイプ
          },
        },
      },
    });

    return editor;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  // 初回ロード時に発火
  useEffect(() => {
    let editor;
    if (isMounted) {
      initializeEditor().then((instance) => {
        editor = instance;
      });
    }
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [isMounted]);

  return (
    <form>
      <div className="grid gap-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">公開状態：公開</p>
          <Button className={cn(buttonVariants())} type="submit">
            <span>保存</span>
          </Button>
        </div>
        <div>
          <TextareaAutosize
            id="title"
            placeholder="タイトルを入力してください"
            className="w-full resize-none overflow-hidden bg-transparent text-3xl font-bold text-gray-800 leading-normal tracking-wide focus:outline-none border-b py-4"
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
