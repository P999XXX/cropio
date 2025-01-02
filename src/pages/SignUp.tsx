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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
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
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      console.error('Error checking email:', error);
      return false;
    }

    return !!data;
  };

  const handleStepTwo = async (values: any) => {
    setIsLoading(true);
    try {
      // Check if email exists
      const emailExists = await checkEmailExists(values.email);
      if (emailExists) {
        setEmail(values.email);
        setShowErrorDialog(true);
        setIsLoading(false);
        return;
      }

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

      setEmail(values.email);
      toast.success("Successfully signed up!", successToastStyle);
      setShowThankYou(true);
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(error.message || "Failed to sign up", errorToastStyle);
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
              <div className="space-y-3">
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

        <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
          <AlertDialogContent className="signup-error-dialog">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold">
                Email Already Exists
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2">
                An account with the email <span className="font-medium">{email}</span> already exists. 
                Please try signing in instead or use a different email address.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction 
                onClick={() => {
                  setShowErrorDialog(false);
                  navigate("/signin");
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Go to Sign In
              </AlertDialogAction>
              <AlertDialogAction 
                onClick={() => setShowErrorDialog(false)}
                className="bg-secondary hover:bg-secondary/90"
              >
                Try Different Email
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SidebarProvider>
  );
};

export default SignUp;