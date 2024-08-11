import { useToast } from "@/components/ui/use-toast";
import { AuthFormSchema } from "@/lib/auth/AuthFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type AuthFormValues = z.infer<typeof AuthFormSchema>;

export const useLoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  // 送信状態の管理
  const [isSending, setIsSending] = useState<boolean>(false);

  // useForm
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // onSubmit
  const onSubmit: SubmitHandler<AuthFormValues> = useCallback(
    (values: AuthFormValues) => {
      console.log(values);
    },
    [router]
  );

  return { isSending, form, onSubmit };
};
