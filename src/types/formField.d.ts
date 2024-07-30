import { Control } from "react-hook-form";

// テキスト
export type TextFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

// テキストエリア
export type TextareaFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

// ラジオボタン
export type RadioFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
  radioArray: string[];
};

// プライバシーポリシー
export type PrivacyPolicyFieldProps = {
  control: Control<any>;
  name: string;
  link: string;
  required?: boolean;
};
