import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icons/GoogleIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { toast } from "sonner";

interface AuthProvidersProps {
  onGoogleSignUp: () => void;
  onLinkedInSignUp: () => void;
  selectedRole?: string;
  variant?: "signup" | "signin";
}

const AuthProviders = ({
  onGoogleSignUp,
  onLinkedInSignUp,
  selectedRole,
  variant = "signup",
}: AuthProvidersProps) => {
  const handleSocialSignUp = async (callback: () => void) => {
    try {
      await callback();
    } catch (error: any) {
      console.error(`${variant === "signup" ? "Sign up" : "Sign in"} error:`, error);
      toast.error(error.message || `Failed to ${variant === "signup" ? "sign up" : "sign in"}`);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Button 
        variant="secondary"
        onClick={() => handleSocialSignUp(onGoogleSignUp)} 
        className="w-full flex items-center justify-center"
      >
        <div className="flex items-center">
          <GoogleIcon className="mr-2" />
          <span>
            {variant === "signup" ? "Sign up" : "Sign in"} with Google
          </span>
        </div>
      </Button>

      <Button 
        variant="secondary"
        onClick={() => handleSocialSignUp(onLinkedInSignUp)} 
        className="w-full flex items-center justify-center"
      >
        <div className="flex items-center">
          <LinkedInIcon className="mr-2" />
          <span>
            {variant === "signup" ? "Sign up" : "Sign in"} with LinkedIn
          </span>
        </div>
      </Button>
    </div>
  );
};

export default AuthProviders;