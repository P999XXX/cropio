import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import StepOneForm from "@/components/auth/StepOneForm";
import StepTwoForm, { StepTwoFormData } from "@/components/auth/StepTwoForm";
import ThankYouDialog from "@/components/auth/ThankYouDialog";
import { SidebarProvider } from "@/components/ui/sidebar";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"buyer" | "supplier">("buyer");
  const [showThankYou, setShowThankYou] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleStepOne = (role: "buyer" | "supplier") => {
    setSelectedRole(role);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Google sign up error:", error);
      toast.error(error.message || "Failed to sign up with Google");
    }
  };

  const handleLinkedInSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("LinkedIn sign up error:", error);
      toast.error(error.message || "Failed to sign up with LinkedIn");
    }
  };

  const handleStepTwo = async (values: StepTwoFormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            company_name: values.companyName,
            role: selectedRole,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        setUserEmail(values.email);
        setShowThankYou(true);
        toast.success("Registration successful! Please check your email to confirm your account.");
      } else {
        throw new Error("No user data received");
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(error.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className={`space-y-2 ${isMobile ? 'text-left' : 'text-center'} mb-6`}>
              <h1 className="text-2xl md:text-3xl font-bold">Register for Free!</h1>
              <p className="text-[14px] text-muted-foreground">
                {currentStep === 1 ? "Choose Your Role" : "Complete Your Profile"}
              </p>
            </div>

            {isMobile ? (
              <div>
                {currentStep === 1 ? (
                  <StepOneForm
                    onSubmit={handleStepOne}
                    onGoogleSignUp={handleGoogleSignUp}
                    onLinkedInSignUp={handleLinkedInSignUp}
                  />
                ) : (
                  <StepTwoForm 
                    onSubmit={handleStepTwo} 
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
                )}
                <div className="text-sm text-center w-full text-muted-foreground mt-6">
                  Already have an account?{" "}
                  <a href="/signin" className="text-primary hover:underline font-medium">
                    Sign in
                  </a>
                </div>
              </div>
            ) : (
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>
                    {currentStep === 1
                      ? "Select how you'll use the platform"
                      : "Enter your details to create an account"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  {currentStep === 1 ? (
                    <StepOneForm
                      onSubmit={handleStepOne}
                      onGoogleSignUp={handleGoogleSignUp}
                      onLinkedInSignUp={handleLinkedInSignUp}
                    />
                  ) : (
                    <StepTwoForm 
                      onSubmit={handleStepTwo} 
                      isLoading={isLoading}
                      onBack={handleBack}
                    />
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-center w-full text-muted-foreground">
                    Already have an account?{" "}
                    <a href="/signin" className="text-primary hover:underline font-medium">
                      Sign in
                    </a>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
        <ThankYouDialog
          open={showThankYou}
          onOpenChange={setShowThankYou}
          userEmail={userEmail}
        />
      </div>
    </SidebarProvider>
  );
};

export default SignUp;