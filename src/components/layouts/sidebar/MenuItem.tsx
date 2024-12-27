import { Link } from "react-router-dom";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
}

const MenuItem = ({ icon: Icon, label, path }: MenuItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        asChild 
        tooltip={label}
        className="group-data-[collapsible=icon]:justify-center p-0 transition-all duration-300"
      >
        <Link to={path} className="flex items-center gap-3">
          <Icon className="h-4 w-4 transition-all duration-300 ease-in-out text-foreground" />
          <span className="font-medium transition-all duration-300">{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default MenuItem;