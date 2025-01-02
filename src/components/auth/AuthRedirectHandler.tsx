import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Check if we have a hash in the URL
        if (!window.location.hash) {
          console.error("No hash parameters found in URL");
          navigate('/signin');
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
              toast.error("Invalid password reset link. Please request a new one.");
              navigate('/signin');
              return;
            }

            // For recovery flow, just verify the tokens are valid without setting a session
            const { error: verifyError } = await supabase.auth.verifyOtp({
              token_hash: access_token,
              type: 'recovery',
            });

            if (verifyError) {
              console.error("Token verification error:", verifyError);
              toast.error("Your password reset link has expired. Please request a new one.");
              navigate('/signin');
              return;
            }

            // Redirect to reset password page with the hash intact
            console.log("Redirecting to reset password page");
            window.location.href = `/reset-password${window.location.hash}`;
            break;

          case 'signup':
          case 'magiclink':
            // Handle signup and magic link confirmations
            const { error } = await supabase.auth.getSession();
            if (error) {
              console.error("Session error:", error);
              toast.error("Authentication failed. Please try again.");
              navigate('/signin');
            } else {
              toast.success("Successfully authenticated!");
              navigate('/dashboard');
            }
            break;

          default:
            console.error("Unknown auth type:", type);
            toast.error("Invalid authentication link.");
            navigate('/signin');
        }
      } catch (error) {
        console.error("Auth redirect error:", error);
        toast.error("An error occurred during authentication.");
        navigate('/signin');
      }
    };

    handleRedirect();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;