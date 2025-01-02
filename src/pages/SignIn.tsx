import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import SignInCard from "@/components/auth/SignInCard";
import SignInMobile from "@/components/auth/SignInMobile";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";
import ResetPasswordThankYouDialog from "@/components/auth/ResetPasswordThankYouDialog";
import { SignInFormData } from "@/components/auth/SignInForm";
import { handleGoogleSignIn, handleLinkedInSignIn, handlePasswordReset } from "@/utils/auth-handlers";
import { errorToastStyle } from "@/utils/toast-styles";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuthSession, withTimeout } from "@/hooks/useAuthSession";
import { useLoadingStates } from "@/hooks/useLoadingStates";
import { getErrorMessage } from "@/utils/auth-error-handler";

const SignIn = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetThankYou, setShowResetThankYou] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { loadingStates, setLoading } = useLoadingStates();
  const [searchParams] = useSearchParams();

  useAuthSession();

  useEffect(() => {
    // Check for error parameter in URL
    const error = searchParams.get('error');
    if (error) {
      let message = "An error occurred. Please try again.";
      
      switch (error) {
        case 'invalid_link':
          message = "The password reset link is invalid. Please request a new one.";
          break;
        case 'invalid_token':
          message = "Invalid password reset link. Please request a new one.";
          break;
        case 'expired_token':
          message = "Your password reset link has expired. Please request a new one.";
          break;
        case 'auth_failed':
          message = "Authentication failed. Please try again.";
          break;
        case 'unknown_type':
          message = "Invalid authentication link. Please try again.";
          break;
      }
      
      setErrorMessage(message);
      // Clear the error from URL
      navigate('/signin', { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const getFirstName = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
      }
    };
    
    getFirstName();
  }, []);

  const handleSignIn = async (values: SignInFormData) => {
    setLoading('isSigningIn', true);
    
    try {
      const { error } = await withTimeout(
        supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        })
      );

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error("Invalid email or password. Please try again.", errorToastStyle);
          values.password = '';
        } else {
          toast.error(getErrorMessage(error), errorToastStyle);
          values.email = '';
          values.password = '';
        }
        throw error;
      }

    } catch (error: any) {
      console.error("Sign in error:", error);
    } finally {
      setLoading('isSigningIn', false);
    }
  };

  const handleResetPasswordRequest = async () => {
    setLoading('isResettingPassword', true);
    try {
      await handlePasswordReset(
        resetEmail,
        (value) => setLoading('isResettingPassword', value),
        setShowForgotPassword,
        setShowResetThankYou
      );
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(getErrorMessage(error), errorToastStyle);
    } finally {
      setLoading('isResettingPassword', false);
    }
  };

  const handleForgotPassword = async () => {
    setShowForgotPassword(true);
    return Promise.resolve();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Navbar />
        <main className="w-full container flex min-h-[calc(100vh-64px)] items-start justify-center px-4 md:px-0 mt-[57px]">
          <div className="w-full md:w-[500px] py-8">
            {errorMessage && (
              <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {errorMessage}
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="ml-2 underline hover:text-destructive/80"
                >
                  Request new reset link
                </button>
              </div>
            )}
            <div className={`space-y-2 mb-8 ${isMobile ? "text-left" : "text-center"}`}>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {firstName ? `Welcome back ${firstName}!` : "Welcome back!"}
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