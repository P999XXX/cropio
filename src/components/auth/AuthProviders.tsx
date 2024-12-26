import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GoogleIcon from "@/components/icons/GoogleIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";

interface AuthProvidersProps {
  onGoogleSignUp: () => void;
  onLinkedInSignUp: () => void;
  selectedRole?: "buyer" | "supplier";
  variant?: "signup" | "signin";
}

const AuthProviders = ({ 
  onGoogleSignUp, 
  onLinkedInSignUp, 
  selectedRole,
  variant = "signup"
}: AuthProvidersProps) => {
  const handleSocialSignUp = (handler: () => void) => {
    if (variant === "signup" && !selectedRole) {
      toast.error("Please select your account type first");
      return;
    }
    handler();
  };

  const buttonText = variant === "signup" ? "Sign up" : "Sign in";

  return (
    <div className="flex flex-col gap-4">
      <Button 
        variant="secondary" 
        onClick={() => handleSocialSignUp(onGoogleSignUp)} 
        className="w-full h-12"
      >
        <GoogleIcon className="mr-2 h-8 w-8" />
        <span className="font-normal">{buttonText} with <span className="font-medium">Google</span></span>
      </Button>
      <Button 
        variant="secondary" 
        onClick={() => handleSocialSignUp(onLinkedInSignUp)} 
        className="w-full h-12"
      >
        <LinkedInIcon className="mr-2 h-8 w-8" />
        <span className="font-normal">{buttonText} with <span className="font-medium">LinkedIn</span></span>
      </Button>
    </div>
  );
};

export default AuthProviders;