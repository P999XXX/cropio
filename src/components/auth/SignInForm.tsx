import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "./PasswordInput";
import { AlertCircle } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
    mode: "onChange",
  });

  const handleSubmit = async (values: SignInFormData) => {
    try {
      await onSubmit(values);
    } catch (error: any) {
      console.error("Form submission error:", error);
      const errorMessage = error.message?.includes("Invalid login credentials")
        ? "The email or password you entered is incorrect. Please try again."
        : error.message || "An error occurred during sign in. Please try again.";
      
      form.setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <Form {...form}>
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
        />

        {form.formState.errors.root && (
          <div className="flex items-start space-x-2 p-3 rounded-lg bg-destructive text-destructive-foreground text-[0.775rem] mt-4 animate-in fade-in-50">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>{form.formState.errors.root.message}</p>
          </div>
        )}

        <div className="mt-[35px]">
          <Button 
            type="submit" 
            className="w-full text-[0.775rem]"
            disabled={isLoading || !form.formState.isValid}
            variant="primary"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <button
          type="button"
          onClick={onForgotPassword}
          className="text-[0.875rem] text-primary hover:underline block w-full text-center mt-2"
        >
          Forgot your password?
        </button>
      </form>
    </Form>
  );
};

export default SignInForm;