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
      <SocialLoginSection
        onGoogleSignIn={onGoogleSignIn}
        onLinkedInSignIn={onLinkedInSignIn}
      />
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to sign in
        </p>
      </div>
      <SignInForm onSubmit={onSubmit} isLoading={isLoading} />
      <div className="space-y-4">
        <button
          onClick={onForgotPassword}
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
  );
};

export default SignInMobile;