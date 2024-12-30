import { useState } from "react";
import SignInForm from "@/components/auth/SignInForm";
import SignInCard from "@/components/auth/SignInCard";
import SignInMobile from "@/components/auth/SignInMobile";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";
import ThankYouDialog from "@/components/auth/ThankYouDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSignIn = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      toast.success("Signed in successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
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
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin",
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with LinkedIn");
    }
  };

  const handleForgotPassword = async () => {
    setIsResetting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setIsForgotPasswordOpen(false);
      setIsThankYouOpen(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset instructions");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex min-h-[calc(100vh-64px)]">
          <div className="flex-1 flex items-center justify-center py-8 px-4 w-full">
            <div className="w-full max-w-md">
              {isMobile ? (
                <SignInMobile
                  onSubmit={handleSignIn}
                  isLoading={isLoading}
                  onGoogleSignIn={handleGoogleSignIn}
                  onLinkedInSignIn={handleLinkedInSignIn}
                  onForgotPassword={() => setIsForgotPasswordOpen(true)}
                />
              ) : (
                <SignInCard
                  onSubmit={handleSignIn}
                  isLoading={isLoading}
                  onGoogleSignIn={handleGoogleSignIn}
                  onLinkedInSignIn={handleLinkedInSignIn}
                  onForgotPassword={() => setIsForgotPasswordOpen(true)}
                />
              )}
            </div>
          </div>
        </main>

        <ForgotPasswordDialog
          open={isForgotPasswordOpen}
          onOpenChange={setIsForgotPasswordOpen}
          onSubmit={handleForgotPassword}
          email={resetEmail}
          onEmailChange={setResetEmail}
          isResetting={isResetting}
        />

        <ThankYouDialog
          open={isThankYouOpen}
          onOpenChange={setIsThankYouOpen}
          userEmail={resetEmail}
        />
      </div>
    </SidebarProvider>
  );
};

export default SignIn;