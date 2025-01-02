import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";
import { useNavigate } from "react-router-dom";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const hash = window.location.hash;
        if (!hash) {
          console.error("No hash parameters found in URL");
          navigate('/signin?error=invalid_link');
          return;
        }

        const fragment = new URLSearchParams(hash.substring(1));
        const type = fragment.get('type');
        const access_token = fragment.get('access_token');
        const refresh_token = fragment.get('refresh_token');

        console.log("Auth redirect type:", type);
        console.log("Current URL:", window.location.href);
        console.log("Base URL:", window.location.origin);

        switch (type) {
          case 'recovery':
            if (!access_token || !refresh_token) {
              console.error("Missing tokens for recovery flow");
              toast.error("Invalid password reset link. Please request a new one.", errorToastStyle);
              navigate('/signin?error=invalid_token');
              return;
            }

            const { error: setSessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            if (setSessionError) {
              console.error("Set session error:", setSessionError);
              toast.error("Your password reset link has expired. Please request a new one.", errorToastStyle);
              navigate('/signin?error=expired_token');
              return;
            }

            navigate('/reset-password');
            break;

          case 'signup':
          case 'magiclink':
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError) {
              console.error("Session error:", sessionError);
              toast.error("Authentication failed. Please try again.", errorToastStyle);
              navigate('/signin?error=auth_failed');
              return;
            }

            if (session) {
              toast.success("Successfully authenticated!", successToastStyle);
              // Use window.location.origin to ensure we're using the correct base URL
              navigate('/dashboard');
            } else {
              console.error("No session after authentication");
              toast.error("Authentication failed. Please try again.", errorToastStyle);
              navigate('/signin?error=auth_failed');
            }
            break;

          default:
            console.error("Unknown auth type:", type);
            toast.error("Invalid authentication link.", errorToastStyle);
            navigate('/signin?error=unknown_type');
        }
      } catch (error: any) {
        console.error("Auth redirect error:", error);
        toast.error("An unexpected error occurred", errorToastStyle);
        navigate('/signin?error=unexpected');
      }
    };

    handleRedirect();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;