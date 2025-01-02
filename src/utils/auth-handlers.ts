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
    // First, generate the reset password link using Supabase
    const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(
      resetEmail,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );

    if (resetError) throw resetError;

    // Now send the custom email using our edge function
    const { error: emailError } = await supabase.functions.invoke('send-reset-password', {
      body: {
        email: resetEmail,
        resetLink: data?.user?.confirmation_token 
          ? `${window.location.origin}/reset-password?token=${data.user.confirmation_token}`
          : `${window.location.origin}/reset-password`,
      },
    });

    if (emailError) throw emailError;

    // If everything was successful
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