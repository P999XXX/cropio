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
}

const FormInput = ({ form, name, label, placeholder, type = "text", description }: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormErrorMessage message={form.formState.errors[name]?.message} />
        </FormItem>
      )}
    />
  );
};

export default FormInput;