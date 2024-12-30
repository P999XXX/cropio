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

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
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
          <div className="w-full max-w-md">
            <div className={`space-y-2 ${isMobile ? 'text-left' : 'text-center'} mb-6`}>
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
              <SignInCard
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onGoogleSignIn={handleGoogleSignIn}
                onLinkedInSignIn={handleLinkedInSignIn}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            )}
          </div>
        </div>
        <ForgotPasswordDialog
          open={showForgotPassword}
          onOpenChange={setShowForgotPassword}
        />
      </div>
    </SidebarProvider>
  );
};

export default SignIn;