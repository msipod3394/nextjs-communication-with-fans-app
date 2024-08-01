"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Icon } from "../icon/icon";
import { Button, ButtonProps, buttonVariants } from "../ui/button";

interface PostCreateButtonProps extends ButtonProps {}

export const PostCreateButton = ({
  className,
  variant,
  ...props
}: PostCreateButtonProps) => {

  // クリック後の状態管理
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleLoading = () => setIsLoading((prev) => !prev);

  return (
    <Button
      className={cn(
        buttonVariants({ variant }),
        { "cursor-not-allowed opacity-60": isLoading }, // isLoadingがtrueの時に適用される
        className
      )}
      onClick={toggleLoading}
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
