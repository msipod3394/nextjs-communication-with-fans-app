import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="grid gap-8 p-16 mx-auto w-full sm:w-[1000px]">
      <h2 className="">お問合せフォーム</h2>
      <ContactForm />
    </div>
  );
}
