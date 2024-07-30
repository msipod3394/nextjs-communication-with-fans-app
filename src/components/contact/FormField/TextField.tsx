import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const TextField = ({
  control,
  name,
  label,
  placeholder,
  required = false,
}) => {
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
