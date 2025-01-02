import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import PhoneInput from "./PhoneInput";
import { useIsMobile } from "@/hooks/use-mobile";
import PasswordInput from "./PasswordInput";
import PersonalInfoFields from "./form-sections/PersonalInfoFields";
import CompanyEmailFields from "./form-sections/CompanyEmailFields";
import AgreementSection from "./form-sections/AgreementSection";
import { stepTwoSchema, type StepTwoFormData } from "./validation/stepTwoSchema";

interface StepTwoFormProps {
  onSubmit: (values: StepTwoFormData) => Promise<void>;
  isLoading: boolean;
  onBack: () => void;
  onEmailExists: (email: string) => void;
}

const StepTwoForm = ({ onSubmit, isLoading, onBack, onEmailExists }: StepTwoFormProps) => {
  const isMobile = useIsMobile();
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
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

        <CompanyEmailFields 
          form={form} 
          onEmailExists={onEmailExists}
          setIsCheckingEmail={setIsCheckingEmail}
        />

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

        <AgreementSection form={form} />

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4" 
          disabled={isLoading || isCheckingEmail}
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

  const backButton = (
    <Button
      variant="secondary"
      className="w-fit h-8 px-2 mb-2 text-secondary-foreground"
      onClick={onBack}
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Back
    </Button>
  );

  const baseContent = (
    <>
      {backButton}
      <CardDescription className="text-muted-foreground mb-5">
        Complete your registration
      </CardDescription>
      {formContent}
    </>
  );

  const commonStyles = isMobile 
    ? "rounded-lg step-two-form bg-background space-y-3" 
    : "rounded-lg step-two-form bg-card border border-border shadow-sm p-6";

  if (isMobile) {
    return (
      <div className={`${commonStyles} step-two-form-mobile`}>
        {baseContent}
      </div>
    );
  }

  return (
    <div className={`${commonStyles} step-two-form-desktop md:min-w-[500px]`}>
      {baseContent}
    </div>
  );
};

export default StepTwoForm;