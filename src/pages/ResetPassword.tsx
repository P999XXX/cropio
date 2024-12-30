import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSubmit = async (values: { password: string }) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) throw error;

      setShowThankYou(true);
      toast.success("Password reset successfully!");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
          <div className="w-full max-w-md flex flex-col items-center">
            <ResetPasswordHeader firstName={firstName} isMobile={isMobile} />

            {isMobile ? (
              <div className="w-full">
                <ResetPasswordForm
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            ) : (
              <Card className="w-full">
                <CardHeader className="pb-2">
                  <CardDescription>
                    Please enter your new password
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ResetPasswordForm
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <ResetPasswordThankYouDialog
          open={showThankYou}
          onOpenChange={setShowThankYou}
        />
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;
