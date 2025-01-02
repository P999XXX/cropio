import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../StepTwoForm";
import { supabase } from "@/integrations/supabase/client";
import FormInput from "@/components/forms/FormInput";
import { toast } from "sonner";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface CompanyEmailFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
}

interface Profile {
  id: string;
  email: string;
  company_name: string;
}

const CompanyEmailFields = ({ form }: CompanyEmailFieldsProps) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload: RealtimePostgresChangesPayload<Profile>) => {
          const currentEmail = form.getValues('email');
          if (currentEmail && payload.new && 'email' in payload.new) {
            if (payload.new.email?.toLowerCase() === currentEmail.toLowerCase()) {
              validateEmail(currentEmail);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [form]);

  const validateEmail = async (email: string) => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailExists(false);
      return "Please enter a valid email address";
    }

    setIsCheckingEmail(true);
    try {
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('email', email.toLowerCase());

      if (error) {
        console.error('Error checking email:', error);
        toast.error("Error checking email availability");
        return "Error checking email availability";
      }

      const exists = count ? count > 0 : false;
      setEmailExists(exists);

      if (exists) {
        form.setError('email', {
          type: 'manual',
          message: "This email is already registered"
        });
        toast.error("This email is already registered");
        return "This email is already registered";
      }

      form.clearErrors('email');
      return true;
    } catch (error) {
      console.error('Error checking email:', error);
      toast.error("Error checking email availability");
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

      <FormInput
        form={form}
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        className={emailExists ? 'border-destructive' : ''}
        rules={{
          validate: {
            emailExists: validateEmail
          }
        }}
      />
    </div>
  );
};

export default CompanyEmailFields;