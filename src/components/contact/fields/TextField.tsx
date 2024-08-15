import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextFieldProps } from "@/types/formField";

export const TextField = ({
  control,
  name,
  label,
  placeholder,
  required = false,
}: TextFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-1 justify-items-start">
          <FormLabel>
            {label}
            {required && <span className="ml-1 text-red-600">※</span>}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="focus:outline-none focus:border-transparent focus:ring-0 focus:border-none"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
