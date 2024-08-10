import { ContactFormProvider } from "@/contexts/ContactFormContext";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContactFormProvider>
      <div className="flex min-h-screen flex-col">
        <main>{children}</main>
      </div>
    </ContactFormProvider>
  );
}
