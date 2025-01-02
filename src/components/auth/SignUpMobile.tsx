import SignUpForm, { SignUpFormData } from "./SignUpForm";

interface SignUpMobileProps {
  onSubmit: (values: SignUpFormData) => Promise<void>;
  isLoading: boolean;
}

const SignUpMobile = ({
  onSubmit,
  isLoading,
}: SignUpMobileProps) => {
  return (
    <div className="space-y-4">
      <SignUpForm 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
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