import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "./toast-styles";

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
    // Check if the email exists in profiles using maybeSingle() instead of single()
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", resetEmail)
      .maybeSingle();

    if (profileError) {
      console.error("Profile check error:", profileError);
      throw new Error("Unable to verify email address");
    }

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
    toast.error(error.message || "Failed to send reset instructions", errorToastStyle);
    throw error;
  }
};