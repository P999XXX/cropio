import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm, { SignInFormData } from "./SignInForm";
import SocialLoginSection from "./SocialLoginSection";

interface SignInCardProps {
  onSubmit: (values: SignInFormData) => Promise<void>;
  isLoading: boolean;
  onGoogleSignIn: () => void;
  onLinkedInSignIn: () => void;
  onForgotPassword: () => void;
}

const SignInCard = ({
  onSubmit,
  isLoading,
  onGoogleSignIn,
  onLinkedInSignIn,
  onForgotPassword,
}: SignInCardProps) => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to sign in
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SignInForm onSubmit={onSubmit} isLoading={isLoading} />
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
        <SocialLoginSection
          onGoogleSignIn={onGoogleSignIn}
          onLinkedInSignIn={onLinkedInSignIn}
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <button
          onClick={onForgotPassword}
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
  );
};

export default SignInCard;