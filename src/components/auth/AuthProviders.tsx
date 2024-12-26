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
    <div className="space-y-2">
      <Button 
        variant="secondary" 
        onClick={() => handleSocialSignUp(onGoogleSignUp)} 
        className="w-full flex items-center justify-center bg-white hover:bg-gray-50 dark:bg-secondary/10 dark:hover:bg-secondary/20 text-foreground"
      >
        <div className="flex items-center">
          <GoogleIcon className="mr-2" />
          <span>
            {variant === "signup" ? "Sign up" : "Continue"} with Google
          </span>
        </div>
      </Button>

      <Button 
        variant="secondary" 
        onClick={() => handleSocialSignUp(onLinkedInSignUp)} 
        className="w-full flex items-center justify-center bg-white hover:bg-gray-50 dark:bg-secondary/10 dark:hover:bg-secondary/20 text-foreground"
      >
        <div className="flex items-center">
          <LinkedInIcon className="mr-2" />
          <span>
            {variant === "signup" ? "Sign up" : "Continue"} with LinkedIn
          </span>
        </div>
      </Button>
    </div>
  );
};

export default AuthProviders;