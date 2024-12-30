import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ResetPasswordHeader from "@/components/auth/ResetPasswordHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

const ResetPassword = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const handlePasswordReset = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (!session) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) {
            console.error("Error setting session:", error);
            navigate('/signin');
            return;
          }
        } else {
          navigate('/signin');
          return;
        }
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name')
        .single();
      
      if (profile?.first_name) {
        setFirstName(profile.first_name);
      }
    };
    
    handlePasswordReset();
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className={`container mx-auto px-4 ${isMobile ? 'pt-12' : 'pt-20'} flex items-${isMobile ? 'start' : 'center'} justify-center min-h-[calc(100vh-64px)]`}>
          <div className={`max-w-md w-full ${isMobile ? 'mt-8' : 'my-8'}`}>
            <ResetPasswordHeader firstName={firstName} isMobile={isMobile} />

            <div className="md:block hidden">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>
                    Please enter your new password
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ResetPasswordForm isMobile={isMobile} />
                </CardContent>
              </Card>
            </div>

            <div className="md:hidden block space-y-4">
              <ResetPasswordForm isMobile={isMobile} />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;