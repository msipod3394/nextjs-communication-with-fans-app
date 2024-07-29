"use client";
import { useContactForm } from "@/contexts/ContactFormContext"; // コンテキストをインポート

export default function ContactPage() {
  const { values } = useContactForm();

  return (
    <div className="grid gap-8 py-16 px-16">
      <h2>お問合せフォーム</h2>
      <p>お問い合わせが完了しました</p>
      {values && (
        <div>
          <h2>【お問合せ内容】</h2>
          <p>お名前：{values.name}</p>
          <p>メールアドレス：{values.email}</p>
          <p>電話番号：{values.phone}</p>
          <p>会社名：{values.company && values.company}</p>
          <p>お問合せ概要：{values.inquiry_category}</p>
          <p>
            お問合せ内容：{values.inquiry_content && values.inquiry_content}
          </p>
        </div>
      )}
    </div>
  );
}
