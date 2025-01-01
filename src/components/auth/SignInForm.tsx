import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "./PasswordInput";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  onSubmit: (values: SignInFormData) => Promise<void>;
  isLoading: boolean;
  onForgotPassword: () => void;
}

const SignInForm = ({ onSubmit, isLoading, onForgotPassword }: SignInFormProps) => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          aria-label="Email input"
        />

        <PasswordInput
          form={form}
          name="password"
          label="Password"
          aria-label="Password input"
        />

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading}
          aria-label={isLoading ? "Signing in..." : "Sign in"}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary/90 hover:underline block w-full text-center"
          aria-label="Forgot password"
        >
          Forgot your password?
        </button>
      </form>
    </Form>
  );
};

export default SignInForm;