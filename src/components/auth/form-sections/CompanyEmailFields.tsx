import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../StepTwoForm";
import { supabase } from "@/integrations/supabase/client";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import FormInput from "@/components/forms/FormInput";
import { toast } from "sonner";

interface CompanyEmailFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
}

const CompanyEmailFields = ({ form }: CompanyEmailFieldsProps) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const validateEmail = async (email: string) => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      return true;
    }

    setIsCheckingEmail(true);
    try {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('email', email);

      if (count && count > 0) {
        toast.error("This email is already registered");
        return "This email is already registered";
      }
      return true;
    } catch (error) {
      console.error('Error checking email:', error);
      return "Error checking email availability";
    } finally {
      setIsCheckingEmail(false);
    }
  };

  return (
    <div className="space-y-3">
      <FormInput
        form={form}
        name="companyName"
        label="Company Name"
        placeholder="Enter your company name"
      />

      <FormField
        control={form.control}
        name="email"
        rules={{
          validate: {
            emailExists: validateEmail
          }
        }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="!text-foreground">Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your email"
                type="email"
                {...field}
                className={isCheckingEmail ? 'bg-muted' : ''}
                disabled={isCheckingEmail}
              />
            </FormControl>
            <FormErrorMessage message={form.formState.errors.email?.message} />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CompanyEmailFields;