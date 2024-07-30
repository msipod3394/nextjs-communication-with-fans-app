import { useToast } from "@/components/ui/use-toast";
import { AuthFormSchema } from "@/lib/auth/AuthFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useSignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  // 送信状態の管理
  const [isSending, setIsSending] = useState<boolean>(false);

  // useForm
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // onSubmit
  const onSubmit: SubmitHandler = useCallback(
    (values: z.infer<typeof AuthFormSchema>) => {
      console.log(values);
    },
    [router]
  );

  return { isSending, form, onSubmit };
};
