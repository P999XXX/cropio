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

  // Memoized initialization function
  const initializeAuth = useCallback(async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) throw profileError;
        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error("Auth initialization error:", error);
      toast.error("Failed to initialize authentication", errorToastStyle);
    } finally {
      setIsInitializing(false);
    }
  }, [navigate]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Memoized sign in handler
  const handleSignIn = useCallback(async (values: SignInFormData) => {
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
  }, [navigate]);

  const handleResetPasswordRequest = useCallback(async () => {
    return handlePasswordReset(resetEmail, setIsResetting, setShowForgotPassword, setShowResetThankYou);
  }, [resetEmail]);

  const handleForgotPassword = useCallback(() => {
    setShowForgotPassword(true);
    return Promise.resolve();
  }, []);

  // Memoized welcome message
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