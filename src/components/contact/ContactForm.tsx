"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useContactForm } from "@/hooks/useContactForm";
import { Icon } from "../icon/icon";
import { PrivacyPolicyField } from "./FormField/PrivacyPolicyField";
import { RadioField } from "./FormField/RadioField";
import { TextField } from "./FormField/TextField";
import { TextareaField } from "./FormField/TextareaField";

export const ContactForm = () => {
  // カスタムフックの呼び出し
  const { isSending, form, onSubmit } = useContactForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* お問合せ概要 */}
        <RadioField
          control={form.control}
          name="inquiry_category"
          label="お問合せ概要"
          required={true}
          radioArray={["イベント出演の依頼", "コラボレーションのご依頼"]}
        />

        {/* お名前 */}
        <TextField
          control={form.control}
          name="name"
          label="お名前"
          placeholder="山田太郎"
          required={true}
        />

        {/* メールアドレス */}
        <TextField
          control={form.control}
          name="email"
          label="メールアドレス"
          placeholder="sample@gmail.com"
          required={true}
        />

        {/* 電話番号 */}
        <TextField
          control={form.control}
          name="phone"
          label="電話番号"
          placeholder="03-1234-5678"
          required={false}
        />

        {/* 会社名 */}
        <TextField
          control={form.control}
          name="company"
          label="会社名"
          placeholder="会社名を入力してください"
          required={false}
        />

        {/* お問合せ内容 */}
        <TextareaField
          control={form.control}
          name="inquiry_content"
          label="お問合せ内容"
          placeholder="お問合せ内容を入力してください"
          required={false}
        />

        {/* プライバシーポリシー */}
        <PrivacyPolicyField
          control={form.control}
          name="privacy_policy"
          link="/privacy"
          required={true}
        />

        <Button type="submit" disabled={isSending}>
          {isSending && <Icon.spinner className="w-4 h-4 mr-4 animate-spin" />}
          <span>送信</span>
        </Button>
      </form>
    </Form>
  );
};
