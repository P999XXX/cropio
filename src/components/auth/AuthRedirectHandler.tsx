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
        
        // Check for tokens in both hash and search params
        const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');
        const type = hashParams.get('type') || searchParams.get('type');
        
        console.log("Token check:", { 
          hasAccessToken: !!accessToken, 
          hasRefreshToken: !!refreshToken, 
          type 
        });

        // Handle recovery flow
        if (type === 'recovery' && accessToken) {
          console.log("Valid recovery token detected - redirecting to reset-password");
          if (accessToken && refreshToken) {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            
            if (error) {
              console.error("Error setting session:", error);
              throw error;
            }
          }
          navigate('/reset-password');
          return;
        }
        
        // Handle email confirmation
        if (currentUrl.pathname.includes('/auth/callback')) {
          console.log("Auth callback detected");
          
          // Get the current session
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          console.log("Session check:", { hasSession: !!session, error: sessionError });
          
          if (sessionError) {
            console.error("Session error:", sessionError);
            throw sessionError;
          }

          if (session) {
            if (type === 'email_confirmation') {
              navigate('/signin');
            } else {
              navigate('/dashboard');
            }
          } else {
            // If no session, try to exchange the tokens
            if (accessToken && refreshToken) {
              const { error: setSessionError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
              });
              
              if (setSessionError) {
                console.error("Error setting session:", setSessionError);
                throw setSessionError;
              }
              
              navigate('/dashboard');
            } else {
              console.log("No tokens found - redirecting to signin");
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