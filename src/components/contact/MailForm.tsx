"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMailForm } from "@/hooks/useMailForm";
import Link from "next/link";
import { Icon } from "../icon/icon";
import { Textarea } from "../ui/textarea";

export const MailForm = () => {
  const { isSending, form, onSubmit } = useMailForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* お問合せ概要 */}
        <FormField
          control={form.control}
          name="inquiry_category"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>お問合せ概要</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="イベント出演の依頼" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      イベント出演の依頼
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="コラボレーションのご依頼" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      コラボレーションの依頼
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="その他" />
                    </FormControl>
                    <FormLabel className="font-normal">その他</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* お名前 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>お名前</FormLabel>
              <FormControl>
                <Input placeholder="山田太郎" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* メールアドレス */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="sample@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 電話番号 */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>電話番号</FormLabel>
              <FormControl>
                <Input placeholder="03-1234-5678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 会社名 */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>会社名</FormLabel>
              <FormControl>
                <Input placeholder="会社名を入力してください" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* お問合せ内容 */}
        <FormField
          control={form.control}
          name="inquiry_content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>お問合せ内容</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="お問合せ内容を入力してください"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* プライバシーポリシー */}
        <FormField
          control={form.control}
          name="privacy_policy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>個人情報の取り扱いに同意する</FormLabel>
                <FormDescription>
                  個人情報の取り扱いについては、
                  <Link href="/privacy/">こちら</Link>をご参照ください。
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSending}>
          {isSending && <Icon.spinner className="w-4 h-4 mr-4 animate-spin" />}
          <span>送信</span>
        </Button>
      </form>
    </Form>
  );
};
