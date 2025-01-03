import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "./PasswordInput";
import AgreementCheckbox from "./AgreementCheckbox";
import { useSignupStore } from "@/store/signupStore";
import { useEffect } from "react";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .regex(emailRegex, "Please enter a valid email address"),
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
  const { formData, updateFormData } = useSignupStore();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: formData.email || "",
      password: formData.password || "",
      acceptTerms: formData.acceptTerms || false,
      acceptPrivacy: formData.acceptPrivacy || false,
    },
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);

  const handleSubmit = async (values: SignUpFormData) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
      form.setError("root", {
        type: "manual",
        message: "Failed to submit form. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
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

      <div className="space-y-2 mt-3">
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

      <Button 
        type="submit" 
        variant="primary"
        className="w-full text-[0.775rem] sm:text-[0.775rem] md:text-[0.775rem] mt-3" 
        disabled={isLoading || !form.formState.isValid}
      >
        {isLoading ? "Signing up..." : "Sign up"}
      </Button>

      {form.formState.errors.root && (
        <p className="text-destructive text-sm mt-2">
          {form.formState.errors.root.message}
        </p>
      )}
    </form>
  );
};

export default SignUpForm;