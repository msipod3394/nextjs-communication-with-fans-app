"use client";
import { TextField } from "@/app/components/elements/form/TextField";
import { useLoginForm } from "@/hooks/useLoginForm";
import { Icon } from "../icon/icon";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

export const LoginForm = () => {
  const { isSending, form, onSubmit } = useLoginForm();

  return (
    <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
        {/* メールアドレス */}
        <TextField
          control={form.control}
          name="email"
          label="メールアドレス"
          placeholder="sample@gmail.com"
        />
        {/* パスワード */}
        <TextField control={form.control} name="password" label="パスワード" />
        <Button type="submit" disabled={isSending}>
          {isSending && <Icon.spinner className="w-4 h-4 mr-4 animate-spin" />}
          <span>送信</span>
        </Button>
      </form>
    </Form>
    
  );
};
