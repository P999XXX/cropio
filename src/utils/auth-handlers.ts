import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { errorToastStyle, successToastStyle } from "./toast-styles";

export const handleGoogleSignIn = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  } catch (error: any) {
    console.error("Google sign in error:", error);
    toast.error(error.message || "Failed to sign in with Google", errorToastStyle);
  }
};

export const handleLinkedInSignIn = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "linkedin",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  } catch (error: any) {
    console.error("LinkedIn sign in error:", error);
    toast.error(error.message || "Failed to sign in with LinkedIn", errorToastStyle);
  }
};

export const handlePasswordReset = async (
  resetEmail: string,
  setIsResetting: (value: boolean) => void,
  setShowForgotPassword: (value: boolean) => void,
  setShowResetThankYou: (value: boolean) => void
) => {
  setIsResetting(true);
  try {
    // Check if the email exists in the profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', resetEmail)
      .maybeSingle();

    if (profileError) throw profileError;

    if (!profile) {
      throw new Error("No account found with this email address");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
    
    setShowForgotPassword(false);
    setShowResetThankYou(true);
    toast.success("Reset instructions sent!", successToastStyle);
  } catch (error: any) {
    console.error("Reset password error:", error);
    throw error;
  } finally {
    setIsResetting(false);
  }
};
