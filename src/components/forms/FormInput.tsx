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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ 
  form, 
  name, 
  label, 
  placeholder, 
  type = "text", 
  description, 
  className,
  value,
  onChange 
}: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              placeholder={placeholder} 
              type={type} 
              className={className} 
              value={value}
              onChange={onChange}
              {...field} 
            />
          </FormControl>
          <FormErrorMessage message={form.formState.errors[name]?.message as string} />
        </FormItem>
      )}
    />
  );
};

export default FormInput;