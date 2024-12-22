import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const sendWelcomeEmail = async (email: string, companyName: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        "https://perkzwevnbmhbbdwwwaj.supabase.co/functions/v1/send-welcome-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ email, companyName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send welcome email");
      }
    } catch (error) {
      console.error("Error sending welcome email:", error);
      // Don't throw the error as this is not critical for signup
    }
  };

  const handleSignUp = async (values: StepTwoFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            company_name: values.companyName,
            role: role,
          },
        },
      });

      if (error) throw error;

      // Send welcome email
      await sendWelcomeEmail(values.email, values.companyName);

      toast.success("Account created successfully! Please check your email.");
      navigate("/");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
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
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
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
    } catch (error: any) {
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
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-center gap-1 mb-4">
            <Leaf className="h-5 w-5" />
            <h1 className="text-xl font-semibold text-center">Let's change agri business together!</h1>
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
                <a
                  href="/signin"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;