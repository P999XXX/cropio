import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";
import FormLabel from "./FormLabel";

interface FormInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  description?: string;
  className?: string;
  rules?: Record<string, any>;
}

const FormInput = ({ 
  form, 
  name, 
  label, 
  placeholder, 
  type = "text", 
  description, 
  className,
  rules 
}: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} className={className} {...field} />
          </FormControl>
          <FormErrorMessage message={form.formState.errors[name]?.message as string} />
        </FormItem>
      )}
    />
  );
};

export default FormInput;