import { UseFormReturn } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import { StepTwoFormData } from "../validation/stepTwoSchema";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
        .eq('email', email.toLowerCase())
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
        toast.error("Email already exists", {
          description: "Please use a different email address or sign in.",
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
      if (email) {
        const emailValue = email.trim().toLowerCase();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        
        if (isValidEmail && emailValue !== debouncedEmail) {
          setDebouncedEmail(emailValue);
          checkEmailExists(emailValue);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

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