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
import StepOneForm from "@/components/auth/StepOneForm";
import StepTwoForm, { StepTwoFormData } from "@/components/auth/StepTwoForm";
import { Leaf } from "lucide-react";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"buyer" | "supplier">("buyer");
  const navigate = useNavigate();

  const handleSignUp = async (values: StepTwoFormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            role: role,
            company_name: values.companyName,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            role: role,
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
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
              <Leaf className="h-6 w-6" />
              Let's change agri business together!
            </h1>
          </div>
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
                  <StepOneForm
                    onSubmit={handleRoleSelect}
                    onGoogleSignUp={handleGoogleSignUp}
                    onLinkedInSignUp={handleLinkedInSignUp}
                  />
                ) : (
                  <StepTwoForm onSubmit={handleSignUp} isLoading={isLoading} />
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