import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import StepOneForm from "@/components/auth/StepOneForm";
import StepTwoForm from "@/components/auth/StepTwoForm";
import StepThreeForm from "@/components/auth/StepThreeForm";
import SignUpContainer, { useSignUpState } from "@/components/auth/SignUpContainer";

const SignUpContent = () => {
  const {
    isLoading,
    currentStep,
    handleStepOne,
    handleBack,
    handleStepTwo,
    handleStepThree,
  } = useSignUpState();
  
  const isMobile = useIsMobile();

  const handleGoogleSignUp = async () => {
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
      console.error("Google sign up error:", error);
      toast.error(error.message || "Failed to sign up with Google");
    }
  };

  const handleLinkedInSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("LinkedIn sign up error:", error);
      toast.error(error.message || "Failed to sign up with LinkedIn");
    }
  };

  const FormContent = () => (
    <>
      <div className={`space-y-2 ${isMobile ? 'text-left' : 'text-center'} mb-6`}>
        <h1 className="text-2xl md:text-3xl font-bold">Register for Free!</h1>
        <p className="text-muted-foreground">
          {currentStep === 1 ? "Choose Your Role" : 
           currentStep === 2 ? "Enter Your Details" : 
           "Complete Your Profile"}
        </p>
      </div>

      {isMobile ? (
        <div>
          {currentStep === 1 ? (
            <StepOneForm
              onSubmit={handleStepOne}
              onGoogleSignUp={handleGoogleSignUp}
              onLinkedInSignUp={handleLinkedInSignUp}
            />
          ) : currentStep === 2 ? (
            <StepTwoForm 
              onSubmit={handleStepTwo} 
              isLoading={false}
              onBack={handleBack}
            />
          ) : (
            <StepThreeForm
              onSubmit={handleStepThree}
              isLoading={isLoading}
              onBack={handleBack}
            />
          )}
          <div className="text-sm text-center w-full text-muted-foreground mt-6">
            Already have an account?{" "}
            <a href="/signin" className="text-primary hover:underline font-medium">
              Sign in
            </a>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>
              {currentStep === 1
                ? "Select how you'll use the platform"
                : currentStep === 2
                ? "Enter your details to create an account"
                : "Complete your profile information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {currentStep === 1 ? (
              <StepOneForm
                onSubmit={handleStepOne}
                onGoogleSignUp={handleGoogleSignUp}
                onLinkedInSignUp={handleLinkedInSignUp}
              />
            ) : currentStep === 2 ? (
              <StepTwoForm 
                onSubmit={handleStepTwo} 
                isLoading={false}
                onBack={handleBack}
              />
            ) : (
              <StepThreeForm
                onSubmit={handleStepThree}
                isLoading={isLoading}
                onBack={handleBack}
              />
            )}
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

  return <FormContent />;
};

const SignUp = () => {
  const isMobile = useIsMobile();

  return (
    <SignUpContainer>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className={`container mx-auto px-4 ${isMobile ? 'pt-12' : 'pt-20'} flex items-${isMobile ? 'start' : 'center'} justify-center min-h-[calc(100vh-64px)]`}>
          <div className={`max-w-md w-full ${isMobile ? 'mt-8' : 'my-8'}`}>
            <SignUpContent />
          </div>
        </div>
      </div>
    </SignUpContainer>
  );
};

export default SignUp;