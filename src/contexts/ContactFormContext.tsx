"use client";
import { createContext, useContext, useState } from "react";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiry_category: string;
  inquiry_content: string;
  privacy_policy: boolean;
};

// コンテキストの型を定義
type ContactFormContextType = {
  values: ContactFormValues | null;
  setValues: (values: ContactFormValues | null) => void;
};

// コンテキストオブジェクトの作成
const ContactFormContext = createContext<ContactFormContextType | undefined>(
  undefined
);

// コンテキストプロバイダーコンポーネントの作成
export const ContactFormProvider = ({ children }: React.ReactNode) => {
  const [values, setValues] = useState<ContactFormValues | null>(null);

  return (
    <ContactFormContext.Provider value={{ values, setValues }}>
      {children}
    </ContactFormContext.Provider>
  );
};

// コンテキストの値を取得するためのカスタムフックを定義
export const useContactFormContext = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error(
      "useContactFormContextは、ContactFormProvider内で使用してください"
    );
  }

  // コンテキストの値を返す
  return context;
};
