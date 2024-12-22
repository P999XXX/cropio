import { Button } from "@/components/ui/button";
import { Chrome, Linkedin } from "lucide-react";

interface AuthProvidersProps {
  onGoogleSignUp: () => void;
  onLinkedInSignUp: () => void;
}

const AuthProviders = ({ onGoogleSignUp, onLinkedInSignUp }: AuthProvidersProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" onClick={onGoogleSignUp} className="w-full">
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" onClick={onLinkedInSignUp} className="w-full">
        <Linkedin className="mr-2 h-4 w-4" />
        LinkedIn
      </Button>
    </div>
  );
};

export default AuthProviders;