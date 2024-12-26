import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

interface AgreementCheckboxProps<T> {
  form: UseFormReturn<T>;
  name: keyof T & string;
  linkText: string;
  linkHref: string;
}

const AgreementCheckbox = <T extends Record<string, any>>({ 
  form, 
  name, 
  linkText, 
  linkHref 
}: AgreementCheckboxProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <div className="text-sm font-normal">
              I accept the <a href={linkHref} className="agreement-link">{linkText}</a>
            </div>
            <FormErrorMessage message={form.formState.errors[name]?.message as string} />
          </div>
        </FormItem>
      )}
    />
  );
};

export default AgreementCheckbox;