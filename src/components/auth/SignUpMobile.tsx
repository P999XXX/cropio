import SignUpForm, { SignUpFormData } from "./SignUpForm";
import AuthProviders from "./AuthProviders";

interface SignUpMobileProps {
  onSubmit: (values: SignUpFormData) => Promise<void>;
  isLoading: boolean;
  onGoogleSignIn: () => void;
  onLinkedInSignIn: () => void;
}

const SignUpMobile = ({
  onSubmit,
  isLoading,
  onGoogleSignIn,
  onLinkedInSignIn,
}: SignUpMobileProps) => {
  return (
    <div className="space-y-4">
      <SignUpForm 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
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
        variant="signup"
      />
      <div className="text-sm text-center text-muted-foreground pt-4">
        Already have an account?{" "}
        <a href="/signin" className="text-primary hover:underline font-medium">
          Sign in
        </a>
      </div>
    </div>
  );
};

export default SignUpMobile;