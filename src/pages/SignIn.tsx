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
import SignInForm, { SignInFormData } from "@/components/auth/SignInForm";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

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
      <div className="container mx-auto px-4 pt-16 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="max-w-md w-full space-y-6 my-8">
          <div className="text-left space-y-2">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <div className="md:block hidden">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Sign In</CardTitle>
                <CardDescription>
                  Enter your email and password to sign in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignInForm onSubmit={handleSignIn} isLoading={isLoading} />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <button
                  onClick={() => setShowForgotPasswordDialog(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </button>
                <div className="text-sm text-center w-full text-muted-foreground">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-primary hover:underline font-medium">
                    Sign up
                  </a>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="md:hidden block space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to sign in
              </p>
            </div>
            <SignInForm onSubmit={handleSignIn} isLoading={isLoading} />
            <div className="space-y-4">
              <button
                onClick={() => setShowForgotPasswordDialog(true)}
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </button>
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <a href="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </a>
              </div>
            </div>
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