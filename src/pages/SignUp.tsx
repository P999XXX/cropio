import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import StepOneForm from "@/components/auth/StepOneForm";
import StepTwoForm, { StepTwoFormData } from "@/components/auth/StepTwoForm";
import ThankYouDialog from "@/components/auth/ThankYouDialog";
import SignUpHeader from "@/components/auth/SignUpHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"buyer" | "supplier">();
  const [isLoading, setIsLoading] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleRoleSelect = (role: "buyer" | "supplier") => {
    setSelectedRole(role);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setSelectedRole(undefined);
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up with Google");
    }
  };

  const handleLinkedInSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin",
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up with LinkedIn");
    }
  };

  const handleSignUp = async (values: StepTwoFormData) => {
    if (!selectedRole) return;

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
      setIsThankYouOpen(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex min-h-[calc(100vh-64px)]">
          <div className="flex-1 flex items-center justify-center py-8 px-4 w-full">
            <div className="w-full max-w-md">
              <SignUpHeader
                step={currentStep}
                isMobile={isMobile}
              />

              {currentStep === 1 ? (
                <StepOneForm
                  onSubmit={handleRoleSelect}
                  onGoogleSignUp={handleGoogleSignUp}
                  onLinkedInSignUp={handleLinkedInSignUp}
                />
              ) : (
                <StepTwoForm
                  onSubmit={handleSignUp}
                  isLoading={isLoading}
                  onBack={handleBack}
                />
              )}
            </div>
          </div>
        </main>

        <ThankYouDialog
          open={isThankYouOpen}
          onOpenChange={setIsThankYouOpen}
          userEmail={userEmail}
        />
      </div>
    </SidebarProvider>
  );
};

export default SignUp;