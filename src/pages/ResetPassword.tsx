import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import ResetPasswordHeader from "@/components/auth/ResetPasswordHeader";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { SidebarProvider } from "@/components/ui/sidebar";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleResetPassword = async (values: { password: string; confirmPassword: string }) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) throw error;

      toast.success("Password reset successfully!");
      navigate("/signin");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Navbar />
        <main className="w-full container flex min-h-[calc(100vh-64px)] items-start justify-center px-4 md:px-0 mt-[57px]">
          <div className="w-full max-w-md py-8">
            <ResetPasswordHeader firstName={firstName} isMobile={isMobile} />

            <div className="md:block hidden">
              <Card>
                <CardContent className="pt-6">
                  <ResetPasswordForm
                    onSubmit={handleResetPassword}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="md:hidden block">
              <ResetPasswordForm
                onSubmit={handleResetPassword}
                isLoading={isLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;
