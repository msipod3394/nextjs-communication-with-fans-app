import { ContactFormProvider } from "@/contexts/ContactFormContext";
import { ReactNode } from "react";

interface ContactLayoutProps {
  children: ReactNode;
}

export default function ContactLayout({ children }: ContactLayoutProps) {
  return (
    <ContactFormProvider>
      <div className="flex min-h-screen flex-col">
        <main>{children}</main>
      </div>
    </ContactFormProvider>
  );
}
