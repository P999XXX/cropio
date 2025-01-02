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
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          navigate('/signin?error=session_error');
          return;
        }

        // Check for hash parameters in URL
        if (!window.location.hash) {
          console.error("No hash parameters found in URL");
          navigate('/signin?error=invalid_link');
          return;
        }

        const fragment = new URLSearchParams(window.location.hash.substring(1));
        const type = fragment.get('type');
        const access_token = fragment.get('access_token');
        const refresh_token = fragment.get('refresh_token');

        console.log("Auth redirect type:", type);

        switch (type) {
          case 'recovery':
            if (!access_token || !refresh_token) {
              console.error("Missing tokens for recovery flow");
              navigate('/signin?error=invalid_token');
              return;
            }

            // Set the session with the recovery tokens
            const { error: setSessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            if (setSessionError) {
              console.error("Set session error:", setSessionError);
              navigate('/signin?error=expired_token');
              return;
            }

            navigate('/reset-password');
            break;

          case 'signup':
          case 'magiclink':
            if (session) {
              toast.success("Successfully authenticated!", successToastStyle);
              navigate('/dashboard');
            } else {
              console.error("No session after authentication");
              navigate('/signin?error=auth_failed');
            }
            break;

          default:
            console.error("Unknown auth type:", type);
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