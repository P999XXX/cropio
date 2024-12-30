import { useEffect, useState } from "react";
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
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchUserProfile = async () => {
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

    fetchUserProfile();
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

        <ResetPasswordThankYouDialog
          open={isThankYouOpen}
          onOpenChange={setIsThankYouOpen}
        />
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;