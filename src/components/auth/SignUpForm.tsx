import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "./PasswordInput";
import AgreementCheckbox from "./AgreementCheckbox";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  acceptPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
});

export type SignUpFormData = z.infer<typeof schema>;

interface SignUpFormProps {
  onSubmit: (values: SignUpFormData) => Promise<void>;
  isLoading: boolean;
}

const SignUpForm = ({ onSubmit, isLoading }: SignUpFormProps) => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  return (
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
        description="Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number"
      />

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

      <Button 
        type="submit" 
        variant="primary"
        className="w-full text-[0.775rem] sm:text-[0.775rem] md:text-[0.775rem]" 
        disabled={isLoading}
      >
        {isLoading ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
};

export default SignUpForm;