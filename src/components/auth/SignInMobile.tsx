import SignInForm, { SignInFormData } from "./SignInForm";

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
  onForgotPassword,
}: SignInMobileProps) => {
  return (
    <div className="space-y-4">
      <SignInForm 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        onForgotPassword={onForgotPassword}
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