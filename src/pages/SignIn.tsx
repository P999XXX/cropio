import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import SignInCard from "@/components/auth/SignInCard";
import SignInMobile from "@/components/auth/SignInMobile";
import { useIsMobile } from "@/hooks/use-mobile";
import { SignInFormData } from "@/components/auth/SignInForm";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSubmit = async (values: SignInFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      toast.success("Successfully signed in!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setIsResetting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      
      setShowForgotPassword(false);
      toast.success("Reset instructions sent to your email!");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to send reset instructions");
    } finally {
      setIsResetting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/auth/callback`,
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
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("LinkedIn sign in error:", error);
      toast.error(error.message || "Failed to sign in with LinkedIn");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
          <div className="w-full max-w-md flex flex-col items-center">
            <div className={`space-y-2 ${isMobile ? 'text-left w-full' : 'text-center'} mb-6`}>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome Back!</h1>
              <p className="text-[14px] text-muted-foreground">
                Sign in to your account
              </p>
            </div>

            {isMobile ? (
              <SignInMobile
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onGoogleSignIn={handleGoogleSignIn}
                onLinkedInSignIn={handleLinkedInSignIn}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            ) : (
              <Card className="w-full">
                <CardHeader className="pb-2">
                  <CardDescription>
                    Enter your credentials to sign in
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <SignInCard
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    onGoogleSignIn={handleGoogleSignIn}
                    onLinkedInSignIn={handleLinkedInSignIn}
                    onForgotPassword={() => setShowForgotPassword(true)}
                  />
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-center w-full text-muted-foreground">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-primary hover:underline font-medium">
                      Sign up
                    </a>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
        <ForgotPasswordDialog
          open={showForgotPassword}
          onOpenChange={setShowForgotPassword}
          onSubmit={handlePasswordReset}
          email={resetEmail}
          onEmailChange={setResetEmail}
          isResetting={isResetting}
        />
      </div>
    </SidebarProvider>
  );
};

export default SignIn;