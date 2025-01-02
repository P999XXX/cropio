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
        redirectTo: 'https://cropio.app/reset-password',
      }
    );

    if (resetError) {
      // Check if it's a rate limit error
      if (
        resetError.message?.toLowerCase().includes('rate limit') || 
        resetError.message?.toLowerCase().includes('too many requests') ||
        (resetError as any)?.body?.includes('over_email_send_rate_limit')
      ) {
        throw new Error('Too many reset attempts. Please wait a few minutes before trying again.');
      }
      throw resetError;
    }

    // If successful, show thank you dialog
    setShowForgotPassword(false);
    setShowResetThankYou(true);
    toast.success("Reset instructions sent!", successToastStyle);

  } catch (error: any) {
    console.error("Reset password error:", error);
    const errorMessage = getErrorMessage(error);
    toast.error(errorMessage, errorToastStyle);
    throw error;
  }
};