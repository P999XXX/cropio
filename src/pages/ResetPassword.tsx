import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ResetPasswordHeader from "@/components/auth/ResetPasswordHeader";
import ResetPasswordThankYouDialog from "@/components/auth/ResetPasswordThankYouDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const ResetPassword = () => {
  const [firstName, setFirstName] = useState("");
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const isMobile = useIsMobile();

  const handleResetPassword = async (email: string) => {
    setUserEmail(email);
    setIsThankYouOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex min-h-[calc(100vh-64px)]">
          <div className="flex-1 flex items-center justify-center py-8 px-4 w-full">
            <div className="w-full max-w-md">
              <ResetPasswordHeader firstName={firstName} isMobile={isMobile} />
              <ResetPasswordForm 
                isMobile={isMobile} 
                onSubmit={handleResetPassword}
              />
            </div>
          </div>
        </main>

        <ResetPasswordThankYouDialog
          open={isThankYouOpen}
          onOpenChange={setIsThankYouOpen}
          userEmail={userEmail}
        />
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;