import { useContactForm } from "@/contexts/ContactFormContext";
import { formSchema } from "@/libs/contact/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export const useMailForm = () => {
  const router = useRouter();

  const { setValues } = useContactForm();

  const [isSending, setisSending] = useState<boolean>(false);

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

  // 送信後の処理
  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setisSending(true);

      const { name, email, phone, company, inquiry_category, inquiry_content } =
        values;

      try {
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

        setisSending(false);

        if (!response.ok) {
          return toast({
            title: "問題が発生しました",
            description: "正常に送信されませんでした。もう一度お試しください。",
            variant: "destructive",
          });
        }

        // コンテキストにデータを設定
        setValues(values);

        // 完了ページにリダイレクト
        router.push("/contact/complete/");
      } catch (error) {
        console.log(error);
      }
    },
    [router, setValues]
  );

  return { isSending, form, onSubmit };
};
