import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import SignInCard from "@/components/auth/SignInCard";
import { SignInFormData } from "@/components/auth/SignInForm";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSignIn = async (values: SignInFormData) => {
    setIsLoading(true);
    const { email, password } = values;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      navigate("/");
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const handleLinkedInSignIn = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "linkedin",
    });

    if (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const handleResetPassword = async () => {
    setIsResetting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset email sent!");
    }
    setIsResetting(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[calc(100vh-64px)]">
          <div className="flex-1 flex flex-col">
            <div className={`container mx-auto px-4 flex flex-col ${isMobile ? 'pt-8' : 'justify-center'} flex-1`}>
              <div className={`w-full max-w-md mx-auto ${isMobile ? '' : 'my-8'}`}>
                <div className={`space-y-2 ${isMobile ? 'text-left' : 'text-center'} mb-6`}>
                  <h1 className="text-2xl md:text-3xl font-bold">Welcome Back!</h1>
                  <p className="text-[14px] text-muted-foreground">
                    Sign in to your account
                  </p>
                </div>

                <SignInCard
                  onSubmit={handleSignIn}
                  isLoading={isLoading}
                  onGoogleSignIn={handleGoogleSignIn}
                  onLinkedInSignIn={handleLinkedInSignIn}
                  onForgotPassword={() => setShowForgotPassword(true)}
                />
              </div>
            </div>
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
      </div>
    </SidebarProvider>
  );
};

export default SignIn;
