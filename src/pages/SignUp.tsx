import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import AuthProviders from "@/components/auth/AuthProviders";
import SignUpForm, { SignUpFormData } from "@/components/auth/SignUpForm";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"buyer" | "supplier">("buyer");
  const navigate = useNavigate();

  const handleSignUp = async (values: SignUpFormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            role: values.role,
            company_name: values.companyName,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            role: values.role,
            company_name: values.companyName,
          })
          .eq("id", authData.user.id);

        if (profileError) throw profileError;

        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Failed to sign up with Google");
    }
  };

  const handleLinkedInSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("LinkedIn signup error:", error);
      toast.error("Failed to sign up with LinkedIn");
    }
  };

  const handleRoleSelect = (selectedRole: "buyer" | "supplier") => {
    setRole(selectedRole);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                {step === 1
                  ? "Choose your role to get started"
                  : "Complete your registration"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {step === 1 ? (
                  <>
                    <SignUpForm
                      onSubmit={() => {}}
                      isLoading={false}
                      step={1}
                      onRoleSelect={handleRoleSelect}
                    />
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <AuthProviders
                      onGoogleSignUp={handleGoogleSignUp}
                      onLinkedInSignUp={handleLinkedInSignUp}
                    />
                  </>
                ) : (
                  <SignUpForm
                    onSubmit={handleSignUp}
                    isLoading={isLoading}
                    step={2}
                    initialRole={role}
                  />
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;