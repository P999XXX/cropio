import SignInForm, { SignInFormData } from "./SignInForm";
import SocialLoginSection from "./SocialLoginSection";

interface SignInMobileProps {
  onSubmit: (values: SignInFormData) => Promise<void>;
  isLoading: boolean;
  onGoogleSignIn: () => void;
  onLinkedInSignIn: () => void;
  onForgotPassword: () => void;
}

const SignInMobile = ({
  onSubmit,
  isLoading,
  onGoogleSignIn,
  onLinkedInSignIn,
  onForgotPassword,
}: SignInMobileProps) => {
  return (
    <div className="space-y-6">
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
      <SocialLoginSection
        onGoogleSignIn={onGoogleSignIn}
        onLinkedInSignIn={onLinkedInSignIn}
      />
      <div className="text-sm text-center text-muted-foreground">
        Don't have an account?{" "}
        <a href="/signup" className="text-primary hover:underline font-medium">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default SignInMobile;