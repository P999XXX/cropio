import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { errorToastStyle } from "@/utils/toast-styles";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        const hash = window.location.hash;
        if (!hash) {
          console.log("No hash parameters found in URL");
          return;
        }

        const hashParams = new URLSearchParams(hash.substring(1));
        const type = hashParams.get('type');
        const access_token = hashParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token');
        
        console.log("Auth redirect type:", type);

        // Only handle recovery flow
        if (type === 'recovery') {
          if (!access_token || !refresh_token) {
            console.error("Missing tokens for recovery flow");
            toast.error("Invalid password reset link. Please request a new one.", errorToastStyle);
            return;
          }

          const { error: setSessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (setSessionError) {
            console.error("Set session error:", setSessionError);
            toast.error("Your password reset link has expired. Please request a new one.", errorToastStyle);
            return;
          }

          navigate('/reset-password');
        }
        // All other auth types are ignored in development mode
      } catch (error: any) {
        console.error("Auth redirect error:", error);
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;