import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icons/GoogleIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { toast } from "sonner";
import { memo } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface AuthProvidersProps {
  onGoogleSignUp: () => void;
  onLinkedInSignUp: () => void;
  selectedRole?: string;
  variant?: "signup" | "signin";
  isLoading?: boolean;
}

const AuthProviders = memo(({
  onGoogleSignUp,
  onLinkedInSignUp,
  variant = "signup",
  isLoading = false,
}: AuthProvidersProps) => {
  const handleSocialSignUp = async (callback: () => void, provider: string) => {
    try {
      console.log(`Attempting ${provider} sign in...`);
      await callback();
    } catch (error: any) {
      console.error(`${variant === "signup" ? "Sign up" : "Sign in"} error:`, error);
      toast.error(
        error.message || `Failed to ${variant === "signup" ? "sign up" : "sign in"} with ${provider}`, 
        { style: { background: '#ea384c', color: '#FFFFFF' } }
      );
    }
  };

  return (
    <div className="auth-providers space-y-2 w-full">
      <Button 
        variant="secondary"
        onClick={() => handleSocialSignUp(onGoogleSignUp, "Google")} 
        className="w-full flex items-center justify-center bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        aria-label={`${variant === "signup" ? "Sign up" : "Sign in"} with Google`}
        disabled={isLoading}
      >
        <div className="flex items-center">
          {isLoading ? (
            <LoadingSpinner size="sm" className="mr-2" />
          ) : (
            <GoogleIcon className="mr-2" />
          )}
          <span>
            {variant === "signup" ? "Sign up" : "Sign in"} with Google
          </span>
        </div>
      </Button>

      <Button 
        variant="secondary"
        onClick={() => handleSocialSignUp(onLinkedInSignUp, "LinkedIn")} 
        className="w-full flex items-center justify-center bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        aria-label={`${variant === "signup" ? "Sign up" : "Sign in"} with LinkedIn`}
        disabled={isLoading}
      >
        <div className="flex items-center">
          {isLoading ? (
            <LoadingSpinner size="sm" className="mr-2" />
          ) : (
            <LinkedInIcon className="mr-2" />
          )}
          <span>
            {variant === "signup" ? "Sign up" : "Sign in"} with LinkedIn
          </span>
        </div>
      </Button>
    </div>
  );
});

AuthProviders.displayName = "AuthProviders";

export default AuthProviders;