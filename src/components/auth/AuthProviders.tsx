import { Button } from "@/components/ui/button";
import { Chrome, Linkedin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthProvidersProps {
  onProviderClick: (provider: "google" | "linkedin") => void;
}

const AuthProviders = ({ onProviderClick }: AuthProvidersProps) => {
  const handleProviderClick = async (provider: "google" | "linkedin") => {
    try {
      onProviderClick(provider);
    } catch (error: any) {
      console.error(`${provider} signup error:`, error);
      toast.error(`Failed to sign up with ${provider}`);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <Button 
        variant="outline" 
        onClick={() => handleProviderClick("google")}
        className="w-full"
      >
        <Chrome className="mr-2 h-4 w-4" />
        <span className="font-normal">Sign up to <span className="font-medium">cropio</span> with <span className="font-medium">Google</span></span>
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleProviderClick("linkedin")}
        className="w-full"
      >
        <Linkedin className="mr-2 h-4 w-4" />
        <span className="font-normal">Sign up to <span className="font-medium">cropio</span> with <span className="font-medium">LinkedIn</span></span>
      </Button>
    </div>
  );
};

export default AuthProviders;