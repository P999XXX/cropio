import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

interface DashboardSidebarTriggerProps {
  isExpanded: boolean;
}

export const DashboardSidebarTrigger = ({ isExpanded }: DashboardSidebarTriggerProps) => {
  const { toggle } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="hidden lg:flex h-8 w-8 md:h-9 md:w-9"
    >
      <Menu className="h-4 w-4 text-muted-foreground" />
      <span className="sr-only">
        {isExpanded ? "Close sidebar" : "Open sidebar"}
      </span>
    </Button>
  );
};