import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import ResetPasswordHeader from "@/components/auth/ResetPasswordHeader";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { SidebarProvider } from "@/components/ui/sidebar";

const ResetPassword = () => {
  const [firstName, setFirstName] = useState("");
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Navbar />
        <main className="w-full container flex min-h-[calc(100vh-64px)] items-start justify-center px-4 md:px-0 mt-[57px]">
          <div className="w-full max-w-md py-8">
            <ResetPasswordHeader firstName={firstName} isMobile={isMobile} />
            <ResetPasswordForm isMobile={isMobile} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;