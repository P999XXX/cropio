import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CardDescription } from "@/components/ui/card";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "./PasswordInput";
import { ArrowLeft } from "lucide-react";
import PhoneInput from "./PhoneInput";
import AgreementCheckbox from "./AgreementCheckbox";
import { useIsMobile } from "@/hooks/use-mobile";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            form={form}
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
          />
          <FormInput
            form={form}
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
          />
        </div>

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

        <PhoneInput form={form} />

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

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button 
            type="submit" 
            variant="primary"
            className="order-1 sm:order-2 w-full sm:w-auto" 
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onBack}
            className="order-2 sm:order-1 w-full sm:w-auto"
          >
            Back
          </Button>
        </div>

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
      variant="ghost"
      className="w-fit h-8 px-2 mb-2"
      onClick={onBack}
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Back
    </Button>
  );

  const baseContent = (
    <>
      {backButton}
      {!isMobile && (
        <CardDescription className="text-muted-foreground mb-6">
          Complete your registration
        </CardDescription>
      )}
      {formContent}
    </>
  );

  const commonStyles = isMobile 
    ? "rounded-lg step-two-form bg-background space-y-4" 
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
