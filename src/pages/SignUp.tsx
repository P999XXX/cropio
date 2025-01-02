import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import SignUpMobile from "@/components/auth/SignUpMobile";
import SignUpCard from "@/components/auth/SignUpCard";
import { handleGoogleSignIn, handleLinkedInSignIn } from "@/utils/auth-handlers";
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";
import { SignUpFormData } from "@/components/auth/SignUpForm";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: SignUpFormData) => {
    setIsLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      toast.success("Successfully signed up!", successToastStyle);
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(
        error.message || "Failed to sign up. Please try again.",
        errorToastStyle
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <div className="flex-1">
          <Navbar />
          <main className="container relative mx-auto flex min-h-[calc(100vh-theme(spacing.header))] items-center justify-center px-4 py-16">
            <div className="w-full">
              <div className="mx-auto w-full max-w-[400px] space-y-6 lg:hidden">
                <SignUpMobile 
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  onGoogleSignIn={handleGoogleSignIn}
                  onLinkedInSignIn={handleLinkedInSignIn}
                />
              </div>
              <div className="hidden lg:block">
                <SignUpCard 
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  onGoogleSignIn={handleGoogleSignIn}
                  onLinkedInSignIn={handleLinkedInSignIn}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SignUp;