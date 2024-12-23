import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProviders from "@/components/auth/AuthProviders";
import SignInForm, { SignInFormData } from "@/components/auth/SignInForm";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (values: SignInFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      toast.success("Successfully signed in!");
      navigate("/");
    } catch (error: any) {
      console.error("Signin error:", error);
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
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Google signin error:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("LinkedIn signin error:", error);
      toast.error("Failed to sign in with LinkedIn");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-16 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="max-w-md w-full space-y-3 my-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm onSubmit={handleSignIn} isLoading={isLoading} />

              <div className="relative my-4">
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
                onGoogleSignUp={handleGoogleSignIn}
                onLinkedInSignUp={handleLinkedInSignIn}
                variant="signin"
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <a href="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;