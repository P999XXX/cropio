import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "./PasswordInput";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AgreementCheckbox from "./AgreementCheckbox";
import { useSignupStore } from "@/store/signupStore";
import { useEffect } from "react";

const stepTwoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
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

  const handleSubmit = (values: StepTwoFormData) => {
    updateFormData(values);
    onSubmit(values);
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
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <div className="space-y-4">
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
              className="w-full sm:w-auto order-1 sm:order-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Continue"}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="w-full sm:w-auto order-2 sm:order-1"
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