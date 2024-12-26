import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "@/types/auth";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

interface AgreementCheckboxProps {
  form: UseFormReturn<StepTwoFormData>;
  name: "acceptTerms" | "acceptPrivacy";
  linkText: string;
  linkHref: string;
}

const AgreementCheckbox = ({ form, name, linkText, linkHref }: AgreementCheckboxProps) => {
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
            <FormErrorMessage message={form.formState.errors[name]?.message} />
          </div>
        </FormItem>
      )}
    />
  );
};

export default AgreementCheckbox;