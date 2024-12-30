import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ResetPasswordHeader from "@/components/auth/ResetPasswordHeader";
import ResetPasswordThankYouDialog from "@/components/auth/ResetPasswordThankYouDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";

const ResetPassword = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleResetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) throw error;

      setUserEmail(email);
      setShowThankYou(true);
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to send reset password email");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <ResetPasswordHeader isMobile={isMobile} />
            <ResetPasswordForm isMobile={isMobile} onSubmit={handleResetPassword} />
          </div>
        </main>
        <ResetPasswordThankYouDialog
          open={showThankYou}
          onOpenChange={setShowThankYou}
          userEmail={userEmail}
        />
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;