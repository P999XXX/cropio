import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "@/components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>
        <div className="flex-1 transition-all duration-300 ease-in-out">
          <Navbar />
          <SidebarInset className="px-1 lg:px-8 py-6 pt-20">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;