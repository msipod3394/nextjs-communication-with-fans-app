import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RadioFieldProps } from "@/types/formField";

export const RadioField = ({
  control,
  name,
  label,
  required = false,
  radioArray,
}: RadioFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>
            {label}
            {required && <span className="ml-1 text-red-600">※</span>}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {radioArray.map((radioItem) => (
                <>
                  <FormItem
                    key={radioItem}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={radioItem} />
                    </FormControl>
                    <FormLabel className="font-normal">{radioItem}</FormLabel>
                  </FormItem>
                </>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
