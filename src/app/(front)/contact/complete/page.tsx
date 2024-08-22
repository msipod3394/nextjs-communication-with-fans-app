"use client";
import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { Icon } from "@/components/icon/icon";
import { buttonVariants } from "@/components/ui/button";
import { fontRoboto } from "@/configs/font";
import { useContactFormContext } from "@/contexts/ContactFormContext"; // コンテキストをインポート
import { cn } from "@/lib/utils";
import Link from "next/link";
import { pagesPath } from "../../../../../utils/$path";

export default function ContactPage() {
  const { values } = useContactFormContext();

  return (
    <div className="grid gap-8 py-16 px-16">
      <FrontHeading heading="Contact" description="送信完了" />
      <p>お問合せありがとうございます。下記の内容で受け付けました。</p>
      {values && (
        <div>
          <h2>【お問合せ内容】</h2>
          <p>お問合せ概要：{values.inquiry_category}</p>
          <p>お名前：{values.name}</p>
          <p>メールアドレス：{values.email}</p>
          <p>電話番号：{values.phone}</p>
          {values.company && <p>会社名：{values.company}</p>}
          {values.inquiry_content && (
            <p>お問合せ内容：{values.inquiry_content}</p>
          )}
        </div>
      )}
      <div className="mt-8 flex justify-center py-6 lg:py-10">
        <Link
          href={pagesPath.$url().path}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icon.chevronLeft className="w-4 h-4 mr-1" />
          <span className={`${fontRoboto.className} text-md`}>Back to Top</span>
        </Link>
      </div>
    </div>
  );
}
