import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardContent = ({ children }: DashboardLayoutProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex-1">
      <Navbar />
      <SidebarInset className={cn(
        "px-4 md:px-8 py-6",
        isCollapsed && "md:pl-20" // Add 5rem padding when sidebar is collapsed on desktop
      )}>
        {children}
      </SidebarInset>
    </div>
  );
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;