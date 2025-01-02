import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import SignUpHeader from "@/components/auth/SignUpHeader";
import ThankYouDialog from "@/components/auth/ThankYouDialog";
import StepOneForm from "@/components/auth/StepOneForm";
import StepTwoForm from "@/components/auth/StepTwoForm";
import { handleGoogleSignIn, handleLinkedInSignIn } from "@/utils/auth-handlers";
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";
import { SidebarProvider } from "@/components/ui/sidebar";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"buyer" | "supplier">();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleStepOne = (role: "buyer" | "supplier") => {
    setSelectedRole(role);
    setStep(2);
  };

  const checkEmailExists = async (email: string) => {
    try {
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('email', email);

      if (error) {
        console.error('Error checking email:', error);
        return false;
      }

      return count ? count > 0 : false;
    } catch (error) {
      console.error('Error in checkEmailExists:', error);
      return false;
    }
  };

  const handleStepTwo = async (values: any) => {
    setIsLoading(true);
    try {
      const emailExists = await checkEmailExists(values.email);
      
      if (emailExists) {
        toast.error(
          "This email is already registered. Please sign in instead.", 
          {
            ...errorToastStyle,
            action: {
              label: "Sign In",
              onClick: () => navigate("/signin"),
            },
          }
        );
        setIsLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
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

      if (signUpError) {
        throw signUpError;
      }

      if (data?.user) {
        setEmail(values.email);
        toast.success("Successfully signed up!", successToastStyle);
        setShowThankYou(true);
      }
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
    setStep(1);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Navbar />
        <main className="w-full container flex min-h-[calc(100vh-64px)] items-start justify-center px-4 md:px-0 mt-[57px]">
          <div className="w-full md:w-[500px] py-8">
            <SignUpHeader step={step} />

            {isMobile ? (
              <div className="space-y-4">
                {step === 1 ? (
                  <StepOneForm
                    onSubmit={handleStepOne}
                    onGoogleSignUp={handleGoogleSignIn}
                    onLinkedInSignUp={handleLinkedInSignIn}
                  />
                ) : (
                  <StepTwoForm
                    onSubmit={handleStepTwo}
                    isLoading={isLoading}
                    onBack={handleBack}
                  />
                )}
              </div>
            ) : (
              <>
                {step === 1 ? (
                  <StepOneForm
                    onSubmit={handleStepOne}
                    onGoogleSignUp={handleGoogleSignIn}
                    onLinkedInSignUp={handleLinkedInSignIn}
                  />
                ) : (
                  <StepTwoForm
                    onSubmit={handleStepTwo}
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