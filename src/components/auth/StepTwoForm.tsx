import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "./PasswordInput";
import AgreementCheckbox from "./AgreementCheckbox";
import PhoneInput from "./PhoneInput";
import FormInput from "@/components/forms/FormInput";
import { ArrowLeft } from "lucide-react";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const stepTwoSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  confirmPassword: z.string(),
  companyName: z.string().min(5, "Company name must be at least 5 characters"),
  countryCode: z.string(),
  phoneNumber: z.string(),
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
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      countryCode: "+49",
      phoneNumber: "",
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    onBack();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="companyName"
          label="Company Name"
          placeholder="Enter company name"
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormInput
            form={form}
            name="firstName"
            label="First Name"
            placeholder="Enter first name"
          />
          <FormInput
            form={form}
            name="lastName"
            label="Last Name"
            placeholder="Enter last name"
          />
        </div>

        <PhoneInput form={form} />

        <FormInput
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <PasswordInput
          form={form}
          name="password"
          label="Password"
          description="Password must contain at least 8 characters, including uppercase, lowercase, and numbers"
        />

        <PasswordInput
          form={form}
          name="confirmPassword"
          label="Confirm Password"
        />

        <AgreementCheckbox
          form={form}
          name="acceptTerms"
          linkText="terms and conditions"
          linkHref="/terms"
        />

        <AgreementCheckbox
          form={form}
          name="acceptPrivacy"
          linkText="privacy policy"
          linkHref="/privacy"
        />

        <div className="space-y-3">
          <Button type="submit" className="auth-button w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full flex items-center justify-center bg-white hover:bg-gray-50 dark:bg-secondary/10 dark:hover:bg-secondary/20 text-foreground"
            onClick={handleBack}
          >
            <div className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back</span>
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepTwoForm;