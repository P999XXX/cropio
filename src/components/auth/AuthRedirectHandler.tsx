import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirects = async () => {
      console.log("=== Starting auth redirect handling ===");
      
      try {
        // Get current URL parameters
        const currentUrl = new URL(window.location.href);
        console.log("Current URL:", currentUrl.toString());
        
        // Handle hash params
        const hashParams = new URLSearchParams(currentUrl.hash.replace('#', ''));
        console.log("Hash params:", Object.fromEntries(hashParams.entries()));
        
        // Handle search params
        const searchParams = new URLSearchParams(currentUrl.search);
        console.log("Search params:", Object.fromEntries(searchParams.entries()));
        
        // Check for recovery token in both hash and search params
        const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
        const type = hashParams.get('type') || searchParams.get('type');
        const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');
        
        console.log("Token check:", { accessToken: !!accessToken, type });
        
        if (type === 'recovery' && accessToken) {
          console.log("Valid recovery token detected - redirecting to reset-password");
          if (refreshToken) {
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
          }
          navigate('/reset-password');
          return;
        }
        
        // Handle email confirmation
        if (currentUrl.pathname.includes('/auth/callback')) {
          console.log("Auth callback detected");
          if (type === 'email_confirmation') {
            const { data: { session }, error } = await supabase.auth.getSession();
            console.log("Email confirmation - Session check:", { session: !!session, error });
            
            if (!error && session) {
              navigate('/signin');
            }
          }
        }
      } catch (error) {
        console.error("Auth redirect error:", error);
        navigate('/signin');
      }
      
      console.log("=== Auth redirect handling complete ===");
    };

    handleAuthRedirects();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;