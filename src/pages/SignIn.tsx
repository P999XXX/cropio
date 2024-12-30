import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "@/components/auth/PasswordInput";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
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
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <FormInput
                form={{
                  formState: { errors: {} },
                  control: { register: () => ({}) },
                }}
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                form={{
                  formState: { errors: {} },
                  control: { register: () => ({}) },
                }}
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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