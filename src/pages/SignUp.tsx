import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import StepOneForm from "@/components/auth/StepOneForm";
import StepTwoForm, { StepTwoFormData } from "@/components/auth/StepTwoForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThankYouDialog from "@/components/auth/ThankYouDialog";
import SignUpHeader from "@/components/auth/SignUpHeader";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"buyer" | "supplier">("buyer");
  const [showThankYouDialog, setShowThankYouDialog] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const sendWelcomeEmail = async (email: string, companyName: string) => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error("Session error:", sessionError);
        return;
      }

      const response = await fetch(
        "https://perkzwevnbmhbbdwwwaj.supabase.co/functions/v1/send-welcome-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ email, companyName }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send welcome email: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error sending welcome email:", error);
    }
  };

  const handleSignUp = async (values: StepTwoFormData) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
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

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (data.user) {
        await sendWelcomeEmail(values.email, values.companyName);
      }

      setUserEmail(values.email);
      setShowThankYouDialog(true);
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

  const handleDialogClose = () => {
    setShowThankYouDialog(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-16 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="max-w-md w-full space-y-3 my-8">
          <SignUpHeader />
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold">
                Create an Account
              </CardTitle>
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
                <a href="/signin" className="text-primary hover:underline font-medium">
                  Sign in
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <ThankYouDialog
        open={showThankYouDialog}
        onOpenChange={handleDialogClose}
        userEmail={userEmail}
      />
    </div>
  );
};

export default SignUp;