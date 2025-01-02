import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CardDescription } from "@/components/ui/card";
import PasswordInput from "./PasswordInput";
import PhoneInput from "./PhoneInput";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import PersonalInfoFields from "./form-sections/PersonalInfoFields";
import CompanyEmailFields from "./form-sections/CompanyEmailFields";
import AgreementFields from "./form-sections/AgreementFields";

const stepTwoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  countryCode: z.string().min(1, "Country code is required"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  acceptPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type StepTwoFormData = z.infer<typeof stepTwoSchema>;

interface StepTwoFormProps {
  onSubmit: (values: StepTwoFormData) => Promise<void>;
  isLoading: boolean;
  onBack: () => void;
}

const StepTwoForm = ({ onSubmit, isLoading, onBack }: StepTwoFormProps) => {
  const isMobile = useIsMobile();
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      countryCode: "",
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PersonalInfoFields form={form} />
        <CompanyEmailFields form={form} />
        <PhoneInput form={form} />

        <div className="space-y-3">
          <PasswordInput
            form={form}
            name="password"
            label="Password"
            description="Password must be at least 8 characters and contain uppercase, lowercase, and numbers"
          />
          <PasswordInput
            form={form}
            name="confirmPassword"
            label="Confirm Password"
          />
        </div>

        <AgreementFields form={form} />

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4" 
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>

        <div className="text-sm text-center text-muted-foreground pt-2">
          Already have an account?{" "}
          <a href="/signin" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </div>
      </form>
    </Form>
  );

  return (
    <div className={`${isMobile ? 'rounded-lg step-two-form bg-background space-y-3' : 'rounded-lg step-two-form bg-card border border-border shadow-sm p-6'} ${isMobile ? 'step-two-form-mobile' : 'step-two-form-desktop md:min-w-[500px]'}`}>
      <Button
        variant="primary"
        className="w-fit h-8 px-2 mb-2"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>
      <CardDescription className="text-muted-foreground mb-5">
        Complete your registration
      </CardDescription>
      {formContent}
    </div>
  );
};

export default StepTwoForm;
