import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the auth callback
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        // Use a timeout to ensure the session is properly set
        setTimeout(() => {
          navigate("/dashboard");
        }, 100);
      }
    });

    // Parse the hash if present
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    if (accessToken && refreshToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }

    // Safe postMessage handling
    const sendAuthComplete = () => {
      // Only send to allowed origins
      const allowedOrigins = [window.location.origin];
      const targetOrigin = allowedOrigins.includes(window.opener?.origin) 
        ? window.opener.origin 
        : window.location.origin;

      if (window.opener) {
        try {
          window.opener.postMessage(
            { type: "AUTH_COMPLETE", success: true },
            targetOrigin
          );
        } catch (error) {
          console.error("Failed to send auth completion message:", error);
        }
      }
    };

    sendAuthComplete();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-muted-foreground">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
};

export default AuthRedirectHandler;