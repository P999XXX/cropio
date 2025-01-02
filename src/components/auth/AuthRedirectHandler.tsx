import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();
  const isDevelopment = import.meta.env.MODE === 'development';

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Check if we have a hash in the URL
        if (!window.location.hash) {
          console.error("No hash parameters found in URL");
          toast.error("Invalid or expired link. Please request a new one.", errorToastStyle);
          if (!isDevelopment) navigate('/signin');
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
              if (!isDevelopment) navigate('/signin');
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
              if (!isDevelopment) navigate('/signin');
              return;
            }

            // If verification successful, redirect to reset password page with the hash intact
            console.log("Redirecting to reset password page");
            if (!isDevelopment) navigate(`/reset-password${window.location.hash}`);
            break;

          case 'signup':
          case 'magiclink':
            const { error } = await supabase.auth.getSession();
            if (error) {
              console.error("Session error:", error);
              toast.error("Authentication failed. Please try signing in again.", errorToastStyle);
              if (!isDevelopment) navigate('/signin');
            } else {
              toast.success("Successfully authenticated!", successToastStyle);
              if (!isDevelopment) navigate('/dashboard');
            }
            break;

          default:
            console.error("Unknown auth type:", type);
            toast.error("Invalid authentication link. Please try signing in again.", errorToastStyle);
            if (!isDevelopment) navigate('/signin');
        }
      } catch (error: any) {
        console.error("Auth redirect error:", error);
        toast.error("An error occurred. Please try signing in again.", errorToastStyle);
        if (!isDevelopment) navigate('/signin');
      }
    };

    handleRedirect();
  }, [navigate, isDevelopment]);

  return null;
};

export default AuthRedirectHandler;