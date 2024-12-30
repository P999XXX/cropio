import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/Navbar";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ResetPasswordHeader from "@/components/auth/ResetPasswordHeader";
import ResetPasswordThankYouDialog from "@/components/auth/ResetPasswordThankYouDialog";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

const ResetPassword = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const isMobile = useIsMobile();
  const firstName = "John"; // This should come from your auth state

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
          <div className="w-full min-w-[500px] max-w-[800px] flex flex-col items-center px-4">
            <ResetPasswordHeader firstName={firstName} isMobile={isMobile} />

            {isMobile ? (
              <div className="w-full">
                <ResetPasswordForm />
              </div>
            ) : (
              <Card className="w-full">
                <CardHeader className="pb-2">
                  <CardDescription>
                    Enter your new password below
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ResetPasswordForm />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <ResetPasswordThankYouDialog
          open={showThankYou}
          onOpenChange={setShowThankYou}
          userEmail="user@example.com"
        />
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;