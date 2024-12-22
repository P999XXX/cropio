import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "./StepTwoForm";

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
              I accept the <a href={linkHref} className="text-primary hover:underline">{linkText}</a>
            </div>
            <FormMessage className="text-xs text-red-500" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default AgreementCheckbox;