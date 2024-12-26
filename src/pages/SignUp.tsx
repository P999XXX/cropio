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
import StepTwoForm from "@/components/auth/StepTwoForm";
import StepThreeForm from "@/components/auth/StepThreeForm";
import ThankYouDialog from "@/components/auth/ThankYouDialog";
import { StepOneFormData, StepTwoFormData, StepThreeFormData } from "@/types/auth";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"buyer" | "supplier">("buyer");
  const [showThankYou, setShowThankYou] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState<{
    stepOne?: StepOneFormData;
    stepTwo?: StepTwoFormData;
    stepThree?: StepThreeFormData;
  }>({});
  
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleStepOne = (data: StepOneFormData) => {
    setSelectedRole(data.role);
    setFormData(prev => ({ ...prev, stepOne: data }));
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  };

  const handleStepTwo = (values: StepTwoFormData) => {
    setFormData(prev => ({ ...prev, stepTwo: values }));
    setCurrentStep(3);
  };

  const handleStepThree = async (values: StepThreeFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: formData.stepTwo?.firstName,
            last_name: formData.stepTwo?.lastName,
            company_name: formData.stepTwo?.companyName,
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

  const FormContent = () => (
    <>
      <div className={`space-y-2 ${isMobile ? 'text-left' : 'text-center'} mb-6`}>
        <h1 className="text-2xl md:text-3xl font-bold">Register for Free!</h1>
        <p className="text-muted-foreground">
          {currentStep === 1 ? "Choose Your Role" : 
           currentStep === 2 ? "Enter Your Details" : 
           "Complete Your Profile"}
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
          ) : currentStep === 2 ? (
            <StepTwoForm 
              onSubmit={handleStepTwo} 
              isLoading={false}
              onBack={handleBack}
            />
          ) : (
            <StepThreeForm
              onSubmit={handleStepThree}
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
                : currentStep === 2
                ? "Enter your details to create an account"
                : "Complete your profile information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {currentStep === 1 ? (
              <StepOneForm
                onSubmit={handleStepOne}
                onGoogleSignUp={handleGoogleSignUp}
                onLinkedInSignUp={handleLinkedInSignUp}
              />
            ) : currentStep === 2 ? (
              <StepTwoForm 
                onSubmit={handleStepTwo} 
                isLoading={false}
                onBack={handleBack}
              />
            ) : (
              <StepThreeForm
                onSubmit={handleStepThree}
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
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className={`container mx-auto px-4 ${isMobile ? 'pt-12' : 'pt-20'} flex items-${isMobile ? 'start' : 'center'} justify-center min-h-[calc(100vh-64px)]`}>
        <div className={`max-w-md w-full ${isMobile ? 'mt-8' : 'my-8'}`}>
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