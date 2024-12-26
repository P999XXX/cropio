import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";
import SignInCard from "@/components/auth/SignInCard";
import SignInMobile from "@/components/auth/SignInMobile";
import type { SignInFormData } from "@/components/auth/SignInForm";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSignIn = async (values: SignInFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("LinkedIn sign in error:", error);
      toast.error(error.message || "Failed to sign in with LinkedIn");
    }
  };

  const handleResetPassword = async () => {
    setIsResetting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success("Password reset instructions sent to your email!");
      setShowForgotPasswordDialog(false);
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to send reset instructions");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className={`container mx-auto px-4 ${isMobile ? 'pt-8' : 'pt-16'} flex items-${isMobile ? 'start' : 'center'} justify-center min-h-[calc(100vh-64px)]`}>
        <div className={`max-w-md w-full space-y-6 ${isMobile ? 'mt-16' : 'my-8'}`}>
          <div className={`space-y-2 ${isMobile ? 'text-left' : 'text-center'}`}>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <div className="md:block hidden">
            <SignInCard
              onSubmit={handleSignIn}
              isLoading={isLoading}
              onGoogleSignIn={handleGoogleSignIn}
              onLinkedInSignIn={handleLinkedInSignIn}
              onForgotPassword={() => setShowForgotPasswordDialog(true)}
            />
          </div>

          <div className="md:hidden block">
            <SignInMobile
              onSubmit={handleSignIn}
              isLoading={isLoading}
              onGoogleSignIn={handleGoogleSignIn}
              onLinkedInSignIn={handleLinkedInSignIn}
              onForgotPassword={() => setShowForgotPasswordDialog(true)}
            />
          </div>
        </div>
      </div>

      <ForgotPasswordDialog
        open={showForgotPasswordDialog}
        onOpenChange={setShowForgotPasswordDialog}
        onSubmit={handleResetPassword}
        email={resetEmail}
        onEmailChange={setResetEmail}
        isResetting={isResetting}
      />
    </div>
  );
};

export default SignIn;