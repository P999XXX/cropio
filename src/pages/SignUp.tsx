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
  CardTitle,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import StepOneForm from "@/components/auth/StepOneForm";
import StepTwoForm, { StepTwoFormData } from "@/components/auth/StepTwoForm";
import ThankYouDialog from "@/components/auth/ThankYouDialog";

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
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            company_name: values.companyName,
            role: selectedRole,
          },
        },
      });

      if (error) throw error;

      setUserEmail(values.email);
      setShowThankYou(true);
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(error.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const FormContent = () => (
    <>
      <div className="text-left space-y-2">
        <h1 className="text-3xl font-bold">Register for Free!</h1>
        <p className="text-muted-foreground">
          {currentStep === 1 ? "Choose Your Role" : "Complete Your Profile"}
        </p>
      </div>

      {isMobile ? (
        <div className="mt-8">
          {currentStep === 1 ? (
            <StepOneForm
              onSubmit={handleStepOne}
              onGoogleSignUp={handleGoogleSignUp}
              onLinkedInSignUp={handleLinkedInSignUp}
            />
          ) : (
            <StepTwoForm onSubmit={handleStepTwo} isLoading={isLoading} />
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
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">
              {currentStep === 1 ? "Choose Your Role" : ""}
            </CardTitle>
            <CardDescription>
              {currentStep === 1
                ? "Select how you'll use the platform"
                : "Enter your details to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 ? (
              <StepOneForm
                onSubmit={handleStepOne}
                onGoogleSignUp={handleGoogleSignUp}
                onLinkedInSignUp={handleLinkedInSignUp}
              />
            ) : (
              <StepTwoForm onSubmit={handleStepTwo} isLoading={isLoading} />
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
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className={`container mx-auto px-6 ${isMobile ? 'pt-12' : 'pt-16'} flex items-${isMobile ? 'start' : 'center'} justify-center min-h-[calc(100vh-64px)]`}>
        <div className={`max-w-md w-full space-y-8 ${isMobile ? 'mt-16' : 'my-8'}`}>
          <FormContent />
        </div>
      </div>
      <ThankYouDialog
        open={showThankYou}
        onOpenChange={setShowThankYou}
        userEmail={userEmail}
      />
    </div>
  );
};

export default SignUp;