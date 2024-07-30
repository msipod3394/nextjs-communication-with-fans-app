import { useToast } from "@/components/ui/use-toast";
import { useContactFormContext } from "@/contexts/ContactFormContext";
import { formSchema } from "@/lib/contact/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export const useContactForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  // 送信内容を完了画面に渡すためのコンテキスト
  const { setValues } = useContactFormContext();

  // 送信状態の管理
  const [isSending, setIsSending] = useState<boolean>(false);

  // useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      inquiry_category: "",
      inquiry_content: "",
      privacy_policy: false,
    },
  });

  // フォームの値をAPIに送信
  const sendForm = async (values: z.infer<typeof formSchema>) => {
    const { name, email, phone, company, inquiry_category, inquiry_content } =
      values;

    // APIにPOSTで送信
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/send/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          inquiry_category,
          inquiry_content,
        }),
      }
    );

    // レスポンスエラーの場合はトーストで通知
    if (!response.ok) {
      const errorData = await response.json();
      console.error("送信エラー:", errorData);

      toast({
        title: "送信エラー",
        description: "正常に送信されませんでした。もう一度お試しください。",
        variant: "destructive",
      });
    }

    return response.json();
  };

  // onSubmit
  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      // ローディング開始
      setIsSending(true);

      try {
        // sendForm実行
        await sendForm(values);

        // コンテキストにデータを設定
        setValues(values);

        // 完了ページにリダイレクト
        router.push("/contact/complete/");
      } catch (error) {
        console.error("送信エラー:", error);
        // ネットワークエラーなどが発生した場合の処理
        toast({
          title: "送信エラー",
          description:
            "通信エラーが発生しました。ネットワーク接続を確認してください。",
          variant: "destructive",
        });
        throw error;
      } finally {
        // ローディング終了
        setIsSending(false);
      }
    },
    [router, setValues]
  );

  return { isSending, form, onSubmit };
};
