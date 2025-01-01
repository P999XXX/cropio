import { useState, useEffect, useCallback, useMemo } from "react";
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
import LoadingSpinner from "@/components/ui/loading-spinner";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetThankYou, setShowResetThankYou] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const checkSession = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session check error:", error);
        return null;
      }
      return session;
    } catch (error) {
      console.error("Session check failed:", error);
      return null;
    }
  }, []);

  const handleAuthStateChange = useCallback(async (event: string, session: any) => {
    console.log("Auth state changed:", event, session?.user?.id);
    if (event === 'SIGNED_IN' && session) {
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) {
          console.error("Profile fetch error:", profileError);
        } else if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
        
        navigate('/dashboard');
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    }
  }, [navigate]);

  useEffect(() => {
    let authListener: any;

    const setupAuth = async () => {
      console.log("Setting up auth listener...");
      
      // Check for existing session
      const session = await checkSession();
      if (session) {
        console.log("Existing session found, redirecting...");
        handleAuthStateChange('SIGNED_IN', session);
      }

      // Set up auth state change listener
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(handleAuthStateChange);
      authListener = subscription;

      setIsInitializing(false);
    };

    setupAuth();

    return () => {
      if (authListener) {
        console.log("Cleaning up auth listener...");
        authListener.unsubscribe();
      }
    };
  }, [checkSession, handleAuthStateChange]);

  const handleSignIn = useCallback(async (values: SignInFormData) => {
    console.log("Attempting sign in...");
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }

      console.log("Sign in successful:", data.user?.id);
      toast.success("Successfully signed in!", successToastStyle);
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in", errorToastStyle);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleResetPasswordRequest = useCallback(async () => {
    return handlePasswordReset(resetEmail, setIsResetting, setShowForgotPassword, setShowResetThankYou);
  }, [resetEmail]);

  const handleForgotPassword = useCallback(() => {
    setShowForgotPassword(true);
    return Promise.resolve();
  }, []);

  const welcomeMessage = useMemo(() => {
    return firstName ? `Welcome back ${firstName}!` : "Welcome back!";
  }, [firstName]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" aria-label="Initializing application" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Navbar />
        <main className="w-full container flex min-h-[calc(100vh-64px)] items-start justify-center px-4 md:px-0 mt-[57px]">
          <div className="w-full md:w-[500px] py-8">
            <div className={`space-y-2 mb-8 ${isMobile ? "text-left" : "text-center"}`}>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {welcomeMessage}
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