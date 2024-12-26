import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import SignInForm, { SignInFormData } from "@/components/auth/SignInForm";
import AuthProviders from "@/components/auth/AuthProviders";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";

interface SignInCardProps {
  onSubmit: (values: SignInFormData) => Promise<void>;
  isLoading: boolean;
  onForgotPassword: () => void;
  onGoogleSignIn: () => void;
  onLinkedInSignIn: () => void;
}

const SignInCard = ({
  onSubmit,
  isLoading,
  onForgotPassword,
  onGoogleSignIn,
  onLinkedInSignIn,
}: SignInCardProps) => {
  return (
    <>
      <CardContent>
        <SignInForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          onForgotPassword={onForgotPassword}
        />
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <AuthProviders
          onGoogleSignUp={onGoogleSignIn}
          onLinkedInSignUp={onLinkedInSignIn}
          variant="signin"
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
    </>
  );
};

interface SignInMobileProps extends SignInCardProps {}

const SignInMobile = ({
  onSubmit,
  isLoading,
  onForgotPassword,
  onGoogleSignIn,
  onLinkedInSignIn,
}: SignInMobileProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome Back!</h1>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      <SignInForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        onForgotPassword={onForgotPassword}
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <AuthProviders
        onGoogleSignUp={onGoogleSignIn}
        onLinkedInSignUp={onLinkedInSignIn}
        variant="signin"
      />

      <div className="text-sm text-center w-full text-muted-foreground">
        Don't have an account?{" "}
        <a href="/signup" className="text-primary hover:underline font-medium">
          Sign up
        </a>
      </div>
    </div>
  );
};

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
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
      toast.error(error.message || "Failed to sign in with Google");
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
      toast.error(error.message || "Failed to sign in with LinkedIn");
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className={`container mx-auto px-4 ${isMobile ? 'pt-12' : 'pt-20'} flex items-${isMobile ? 'start' : 'center'} justify-center min-h-[calc(100vh-64px)]`}>
        <div className={`max-w-md w-full ${isMobile ? 'mt-8' : 'my-8'}`}>
          {isMobile ? (
            <SignInMobile
              onSubmit={handleSignIn}
              isLoading={isLoading}
              onForgotPassword={handleForgotPassword}
              onGoogleSignIn={handleGoogleSignIn}
              onLinkedInSignIn={handleLinkedInSignIn}
            />
          ) : (
            <Card className="md:min-w-[500px]">
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
              </CardHeader>
              <SignInCard
                onSubmit={handleSignIn}
                isLoading={isLoading}
                onForgotPassword={handleForgotPassword}
                onGoogleSignIn={handleGoogleSignIn}
                onLinkedInSignIn={handleLinkedInSignIn}
              />
            </Card>
          )}
        </div>
      </div>
      <ForgotPasswordDialog
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
      />
    </div>
  );
};

export default SignIn;