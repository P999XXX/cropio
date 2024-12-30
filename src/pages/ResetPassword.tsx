import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ResetPasswordHeader from "@/components/auth/ResetPasswordHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const ResetPassword = () => {
  const [firstName, setFirstName] = useState<string>("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', user.id)
          .single();

        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
      }
    };

    getUser();
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex min-h-[calc(100vh-64px)]">
          <div className="flex-1 flex items-center justify-center py-8 px-4 w-full">
            <div className="w-full max-w-md">
              <ResetPasswordHeader firstName={firstName} isMobile={isMobile} />
              <ResetPasswordForm isMobile={isMobile} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;