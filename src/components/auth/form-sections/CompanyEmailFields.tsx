import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../StepTwoForm";
import { supabase } from "@/integrations/supabase/client";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import FormInput from "@/components/forms/FormInput";

interface CompanyEmailFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
}

const CompanyEmailFields = ({ form }: CompanyEmailFieldsProps) => {
  const [emailExists, setEmailExists] = useState(false);

  const checkEmailExists = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Error checking email:', error);
        return;
      }

      if (data) {
        setEmailExists(true);
        form.setError('email', {
          type: 'manual',
          message: 'This email is already registered'
        });
      } else {
        setEmailExists(false);
        form.clearErrors('email');
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  useEffect(() => {
    const email = form.watch('email');
    if (email && email.includes('@') && email.includes('.')) {
      checkEmailExists(email);
    }
  }, [form.watch('email')]);

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
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="!text-foreground">Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your email"
                type="email"
                {...field}
                className={emailExists ? 'border-destructive' : ''}
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