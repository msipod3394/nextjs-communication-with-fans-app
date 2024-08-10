import { ContactForm } from "@/components/contact/ContactForm";
import { FrontHeading } from "@/components/dashboard/FrontHeading";

export default function ContactPage() {
  return (
    <div>
      <FrontHeading
        heading="Contact"
        description="撮影・イベント出演のご依頼などはこちらから受け付けております。"
      />
      <div className="my-16 mx-auto w-full sm:w-[1000px]">
        <ContactForm />
      </div>
    </div>
  );
}
