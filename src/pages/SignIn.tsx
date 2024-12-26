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
    // Check URL hash for error message
    const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
    const errorDescription = hashParams.get('error_description');
    
    if (errorDescription === 'Email link is invalid or has expired') {
      toast.error("Your password reset link has expired. Please request a new one.", {
        style: {
          background: '#ea384c',
          color: '#FFFFFF',
        },
      });
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

      toast.success("Successfully signed in!", {
        style: {
          background: '#4CAF50',
          color: '#FFFFFF',
        },
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in", {
        style: {
          background: '#ea384c',
          color: '#FFFFFF',
        },
      });
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
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast.error(error.message || "Failed to sign in with Google", {
        style: {
          background: '#ea384c',
          color: '#FFFFFF',
        },
      });
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("LinkedIn sign in error:", error);
      toast.error(error.message || "Failed to sign in with LinkedIn", {
        style: {
          background: '#ea384c',
          color: '#FFFFFF',
        },
      });
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleResetPassword = async () => {
    setIsResetting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      
      setShowForgotPassword(false);
      setShowResetThankYou(true);
      toast.success("Reset instructions sent!", {
        style: {
          background: '#4CAF50',
          color: '#FFFFFF',
        },
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to send reset instructions", {
        style: {
          background: '#ea384c',
          color: '#FFFFFF',
        },
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className={`container mx-auto px-4 pt-20 flex items-${isMobile ? 'start' : 'center'} justify-center min-h-[calc(100vh-64px)]`}>
        <div className="max-w-md w-full">
          <div className={`space-y-2 ${isMobile ? 'text-left' : 'text-center'} mb-6`}>
            <h1 className="text-2xl md:text-3xl font-extrabold">
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
      </div>
      <ForgotPasswordDialog
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
        onSubmit={handleResetPassword}
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
  );
};

export default SignIn;