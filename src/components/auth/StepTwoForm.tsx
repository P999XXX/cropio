import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AgreementCheckbox from "./AgreementCheckbox";
import { useSignupStore } from "@/store/signupStore";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { errorToastStyle } from "@/utils/toast-styles";
import { useEffect, useState } from "react";

const nameRegex = /^[a-zA-Z]{3,}$/;

const stepTwoSchema = z.object({
  firstName: z.string()
    .min(3, "First name must be at least 3 characters")
    .regex(nameRegex, "First name must contain only letters and be at least 3 characters"),
  lastName: z.string()
    .min(3, "Last name must be at least 3 characters")
    .regex(nameRegex, "Last name must contain only letters and be at least 3 characters"),
  email: z.string()
    .email("Invalid email address")
    .refine(async (email) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('email')
          .eq('email', email)
          .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
          console.error("Email check error:", error);
          return true; // Allow form submission if check fails
        }
        return !data; // Return true if email doesn't exist (data is null)
      } catch (error) {
        console.error("Email validation error:", error);
        return true; // Allow form submission if check fails
      }
    }, "This email is already registered"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
  acceptPrivacy: z.boolean().refine(val => val === true, {
    message: "You must accept the privacy policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type StepTwoFormData = z.infer<typeof stepTwoSchema>;

interface StepTwoFormProps {
  onSubmit: (values: StepTwoFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const StepTwoForm = ({ onSubmit, onBack, isLoading }: StepTwoFormProps) => {
  const { formData, updateFormData } = useSignupStore();
  const [emailExists, setEmailExists] = useState(false);
  
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      password: formData.password || "",
      confirmPassword: formData.confirmPassword || "",
      acceptTerms: formData.acceptTerms || false,
      acceptPrivacy: formData.acceptPrivacy || false,
    },
  });

  useEffect(() => {
    const subscription = form.watch(async (value, { name }) => {
      if (name === 'email' && value.email) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('email', value.email)
            .maybeSingle();
          
          if (error && error.code !== 'PGRST116') {
            console.error("Email check error:", error);
            return;
          }
          setEmailExists(!!data);
        } catch (error) {
          console.error("Email validation error:", error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = async (values: StepTwoFormData) => {
    try {
      updateFormData(values);
      await onSubmit(values);
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message || "An error occurred during signup", errorToastStyle);
    }
  };

  return (
    <div className="space-y-6 md:bg-card md:p-6 md:rounded-lg md:border md:border-border md:max-w-2xl md:mx-auto">
      <h3 className="text-lg font-semibold text-left md:text-center">Personal Information</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              form={form}
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              className="text-[0.875rem]"
            />
            <FormInput
              form={form}
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              className="text-[0.875rem]"
            />
          </div>

          <div className="space-y-1">
            <FormInput
              form={form}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="text-[0.875rem]"
            />
            {emailExists && (
              <p className="text-destructive-foreground text-[0.775rem] mt-1">
                This email is already registered
              </p>
            )}
          </div>

          <div className="space-y-4">
            <PasswordInput
              form={form}
              name="password"
              label="Password"
              description="Password must be at least 8 characters and contain uppercase, lowercase, and numbers"
              className="text-[0.875rem]"
            />
            <PasswordInput
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              className="text-[0.875rem]"
            />
          </div>

          <div className="space-y-2">
            <AgreementCheckbox
              form={form}
              name="acceptTerms"
              linkText="Terms and Conditions"
              linkHref="/terms"
            />
            <AgreementCheckbox
              form={form}
              name="acceptPrivacy"
              linkText="Privacy Policy"
              linkHref="/privacy"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4 pt-2">
            <Button 
              type="submit" 
              variant="primary"
              className="w-full sm:w-auto order-1 sm:order-2 text-[0.875rem]"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Continue"}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="w-full sm:w-auto order-2 sm:order-1 text-[0.875rem]"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepTwoForm;
