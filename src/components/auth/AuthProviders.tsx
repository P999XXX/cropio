import { Button } from "@/components/ui/button";
import { Chrome, Linkedin } from "lucide-react";
import { toast } from "sonner";

interface AuthProvidersProps {
  onGoogleSignUp: () => void;
  onLinkedInSignUp: () => void;
  selectedRole?: "buyer" | "supplier";
}

const AuthProviders = ({ 
  onGoogleSignUp, 
  onLinkedInSignUp, 
  selectedRole 
}: AuthProvidersProps) => {
  const handleSocialSignUp = (handler: () => void) => {
    if (!selectedRole) {
      toast.error("Please select your account type first");
      return;
    }
    handler();
  };

  return (
    <div className="flex flex-col gap-4">
      <Button 
        variant="outline" 
        onClick={() => handleSocialSignUp(onGoogleSignUp)} 
        className="w-full"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Sign Up with Google
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleSocialSignUp(onLinkedInSignUp)} 
        className="w-full"
      >
        <Linkedin className="mr-2 h-4 w-4" />
        Sign Up with LinkedIn
      </Button>
    </div>
  );
};

export default AuthProviders;