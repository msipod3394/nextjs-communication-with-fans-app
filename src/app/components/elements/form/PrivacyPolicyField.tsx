import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PrivacyPolicyFieldProps } from "@/types/formField";
import Link from "next/link";

export const PrivacyPolicyField = ({
  control,
  name,
  link,
  required,
}: PrivacyPolicyFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>個人情報の取り扱いに同意する</FormLabel>
            <FormDescription>
              個人情報の取り扱いについては、
              <Link href={link}>こちら</Link>をご参照ください。
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
