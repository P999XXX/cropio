import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = async (event: string, session: any) => {
      console.log("Auth event received:", event);
      if (event === "SIGNED_IN") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 100);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    if (accessToken && refreshToken) {
      console.log("Setting session with tokens");
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }

    const sendAuthComplete = () => {
      if (!window.opener) {
        console.log("No opener window found");
        return;
      }

      const origin = document.referrer 
        ? new URL(document.referrer).origin 
        : window.location.origin;

      console.log("Sending auth complete message to origin:", origin);
      
      try {
        window.opener.postMessage(
          { type: "AUTH_COMPLETE", success: true },
          origin
        );
        console.log("Auth complete message sent successfully");
      } catch (error) {
        console.error("PostMessage error:", error);
      }

      setTimeout(() => {
        window.close();
      }, 1000);
    };

    sendAuthComplete();

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