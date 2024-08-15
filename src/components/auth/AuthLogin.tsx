"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "../icon/icon";
import { Button } from "../ui/button";

export const AuthLogin = () => {
  const router = useRouter();

  // ログインに成功したら、パラメーターを渡す
  const handleLogin = async (provider: string) => {
    await signIn(provider, {
      callbackUrl: "/dashboard?login=success",
    });
  };

  // 認証状況の状態管理
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              GitHubで認証
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setIsGitHubLoading(true);
              handleLogin("github");
            }}
          >
            {isGitHubLoading ? (
              <Icon.spinner className="mr-2 animate-spin" />
            ) : (
              <Icon.github className="mr-2" />
            )}
            GitHub
          </Button>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Googleで認証
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setIsGoogleLoading(true);
              handleLogin("google");
            }}
          >
            {isGoogleLoading ? (
              <Icon.spinner className="mr-2 animate-spin" />
            ) : (
              <Icon.google className="mr-2" />
            )}
            Google
          </Button>
        </div>
      </div>
    </div>
  );
};
