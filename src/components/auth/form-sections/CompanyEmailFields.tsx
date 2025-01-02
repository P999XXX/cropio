import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../StepTwoForm";
import { supabase } from "@/integrations/supabase/client";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { toast } from "sonner";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface CompanyEmailFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
}

// Define the type for our profiles table
interface Profile {
  id: string;
  email: string;
  company_name: string;
  first_name?: string;
  last_name?: string;
  role: string;
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
        (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => {
          const currentEmail = form.getValues('email');
          if (currentEmail && payload.new && 'email' in payload.new) {
            // Only check if the change affects email field
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
      return true;
    }

    setIsCheckingEmail(true);
    try {
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('email', email.toLowerCase())
        .throwOnError();

      if (error) throw error;

      const exists = count ? count > 0 : false;
      setEmailExists(exists);

      if (exists) {
        toast.error("This email is already registered");
        return "This email is already registered";
      }
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
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="!text-foreground">Company Name</FormLabel>
            <FormControl>
              <input
                placeholder="Enter your company name"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                {...field}
              />
            </FormControl>
            <FormErrorMessage message={form.formState.errors.companyName?.message} />
          </FormItem>
        )}
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
              <input
                placeholder="Enter your email"
                type="email"
                className={`flex h-9 w-full rounded-md border ${
                  emailExists ? 'border-destructive' : 'border-input'
                } bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  validateEmail(e.target.value);
                }}
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