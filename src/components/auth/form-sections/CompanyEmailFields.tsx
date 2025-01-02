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

      if (error) throw error;

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
  
  // Update debounced email
  useEffect(() => {
    const timer = setTimeout(() => {
      if (email && email !== debouncedEmail) {
        setDebouncedEmail(email);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  // Check email existence when debounced email changes
  useEffect(() => {
    const isValidEmail = (email: string) => {
      return email.includes('@') && email.includes('.') && email.length > 5;
    };

    if (debouncedEmail && isValidEmail(debouncedEmail)) {
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