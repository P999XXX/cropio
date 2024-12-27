import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "@/components/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <Navbar />
          <SidebarInset className="px-4 md:px-8 py-6 mt-[3.8rem]">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;