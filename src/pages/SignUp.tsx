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
import SignUpForm, { SignUpFormData } from "@/components/auth/SignUpForm";
import { useIsMobile } from "@/hooks/use-mobile";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSignUp = async (values: SignUpFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      toast.success("Signed up successfully! Please check your email for confirmation.");
      navigate("/signin");
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(error.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const FormContent = () => (
    <>
      <div className="text-left space-y-2">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground">Sign up to get started</p>
      </div>

      {isMobile ? (
        <div className="mt-6">
          <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
          <div className="text-sm text-center w-full text-muted-foreground mt-4">
            Already have an account?{" "}
            <a href="/signin" className="text-primary hover:underline font-medium">
              Sign in
            </a>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your email and password to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center w-full text-muted-foreground">
              Already have an account?{" "}
              <a href="/signin" className="text-primary hover:underline font-medium">
                Sign in
              </a>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className={`container mx-auto px-4 ${isMobile ? 'pt-8' : 'pt-16'} flex items-${isMobile ? 'start' : 'center'} justify-center min-h-[calc(100vh-64px)]`}>
        <div className={`max-w-md w-full space-y-6 ${isMobile ? 'mt-16' : 'my-8'}`}>
          <FormContent />
        </div>
      </div>
    </div>
  );
};

export default SignUp;