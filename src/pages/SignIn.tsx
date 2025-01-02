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

// Timeout duration for operations (15 seconds)
const OPERATION_TIMEOUT = 15000;

interface LoadingStates {
  isSigningIn: boolean;
  isGoogleSigningIn: boolean;
  isLinkedInSigningIn: boolean;
  isResettingPassword: boolean;
}

const SignIn = () => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    isSigningIn: false,
    isGoogleSigningIn: false,
    isLinkedInSigningIn: false,
    isResettingPassword: false,
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetThankYou, setShowResetThankYou] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Function to handle operation timeouts
  const withTimeout = async (operation: Promise<any>, timeoutDuration: number = OPERATION_TIMEOUT) => {
    return Promise.race([
      operation,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Operation timed out')), timeoutDuration)
      )
    ]);
  };

  // Enhanced session management
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN') {
        toast.success("Successfully signed in!", successToastStyle);
        navigate("/dashboard");
      } else if (event === 'SIGNED_OUT') {
        toast.error("Your session has ended. Please sign in again.", errorToastStyle);
      } else if (event === 'TOKEN_REFRESHED') {
        console.log("Session token refreshed");
      } else if (event === 'USER_UPDATED') {
        console.log("User data updated");
      }
    });

    // Initial session check
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
      if (error) {
        console.error("Session check error:", error);
        toast.error("Unable to verify your session", errorToastStyle);
      }
    };

    checkSession();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Get user's first name if available
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

  // Enhanced error handling with specific messages
  const getErrorMessage = (error: any): string => {
    const message = error?.message?.toLowerCase() || '';
    
    if (message.includes('invalid login credentials')) {
      return 'Incorrect email or password. Please try again.';
    } else if (message.includes('email not confirmed')) {
      return 'Please verify your email before signing in.';
    } else if (message.includes('timeout')) {
      return 'The operation timed out. Please check your internet connection and try again.';
    } else if (message.includes('network')) {
      return 'Unable to connect. Please check your internet connection.';
    } else if (message.includes('too many requests')) {
      return 'Too many attempts. Please try again later.';
    }
    
    return error.message || 'An unexpected error occurred. Please try again.';
  };

  const handleSignIn = async (values: SignInFormData) => {
    setLoadingStates(prev => ({ ...prev, isSigningIn: true }));
    
    try {
      const { error } = await withTimeout(
        supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        })
      );

      if (error) throw error;

    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(getErrorMessage(error), errorToastStyle);
      // Reset form on error
      if (error.message?.toLowerCase().includes('invalid login credentials')) {
        // Clear only password on invalid credentials
        values.password = '';
      } else {
        // Clear both fields on other errors
        values.email = '';
        values.password = '';
      }
    } finally {
      setLoadingStates(prev => ({ ...prev, isSigningIn: true }));
    }
  };

  const handleResetPasswordRequest = async () => {
    setLoadingStates(prev => ({ ...prev, isResettingPassword: true }));
    try {
      await withTimeout(
        handlePasswordReset(
          resetEmail,
          () => setLoadingStates(prev => ({ ...prev, isResettingPassword: false })),
          setShowForgotPassword,
          setShowResetThankYou
        )
      );
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(getErrorMessage(error), errorToastStyle);
    } finally {
      setLoadingStates(prev => ({ ...prev, isResettingPassword: false }));
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