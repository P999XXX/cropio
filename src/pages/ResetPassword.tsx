import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ResetPasswordHeader from "@/components/auth/ResetPasswordHeader";
import ResetPasswordThankYouDialog from "@/components/auth/ResetPasswordThankYouDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";

const ResetPassword = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [firstName, setFirstName] = useState("");
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
          <div className="w-full max-w-md flex flex-col items-center">
            <ResetPasswordHeader firstName={firstName} isMobile={isMobile} />

            {isMobile ? (
              <div className="w-full">
                <ResetPasswordForm isMobile={isMobile} />
              </div>
            ) : (
              <Card className="w-full">
                <CardHeader className="pb-2">
                  <CardDescription>
                    Please enter your new password
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ResetPasswordForm isMobile={isMobile} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <ResetPasswordThankYouDialog
          open={showThankYou}
          onOpenChange={setShowThankYou}
          userEmail="user@example.com" // This should ideally come from the auth state
        />
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;