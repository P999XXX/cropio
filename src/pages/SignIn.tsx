import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import SignInCard from "@/components/auth/SignInCard";
import SignInMobile from "@/components/auth/SignInMobile";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";
import ResetPasswordThankYouDialog from "@/components/auth/ResetPasswordThankYouDialog";
import { SignInFormData } from "@/components/auth/SignInForm";
import { handleGoogleSignIn, handleLinkedInSignIn } from "@/utils/auth-handlers";
import { errorToastStyle } from "@/utils/toast-styles";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useLoadingStates } from "@/hooks/useLoadingStates";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const SignIn = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetThankYou, setShowResetThankYou] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isMobile = useIsMobile();
  const { loadingStates, setLoading } = useLoadingStates();
  const navigate = useNavigate();

  const handleSignIn = async (values: SignInFormData) => {
    setLoading('isSigningIn', true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        let errorMessage = "An error occurred during sign in. Please try again.";
        
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = "Please verify your email before signing in.";
        }

        toast.error(errorMessage, errorToastStyle);
        throw error;
      }

      if (data.session) {
        await supabase.auth.setSession(data.session);
        toast.success("Signed in successfully!");
        navigate('/dashboard');
      }

    } catch (error: any) {
      console.error("Sign in error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading('isSigningIn', false);
    }
  };

  const handleResetPasswordRequest = async () => {
    setLoading('isResettingPassword', true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });

      if (error) throw error;

      setShowForgotPassword(false);
      setShowResetThankYou(true);
      
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to send reset instructions", errorToastStyle);
    } finally {
      setLoading('isResettingPassword', false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Navbar />
        <main className="w-full container flex min-h-[calc(100vh-64px)] items-start justify-center px-4 md:px-0 mt-[57px]">
          <div className="w-full md:w-[500px] py-8">
            {errorMessage && (
              <Alert variant="destructive" className="mb-6 border-2 border-destructive/20 bg-destructive/10 dark:bg-destructive/20 shadow-sm">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <AlertDescription className="flex flex-col gap-3 ml-2">
                  <p className="text-destructive font-medium">{errorMessage}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowForgotPassword(true)}
                    className="w-fit text-[13px] bg-destructive hover:bg-destructive/90"
                  >
                    Request new reset link
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            <div className={`space-y-2 mb-8 ${isMobile ? "text-left" : "text-center"}`}>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Welcome back!
              </h1>
              <p className="text-[14px] text-muted-foreground">
                Please sign in to continue
              </p>
            </div>

            {isMobile ? (
              <SignInMobile
                onSubmit={handleSignIn}
                isLoading={loadingStates.isSigningIn}
                onGoogleSignIn={handleGoogleSignIn}
                onLinkedInSignIn={handleLinkedInSignIn}
                onForgotPassword={handleForgotPassword}
              />
            ) : (
              <SignInCard
                onSubmit={handleSignIn}
                isLoading={loadingStates.isSigningIn}
                onGoogleSignIn={handleGoogleSignIn}
                onLinkedInSignIn={handleLinkedInSignIn}
                onForgotPassword={handleForgotPassword}
              />
            )}
          </div>
        </main>
        <ForgotPasswordDialog
          open={showForgotPassword}
          onOpenChange={setShowForgotPassword}
          onSubmit={handleResetPasswordRequest}
          email={resetEmail}
          onEmailChange={setResetEmail}
          isResetting={loadingStates.isResettingPassword}
        />
        <ResetPasswordThankYouDialog
          open={showResetThankYou}
          onOpenChange={setShowResetThankYou}
          userEmail={resetEmail}
        />
      </div>
    </SidebarProvider>
  );
};

export default SignIn;