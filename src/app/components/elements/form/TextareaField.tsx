import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export const TextareaField = ({
  control,
  name,
  label,
  placeholder,
  required = false,
}: TextareaFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="ml-1 text-red-600">※</span>}
          </FormLabel>
          <FormControl>
            <Textarea
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
