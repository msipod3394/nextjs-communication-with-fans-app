"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiry_category: string;
  inquiry_content: string;
  privacy_policy: boolean;
}

interface ContactFormContextType {
  values: ContactFormValues | null;
  setValues: (values: ContactFormValues | null) => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(
  undefined
);

export const ContactFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [values, setValues] = useState<ContactFormValues | null>(null);

  return (
    <ContactFormContext.Provider value={{ values, setValues }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
