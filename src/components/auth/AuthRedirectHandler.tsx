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

            const { error: verifyError } = await supabase.auth.verifyOtp({
              token_hash: access_token,
              type: 'recovery',
            });

            if (verifyError) {
              console.error("Token verification error:", verifyError);
              navigate('/signin?error=expired_token');
              return;
            }

            console.log("Recovery token verified successfully");
            navigate('/reset-password');
            break;

          case 'signup':
          case 'magiclink':
            const { error } = await supabase.auth.getSession();
            if (error) {
              console.error("Session error:", error);
              navigate('/signin?error=auth_failed');
            } else {
              toast.success("Successfully authenticated!", successToastStyle);
              navigate('/dashboard');
            }
            break;

          default:
            console.error("Unknown auth type:", type);
            navigate('/signin?error=unknown_type');
        }
      } catch (error: any) {
        console.error("Auth redirect error:", error);
        navigate('/signin?error=unexpected');
      }
    };

    handleRedirect();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;