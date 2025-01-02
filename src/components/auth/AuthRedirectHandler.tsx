import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";

const AuthRedirectHandler = () => {
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Check if we have a hash in the URL
        if (!window.location.hash) {
          console.error("No hash parameters found in URL");
          toast.error("Invalid or expired link. Please request a new one.", errorToastStyle);
          return;
        }

        const fragment = new URLSearchParams(window.location.hash.substring(1));
        const type = fragment.get('type');
        const access_token = fragment.get('access_token');
        const refresh_token = fragment.get('refresh_token');

        console.log("Auth redirect type:", type);

        // Handle different auth flows
        switch (type) {
          case 'recovery':
            // Verify we have the necessary tokens
            if (!access_token || !refresh_token) {
              console.error("Missing tokens for recovery flow");
              toast.error("Invalid password reset link. Please request a new one.", errorToastStyle);
              return;
            }

            // For recovery flow, verify the tokens are valid without setting a session
            const { error: verifyError } = await supabase.auth.verifyOtp({
              token_hash: access_token,
              type: 'recovery',
            });

            if (verifyError) {
              console.error("Token verification error:", verifyError);
              toast.error("Your password reset link has expired. Please request a new one.", errorToastStyle);
              return;
            }

            console.log("Recovery token verified successfully");
            break;

          case 'signup':
          case 'magiclink':
            const { error } = await supabase.auth.getSession();
            if (error) {
              console.error("Session error:", error);
              toast.error("Authentication failed. Please try signing in again.", errorToastStyle);
            } else {
              toast.success("Successfully authenticated!", successToastStyle);
            }
            break;

          default:
            console.error("Unknown auth type:", type);
            toast.error("Invalid authentication link. Please try signing in again.", errorToastStyle);
        }
      } catch (error: any) {
        console.error("Auth redirect error:", error);
        toast.error("An error occurred. Please try signing in again.", errorToastStyle);
      }
    };

    handleRedirect();
  }, []);

  return null;
};

export default AuthRedirectHandler;