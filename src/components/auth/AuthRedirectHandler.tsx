import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirects = async () => {
      console.log("=== Starting auth redirect handling ===");
      
      try {
        const currentUrl = new URL(window.location.href);
        console.log("Current URL:", currentUrl.toString());
        
        // Handle hash params
        const hashParams = new URLSearchParams(currentUrl.hash.replace('#', ''));
        console.log("Hash params:", Object.fromEntries(hashParams.entries()));
        
        // Handle search params
        const searchParams = new URLSearchParams(currentUrl.search);
        console.log("Search params:", Object.fromEntries(searchParams.entries()));
        
        const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');
        const type = hashParams.get('type') || searchParams.get('type');
        
        console.log("Token check:", { 
          hasAccessToken: !!accessToken, 
          hasRefreshToken: !!refreshToken, 
          type 
        });

        // Handle recovery flow
        if (type === 'recovery') {
          console.log("Recovery flow detected");
          if (accessToken && refreshToken) {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            
            if (error) {
              console.error("Error setting recovery session:", error);
              toast.error("Unable to process password reset. Please try again.");
              navigate('/signin');
              return;
            }
            
            console.log("Recovery session set successfully");
            navigate('/reset-password');
            return;
          } else {
            console.error("Missing tokens for recovery flow");
            toast.error("Invalid reset password link. Please request a new one.");
            navigate('/signin');
            return;
          }
        }
        
        // Handle email confirmation and other auth flows
        if (currentUrl.pathname.includes('/auth/callback')) {
          console.log("Auth callback detected");
          
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          console.log("Session check:", { hasSession: !!session, error: sessionError });
          
          if (sessionError) {
            console.error("Session error:", sessionError);
            toast.error("Authentication failed. Please try again.");
            navigate('/signin');
            return;
          }

          if (session) {
            if (type === 'email_confirmation') {
              toast.success("Email confirmed successfully!");
              navigate('/signin');
            } else {
              navigate('/dashboard');
            }
          } else {
            if (accessToken && refreshToken) {
              const { error: setSessionError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
              });
              
              if (setSessionError) {
                console.error("Error setting session:", setSessionError);
                toast.error("Authentication failed. Please try again.");
                navigate('/signin');
                return;
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
        toast.error("An error occurred during authentication");
        navigate('/signin');
      }
    };

    handleAuthRedirects();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;