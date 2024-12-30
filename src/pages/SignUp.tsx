import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import StepOneForm from "@/components/auth/StepOneForm";
import StepTwoForm, { StepTwoFormData } from "@/components/auth/StepTwoForm";
import ThankYouDialog from "@/components/auth/ThankYouDialog";
import SignUpHeader from "@/components/auth/SignUpHeader";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

type UserRole = "buyer" | "supplier";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [formData, setFormData] = useState<StepTwoFormData & { role?: UserRole }>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    companyName: "",
    countryCode: "+49",
    phoneNumber: "",
    acceptTerms: false,
    acceptPrivacy: false,
  });
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleStepOneSubmit = (role: UserRole) => {
    setFormData((prev) => ({ ...prev, role }));
    setCurrentStep(2);
  };

  const handleStepTwoSubmit = async (data: StepTwoFormData) => {
    try {
      const finalData = { ...formData, ...data };
      const { error } = await supabase.auth.signUp({
        email: finalData.email,
        password: finalData.password,
        options: {
          data: {
            first_name: finalData.firstName,
            last_name: finalData.lastName,
            company_name: finalData.companyName,
            role: finalData.role,
            phone: finalData.phoneNumber,
          },
        },
      });

      if (error) throw error;

      setIsThankYouOpen(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    }
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
                  onSubmit={handleStepOneSubmit}
                  onGoogleSignUp={handleGoogleSignUp}
                  onLinkedInSignUp={handleLinkedInSignUp}
                />
              ) : (
                <StepTwoForm
                  onSubmit={handleStepTwoSubmit}
                  onBack={() => setCurrentStep(1)}
                  isLoading={false}
                />
              )}
            </div>
          </div>
        </main>

        <ThankYouDialog
          open={isThankYouOpen}
          onOpenChange={setIsThankYouOpen}
          userEmail={formData.email}
        />
      </div>
    </SidebarProvider>
  );
};

export default SignUp;