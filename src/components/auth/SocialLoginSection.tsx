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
    </div>
  );
};

export default SocialLoginSection;