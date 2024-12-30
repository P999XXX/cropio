import { useState, useEffect } from "react";
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
import { handleGoogleSignIn, handleLinkedInSignIn, handlePasswordReset } from "@/utils/auth-handlers";
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";
import { SidebarProvider } from "@/components/ui/sidebar";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetThankYou, setShowResetThankYou] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
    const errorDescription = hashParams.get('error_description');
    
    if (errorDescription === 'Email link is invalid or has expired') {
      toast.error("Your password reset link has expired. Please request a new one.", errorToastStyle);
    }

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
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      toast.success("Successfully signed in!", successToastStyle);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in", errorToastStyle);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordRequest = async () => {
    return handlePasswordReset(resetEmail, setIsResetting, setShowForgotPassword, setShowResetThankYou);
  };

  const handleForgotPassword = async () => {
    setShowForgotPassword(true);
    return Promise.resolve();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container flex min-h-[calc(100vh-64px)] items-center justify-center">
          <div className="w-full md:w-[500px] py-16">
            <div className="space-y-2 text-center mb-8">
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
                isLoading={isLoading}
                onGoogleSignIn={handleGoogleSignIn}
                onLinkedInSignIn={handleLinkedInSignIn}
                onForgotPassword={handleForgotPassword}
              />
            ) : (
              <SignInCard
                onSubmit={handleSignIn}
                isLoading={isLoading}
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
          isResetting={isResetting}
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