"use client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Icon } from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function SubscribePage() {
  // サブスクリプション登録処理の状態管理
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postSubscribe = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/create-stripe-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`APIリクエストエラー: ${response.statusText}`);
        return toast({
          title: "問題が発生しました",
          description:
            "サブスクリプションが作成されませんでした。もう一度お試しください。",
          variant: "destructive",
        });
      }

      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error("エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="サブスクリプション管理" description="" />
      <p className="text-md text-gray-700">
        サブスクリプション登録をすることで、非公開の投稿を閲覧することができます。
      </p>
      <Button
        className="w-1/2 mx-auto"
        onClick={postSubscribe}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icon.spinner className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Icon.billing className="w-4 h-4 mr-2" />
        )}
        サブスクリプション登録をする
      </Button>
    </DashboardShell>
  );
}
