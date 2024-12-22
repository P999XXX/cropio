import { Button } from "@/components/ui/button";
import { Google, Linkedin } from "lucide-react";

interface AuthProvidersProps {
  onGoogleSignUp: () => void;
  onLinkedInSignUp: () => void;
}

const AuthProviders = ({ onGoogleSignUp, onLinkedInSignUp }: AuthProvidersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <Button variant="outline" onClick={onGoogleSignUp} className="w-full">
          <Google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" onClick={onLinkedInSignUp} className="w-full">
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </Button>
      </div>
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

export default AuthProviders;