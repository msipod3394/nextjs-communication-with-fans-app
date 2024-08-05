"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const SubscriptionManageButton = () => {
  const router = useRouter();

  // sripeカスタマーポータルに通信
  const handleChangeSubscribe = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/portal`
    );
    const data = await response.json();

    router.push(data.url);
  };

  return (
    <Button className="w-[220px]" onClick={handleChangeSubscribe}>
      メンバーシップの変更
    </Button>
  );
};
