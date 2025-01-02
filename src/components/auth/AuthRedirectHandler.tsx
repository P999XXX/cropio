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
          console.log("No hash parameters found in URL");
          navigate('/signin');
          return;
        }

        const fragment = new URLSearchParams(hash.substring(1));
        const type = fragment.get('type');
        const access_token = fragment.get('access_token');
        const refresh_token = fragment.get('refresh_token');

        console.log("Auth redirect type:", type);

        // Development mode: skip session checks and redirect to dashboard
        if (type === 'signup' || type === 'magiclink') {
          navigate('/dashboard');
          return;
        }

        // Only handle recovery flow normally
        if (type === 'recovery') {
          if (!access_token || !refresh_token) {
            console.error("Missing tokens for recovery flow");
            toast.error("Invalid password reset link. Please request a new one.", errorToastStyle);
            navigate('/signin');
            return;
          }

          const { error: setSessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (setSessionError) {
            console.error("Set session error:", setSessionError);
            toast.error("Your password reset link has expired. Please request a new one.", errorToastStyle);
            navigate('/signin');
            return;
          }

          navigate('/reset-password');
        } else {
          // For all other cases in development, redirect to dashboard
          navigate('/dashboard');
        }
      } catch (error: any) {
        console.error("Auth redirect error:", error);
        // In development mode, redirect to dashboard even on errors
        navigate('/dashboard');
      }
    };

    handleRedirect();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;