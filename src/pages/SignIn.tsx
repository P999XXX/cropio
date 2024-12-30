import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "@/components/auth/PasswordInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: SignInFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
          <div className="w-[500px] flex flex-col items-center">
            <div className="space-y-2 text-center mb-6 w-full">
              <h1 className="text-2xl md:text-3xl font-bold">Welcome Back!</h1>
              <p className="text-[14px] text-muted-foreground">
                Sign in to your account
              </p>
            </div>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 w-full">
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
              <button type="submit" className="auth-button w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
            <div className="text-sm text-center w-full text-muted-foreground mt-6">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SignIn;