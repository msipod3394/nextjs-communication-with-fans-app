"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";

export default function AuthNotifications() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const login = searchParams.get("login");

    if (login === "success") {
      // トーストを表示
      toast({
        title: "ログイン成功",
        description: `ログインに成功しました`,
      });
    }
  }, [searchParams]);
}
