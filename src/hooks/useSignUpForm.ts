import { useToast } from "@/components/ui/use-toast";
import { AuthFormSchema } from "@/lib/auth/AuthFormSchema";
import { supabase } from "@/lib/supabaseClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { pagesPath } from "../../utils/$path";

type AuthFormValues = z.infer<typeof AuthFormSchema>;

export const useSignUpForm = () => {
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
    async (values) => {
      const { email, password } = values;

      setIsSending(true);

      try {
        // サインアップ
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          // console.log("signUpError");
          throw signUpError;
        }

        // router.push("/auth/login");
        router.push(pagesPath.contact.$url);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setIsSending(false);
      }
    },
    [router]
  );

  return { isSending, form, onSubmit };
};
