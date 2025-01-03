import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = async (event: string, session: any) => {
      if (event === "SIGNED_IN") {
        // Use a timeout to ensure the session is properly set
        setTimeout(() => {
          navigate("/dashboard");
        }, 100);
      }
    };

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

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

    // Safe postMessage handling with dynamic origin
    const sendAuthComplete = () => {
      if (!window.opener) return;

      // Get the origin from the referrer or default to current origin
      const origin = document.referrer 
        ? new URL(document.referrer).origin 
        : window.location.origin;

      try {
        window.opener.postMessage(
          { type: "AUTH_COMPLETE", success: true },
          origin
        );
        console.log("Auth complete message sent to:", origin);
      } catch (error) {
        console.error("PostMessage error:", error);
      }

      // Close the window after sending message
      setTimeout(() => {
        window.close();
      }, 1000);
    };

    sendAuthComplete();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
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