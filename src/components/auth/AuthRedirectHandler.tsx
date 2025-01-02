import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";

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
        const error = hashParams.get('error') || searchParams.get('error');
        const errorDescription = hashParams.get('error_description') || searchParams.get('error_description');
        
        console.log("Token check:", { 
          hasAccessToken: !!accessToken, 
          hasRefreshToken: !!refreshToken, 
          type,
          error,
          errorDescription
        });

        // Handle errors first
        if (error) {
          console.error("Auth error:", error, errorDescription);
          toast.error(errorDescription || "Authentication failed", errorToastStyle);
          navigate('/signin');
          return;
        }

        // Handle recovery flow
        if (type === 'recovery') {
          console.log("Recovery flow detected");
          if (!accessToken || !refreshToken) {
            console.error("Missing tokens for recovery flow");
            toast.error("Invalid or expired reset password link. Please request a new one.", errorToastStyle);
            navigate('/signin');
            return;
          }

          try {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            
            if (sessionError) {
              console.error("Error setting recovery session:", sessionError);
              toast.error("Unable to process password reset. Please try again.", errorToastStyle);
              navigate('/signin');
              return;
            }
            
            console.log("Recovery session set successfully");
            toast.success("You can now reset your password", successToastStyle);
            navigate('/reset-password');
            return;
          } catch (error) {
            console.error("Recovery session error:", error);
            toast.error("Failed to process password reset. Please try again.", errorToastStyle);
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
            toast.error("Authentication failed. Please try again.", errorToastStyle);
            navigate('/signin');
            return;
          }

          if (session) {
            if (type === 'email_confirmation') {
              toast.success("Email confirmed successfully!", successToastStyle);
              navigate('/signin');
            } else {
              toast.success("Successfully signed in!", successToastStyle);
              navigate('/dashboard');
            }
          } else {
            if (accessToken && refreshToken) {
              try {
                const { error: setSessionError } = await supabase.auth.setSession({
                  access_token: accessToken,
                  refresh_token: refreshToken
                });
                
                if (setSessionError) {
                  console.error("Error setting session:", setSessionError);
                  toast.error("Authentication failed. Please try again.", errorToastStyle);
                  navigate('/signin');
                  return;
                }
                
                toast.success("Successfully signed in!", successToastStyle);
                navigate('/dashboard');
              } catch (error) {
                console.error("Set session error:", error);
                toast.error("Failed to authenticate. Please try again.", errorToastStyle);
                navigate('/signin');
              }
            } else {
              console.log("No tokens found - redirecting to signin");
              navigate('/signin');
            }
          }
        }
      } catch (error) {
        console.error("Auth redirect error:", error);
        toast.error("An error occurred during authentication", errorToastStyle);
        navigate('/signin');
      }
    };

    handleAuthRedirects();
  }, [navigate]);

  return null;
};

export default AuthRedirectHandler;