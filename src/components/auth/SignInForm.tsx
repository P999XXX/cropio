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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        />

        <Button 
          type="submit" 
          className="w-full text-[0.775rem] mt-6 bg-primary hover:bg-primary/90 text-primary-foreground" 
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <button
          type="button"
          onClick={onForgotPassword}
          className="text-[0.775rem] text-primary hover:underline block w-full text-center mt-2"
        >
          Forgot your password?
        </button>
      </form>
    </Form>
  );
};

export default SignInForm;