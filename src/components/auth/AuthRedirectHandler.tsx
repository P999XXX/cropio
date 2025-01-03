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

    // Safe postMessage handling with multiple allowed origins
    const sendAuthComplete = () => {
      if (!window.opener) return;

      // List of allowed origins
      const allowedOrigins = [
        window.location.origin,
        'https://cropio.app',
        'https://gptengineer.app',
        'https://lovable.dev',
        'http://localhost:3000'
      ];

      // Try to send message to each allowed origin
      allowedOrigins.forEach(origin => {
        try {
          window.opener.postMessage(
            { type: "AUTH_COMPLETE", success: true },
            origin
          );
        } catch (error) {
          console.debug(`PostMessage to ${origin} failed:`, error);
        }
      });

      // Close the window after sending messages
      setTimeout(() => {
        window.close();
      }, 1000);
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