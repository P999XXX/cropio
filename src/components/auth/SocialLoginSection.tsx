import AuthProviders from "./AuthProviders";

interface SocialLoginSectionProps {
  onGoogleSignIn: () => void;
  onLinkedInSignIn: () => void;
}

const SocialLoginSection = ({ onGoogleSignIn, onLinkedInSignIn }: SocialLoginSectionProps) => {
  return (
    <div className="space-y-4">
      <AuthProviders
        onGoogleSignUp={onGoogleSignIn}
        onLinkedInSignUp={onLinkedInSignIn}
        variant="signin"
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
    </div>
  );
};

export default SocialLoginSection;