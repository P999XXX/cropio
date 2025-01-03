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
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useLoadingStates } from "@/hooks/useLoadingStates";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { getErrorMessage } from "@/utils/auth-error-handler";

const SignIn = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetThankYou, setShowResetThankYou] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const isMobile = useIsMobile();
  const { loadingStates, setLoading } = useLoadingStates();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignIn = async (values: SignInFormData) => {
    setLoading('isSigningIn', true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage, {
          ...errorToastStyle,
          icon: <AlertCircle className="h-5 w-5" />,
        });
        throw error;
      }

      toast.success("Welcome back! You've successfully signed in.", {
        ...successToastStyle,
        icon: <CheckCircle2 className="h-5 w-5" />,
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Sign in error:", error);
      throw error;
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

      if (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage, {
          ...errorToastStyle,
          icon: <AlertCircle className="h-5 w-5" />,
        });
        throw error;
      }

      setShowForgotPassword(false);
      setShowResetThankYou(true);
      toast.success("Reset instructions sent!", {
        ...successToastStyle,
        icon: <Mail className="h-5 w-5" />,
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      throw error;
    } finally {
      setLoading('isResettingPassword', false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Navbar />
        <main className="w-full container flex min-h-[calc(100vh-64px)] items-start justify-center px-4 md:px-0 mt-[57px]">
          <div className="w-full md:w-[500px] py-8">
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
                onGoogleSignIn={() => {}}
                onLinkedInSignIn={() => {}}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            ) : (
              <SignInCard
                onSubmit={handleSignIn}
                isLoading={loadingStates.isSigningIn}
                onGoogleSignIn={() => {}}
                onLinkedInSignIn={() => {}}
                onForgotPassword={() => setShowForgotPassword(true)}
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