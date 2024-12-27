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
        className="group-data-[collapsible=icon]:justify-center p-0 transition-all duration-300 relative"
      >
        <Link to={path} className="flex items-center gap-3 w-full min-h-[40px] relative px-2">
          <div className="absolute left-2 w-8 h-8 flex items-center justify-center">
            <Icon className="h-4 w-4" />
          </div>
          <span className="pl-10 font-medium transition-opacity duration-300 opacity-100 group-data-[collapsible=icon]:opacity-0 truncate">
            {label}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default MenuItem;