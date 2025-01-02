import { UseFormReturn } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import { StepTwoFormData } from "../validation/stepTwoSchema";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CompanyEmailFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
  onEmailExists: (email: string) => void;
  setIsCheckingEmail: (isChecking: boolean) => void;
}

const CompanyEmailFields = ({ form, onEmailExists, setIsCheckingEmail }: CompanyEmailFieldsProps) => {
  const [debouncedEmail, setDebouncedEmail] = useState("");
  
  const checkEmailExists = async (email: string) => {
    try {
      setIsCheckingEmail(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error('Error checking email:', error);
        return;
      }

      if (data) {
        onEmailExists(email);
        form.setError('email', {
          type: 'manual',
          message: 'This email is already registered'
        });
      }
    } catch (error) {
      console.error('Error checking email:', error);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Watch email field changes
  const email = form.watch('email');

  useEffect(() => {
    const timer = setTimeout(() => {
      const emailValue = email?.trim();
      if (emailValue && emailValue !== debouncedEmail) {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        if (isValidEmail) {
          setDebouncedEmail(emailValue);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email, debouncedEmail]);

  useEffect(() => {
    if (debouncedEmail) {
      checkEmailExists(debouncedEmail);
    }
  }, [debouncedEmail]);

  return (
    <div className="space-y-3">
      <FormInput
        form={form}
        name="companyName"
        label="Company Name"
        placeholder="Enter your company name"
      />
      <FormInput
        form={form}
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
    </div>
  );
};

export default CompanyEmailFields;