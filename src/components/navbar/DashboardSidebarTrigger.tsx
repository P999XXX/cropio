import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarTriggerProps {
  isExpanded?: boolean;
}

export const DashboardSidebarTrigger = ({ isExpanded = false }: DashboardSidebarTriggerProps) => {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      className="h-8 w-8 md:h-9 md:w-9 hidden lg:flex hover:bg-secondary/80"
      onClick={() => {
        const event = new CustomEvent('toggle-sidebar', {
          detail: { isExpanded }
        });
        window.dispatchEvent(event);
      }}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
};