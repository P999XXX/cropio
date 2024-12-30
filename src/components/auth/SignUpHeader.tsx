interface SignUpHeaderProps {
  step: number;
  isMobile: boolean;
}

const SignUpHeader = ({ step, isMobile }: SignUpHeaderProps) => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-2xl font-semibold mb-2">
        {step === 1 ? "Choose your role" : "Create your account"}
      </h1>
      <p className="text-muted-foreground">
        {step === 1
          ? "Select how you'll be using our platform"
          : "Fill in your information to get started"}
      </p>
    </div>
  );
};

export default SignUpHeader;