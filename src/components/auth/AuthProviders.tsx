import { Button } from "@/components/ui/button";
import { Chrome, Linkedin } from "lucide-react";
import { toast } from "sonner";

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
        variant="outline" 
        onClick={() => handleSocialSignUp(onGoogleSignUp)} 
        className="w-full"
      >
        <Chrome className="mr-2 h-4 w-4" />
        <span className="font-normal">{buttonText} with <span className="font-medium">Google</span></span>
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleSocialSignUp(onLinkedInSignUp)} 
        className="w-full"
      >
        <Linkedin className="mr-2 h-4 w-4" />
        <span className="font-normal">{buttonText} with <span className="font-medium">LinkedIn</span></span>
      </Button>
    </div>
  );
};

export default AuthProviders;