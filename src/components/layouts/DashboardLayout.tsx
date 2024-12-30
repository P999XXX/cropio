import { ReactNode } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "@/components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      <div className="flex-1 transition-all duration-300 ease-in-out">
        <Navbar />
        <SidebarInset className="px-1 lg:px-8 py-6 pt-20">
          {children}
        </SidebarInset>
      </div>
    </div>
  );
};

export default DashboardLayout;