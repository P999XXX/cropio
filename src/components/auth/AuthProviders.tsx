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
        className="w-full flex items-center justify-center bg-secondary/50 dark:bg-secondary/10 hover:bg-secondary/60 dark:hover:bg-secondary/20 text-foreground"
      >
        <div className="flex items-center">
          <GoogleIcon className="mr-2" />
          <span className="font-normal">
            {buttonText} with <span className="font-bold">Google</span>
          </span>
        </div>
      </Button>
      <Button 
        variant="secondary" 
        onClick={() => handleSocialSignUp(onLinkedInSignUp)} 
        className="w-full flex items-center justify-center bg-secondary/50 dark:bg-secondary/10 hover:bg-secondary/60 dark:hover:bg-secondary/20 text-foreground"
      >
        <div className="flex items-center">
          <LinkedInIcon className="mr-2" />
          <span className="font-normal">
            {buttonText} with <span className="font-bold">LinkedIn</span>
          </span>
        </div>
      </Button>
    </div>
  );
};

export default AuthProviders;