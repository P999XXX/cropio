import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "./StepTwoForm";
import { AlertTriangle } from "lucide-react";

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
            <FormMessage className="text-[10px] text-destructive flex items-center gap-1">
              {form.formState.errors[name]?.message && (
                <>
                  <AlertTriangle className="h-3 w-3" />
                  <span>{form.formState.errors[name]?.message}</span>
                </>
              )}
            </FormMessage>
          </div>
        </FormItem>
      )}
    />
  );
};

export default AgreementCheckbox;