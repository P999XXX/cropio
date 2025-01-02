import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import SignUpHeader from "@/components/auth/SignUpHeader";
import ThankYouDialog from "@/components/auth/ThankYouDialog";
import StepOneForm from "@/components/auth/StepOneForm";
import StepTwoForm from "@/components/auth/StepTwoForm";
import StepThreeForm from "@/components/auth/StepThreeForm";
import StepFourForm from "@/components/auth/StepFourForm";
import StepNavigation from "@/components/auth/StepNavigation";
import { handleGoogleSignIn, handleLinkedInSignIn } from "@/utils/auth-handlers";
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";
import { SidebarProvider } from "@/components/ui/sidebar";

const steps = ["Account Type", "Personal Info", "Company Info", "Banking Info"];

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };

    checkSession();
  }, [navigate]);

  const handleStepOne = (role: "buyer" | "supplier") => {
    setFormData(prev => ({ ...prev, role }));
    setStep(2);
  };

  const handleStepTwo = async (values: any) => {
    setFormData(prev => ({ ...prev, ...values }));
    setStep(3);
  };

  const handleStepThree = async (values: any) => {
    setFormData(prev => ({ ...prev, ...values }));
    setStep(4);
  };

  const handleStepFour = async (values: any) => {
    setIsLoading(true);
    try {
      const finalData = { ...formData, ...values };
      
      const { error: signUpError } = await supabase.auth.signUp({
        email: finalData.email,
        password: finalData.password,
        options: {
          data: {
            first_name: finalData.firstName,
            last_name: finalData.lastName,
            company_name: finalData.companyName,
            role: finalData.role,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      // Handle document upload if files are present
      if (values.documents?.length > 0) {
        for (const file of values.documents) {
          const { error: uploadError } = await supabase.storage
            .from('company_documents')
            .upload(`${finalData.email}/${file.name}`, file);
          
          if (uploadError) throw uploadError;
        }
      }

      setEmail(finalData.email);
      toast.success("Successfully signed up!", successToastStyle);
      setShowThankYou(true);
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(
        error.message || "Failed to sign up. Please try again.", 
        errorToastStyle
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Navbar />
        <main className="w-full container flex min-h-[calc(100vh-64px)] items-start justify-center px-4 md:px-0 mt-[57px]">
          <div className="w-full md:w-[500px] py-8">
            <SignUpHeader step={step} />
            <StepNavigation currentStep={step} steps={steps} />
            
            {isMobile ? (
              <div className="space-y-4">
                {step === 1 && (
                  <StepOneForm
                    onSubmit={handleStepOne}
                    onGoogleSignUp={handleGoogleSignIn}
                    onLinkedInSignUp={handleLinkedInSignIn}
                  />
                )}
                {step === 2 && (
                  <StepTwoForm
                    onSubmit={handleStepTwo}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
                )}
                {step === 3 && (
                  <StepThreeForm
                    onSubmit={handleStepThree}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
                )}
                {step === 4 && (
                  <StepFourForm
                    onSubmit={handleStepFour}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
                )}
              </div>
            ) : (
              <>
                {step === 1 && (
                  <StepOneForm
                    onSubmit={handleStepOne}
                    onGoogleSignUp={handleGoogleSignIn}
                    onLinkedInSignUp={handleLinkedInSignIn}
                  />
                )}
                {step === 2 && (
                  <StepTwoForm
                    onSubmit={handleStepTwo}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
                )}
                {step === 3 && (
                  <StepThreeForm
                    onSubmit={handleStepThree}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
                )}
                {step === 4 && (
                  <StepFourForm
                    onSubmit={handleStepFour}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
                )}
              </>
            )}
          </div>
        </main>
        <ThankYouDialog
          open={showThankYou}
          onOpenChange={setShowThankYou}
          userEmail={email}
        />
      </div>
    </SidebarProvider>
  );
};

export default SignUp;
