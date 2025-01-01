import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { PasswordInput } from "./PasswordInput";
import { AgreementCheckbox } from "./AgreementCheckbox";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type SignUpFormData = z.infer<typeof schema>;

interface SignUpFormProps {
  onSubmit: (values: SignUpFormData) => Promise<void>;
  isLoading: boolean;
}

const SignUpForm = ({ onSubmit, isLoading }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        type="email"
        label="Email"
        error={errors.email?.message}
        {...register("email")}
      />
      <PasswordInput
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
        error={errors.password?.message}
        {...register("password")}
        label="Password"
      />

      <Button 
        type="submit" 
        variant="primary"
        className="w-full text-[0.775rem] sm:text-[0.775rem] md:text-[0.775rem]" 
        disabled={isLoading}
      >
        {isLoading ? "Signing up..." : "Sign up"}
      </Button>

      <AgreementCheckbox
        error={errors.agreement?.message}
        {...register("agreement")}
      />
    </form>
  );
};

export default SignUpForm;