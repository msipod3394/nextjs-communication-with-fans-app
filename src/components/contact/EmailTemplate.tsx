import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiry_category: string;
  inquiry_content: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  company,
  inquiry_category,
  inquiry_content,
}) => (
  <div>
    <h1>「{inquiry_category}」のお問合せがありました</h1>
    <h2>【お問合せ内容】</h2>
    <p>お名前：{name}</p>
    <p>メールアドレス：{email}</p>
    <p>電話番号：{phone}</p>
    <p>会社名：{company}</p>
    <p>お問合せ概要：{inquiry_category}</p>
    <p>お問合せ内容：{inquiry_content}</p>
  </div>
);
