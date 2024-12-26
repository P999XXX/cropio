import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "./PasswordInput";
import AgreementCheckbox from "./AgreementCheckbox";
import FormInput from "@/components/forms/FormInput";
import { ArrowLeft } from "lucide-react";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const stepThreeSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  confirmPassword: z.string(),
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

export type StepThreeFormData = z.infer<typeof stepThreeSchema>;

interface StepThreeFormProps {
  onSubmit: (values: StepThreeFormData) => Promise<void>;
  isLoading: boolean;
  onBack: () => void;
}

const StepThreeForm = ({ onSubmit, isLoading, onBack }: StepThreeFormProps) => {
  const form = useForm<StepThreeFormData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
            variant="outline"
            className="w-full"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepThreeForm;