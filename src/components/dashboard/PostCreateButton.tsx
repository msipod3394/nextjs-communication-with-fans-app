"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "../icon/icon";
import { Button, ButtonProps, buttonVariants } from "../ui/button";
import { toast } from "../ui/use-toast";

interface PostCreateButtonProps extends ButtonProps {}

export const PostCreateButton = ({
  className,
  variant,
  ...props
}: PostCreateButtonProps) => {
  const router = useRouter();

  // クリック後の状態管理
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendPost = async () => {
    setIsLoading(true);

    // PostsAPIの実行
    const response = await fetch("api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "作品名",
        content: "",
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      return toast({
        title: "問題が発生しました",
        description: "投稿が作成されませんでした。もう一度お試しください。",
        variant: "destructive",
      });
    }

    const post = await response.json();

    router.refresh();
    router.push(`editor/${post.id}`);
  };

  return (
    <Button
      className={cn(
        buttonVariants({ variant }),
        { "cursor-not-allowed opacity-60": isLoading }, // isLoadingがtrueの時に適用される
        className
      )}
      onClick={sendPost}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon.spinner className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Icon.post className="w-4 h-4 mr-2" />
      )}
      新しい投稿
    </Button>
  );
};
