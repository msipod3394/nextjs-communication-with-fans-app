import { EmailTemplate } from "@/components/contact/EmailTemplate";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, company, inquiry_category, inquiry_content } =
    await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "お問合せ <onboarding@resend.dev>",
      to: ["msipod3394@gmail.com"],
      subject: "フォームからお問い合わせがありました",
      react: EmailTemplate({
        name,
        email,
        phone,
        company,
        inquiry_category,
        inquiry_content,
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
      return toast({
        title: "問題が発生しました",
        description: "投稿が保存されませんでした。もう一度お試しください。",
        variant: "destructive",
      });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });

  }
}
