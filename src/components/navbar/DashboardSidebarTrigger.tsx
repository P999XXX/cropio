import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardSidebarTriggerProps {
  isExpanded: boolean;
}

export const DashboardSidebarTrigger = ({ isExpanded }: DashboardSidebarTriggerProps) => {
  return (
    <SidebarTrigger 
      icon={isExpanded ? PanelLeftClose : PanelLeftOpen}
      className="hidden md:block" 
    />
  );
};