import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [showPassword, setShowPassword] = useState(false);
  
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-foreground">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage className="text-[11px] text-destructive flex items-center gap-1">
                {form.formState.errors.email?.message && (
                  <>
                    <AlertTriangle className="h-3 w-3" />
                    <span>{form.formState.errors.email?.message}</span>
                  </>
                )}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-foreground">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-[11px] text-destructive flex items-center gap-1">
                {form.formState.errors.password?.message && (
                  <>
                    <AlertTriangle className="h-3 w-3" />
                    <span>{form.formState.errors.password?.message}</span>
                  </>
                )}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:underline block w-full text-center"
        >
          Forgot your password?
        </button>
      </form>
    </Form>
  );
};

export default SignInForm;