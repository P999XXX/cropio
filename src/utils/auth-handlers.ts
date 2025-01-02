import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "./toast-styles";
import { getErrorMessage } from "./auth-error-handler";

export const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
};

export const handleLinkedInSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "linkedin",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
};

export const handlePasswordReset = async (
  resetEmail: string,
  setIsResetting: (value: boolean) => void,
  setShowForgotPassword: (value: boolean) => void,
  setShowResetThankYou: (value: boolean) => void
) => {
  try {
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      resetEmail,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );

    if (resetError) {
      console.error("Reset password error:", resetError);
      const errorMessage = getErrorMessage(resetError);
      toast.error(errorMessage, errorToastStyle);
      
      // Don't close the dialog if it's a rate limit error
      if (!errorMessage.includes('Too many reset attempts')) {
        setShowForgotPassword(false);
      }
      throw resetError;
    }

    // If password reset was successful
    setShowForgotPassword(false);
    setShowResetThankYou(true);
    toast.success("Reset instructions sent!", successToastStyle);

  } catch (error: any) {
    console.error("Reset password error:", error);
    const errorMessage = getErrorMessage(error);
    toast.error(errorMessage, errorToastStyle);
    
    // Re-throw the error to be handled by the component
    throw error;
  }
};