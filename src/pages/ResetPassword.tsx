import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ResetPasswordHeader from "@/components/auth/ResetPasswordHeader";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const getFirstName = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
      }
    };
    
    getFirstName();
  }, []);

  return (
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
  );
};

export default ResetPassword;