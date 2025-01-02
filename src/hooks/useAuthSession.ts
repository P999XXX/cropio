import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";

// Timeout duration for operations (15 seconds)
const OPERATION_TIMEOUT = 15000;

export const useAuthSession = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN') {
        toast.success("Successfully signed in!", successToastStyle);
        navigate("/dashboard");
      } else if (event === 'SIGNED_OUT') {
        toast.error("Your session has ended. Please sign in again.", errorToastStyle);
      } else if (event === 'TOKEN_REFRESHED') {
        console.log("Session token refreshed");
      } else if (event === 'USER_UPDATED') {
        console.log("User data updated");
      }
    });

    // Initial session check
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
      if (error) {
        console.error("Session check error:", error);
        toast.error("Unable to verify your session", errorToastStyle);
      }
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
};

// Utility function to handle operation timeouts
export const withTimeout = async (operation: Promise<any>, timeoutDuration: number = OPERATION_TIMEOUT) => {
  return Promise.race([
    operation,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), timeoutDuration)
    )
  ]);
};