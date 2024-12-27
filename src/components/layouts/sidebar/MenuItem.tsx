import { Link } from "react-router-dom";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
}

const MenuItem = ({ icon: Icon, label, path }: MenuItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        asChild 
        tooltip={label}
        className="group-data-[collapsible=icon]:justify-center p-0 transition-all duration-300"
      >
        <Link 
          to={path} 
          className={`flex items-center gap-3 relative w-full rounded-md px-2 py-1.5 transition-colors
            group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:p-0
            group-data-[collapsible=icon]:ml-[-5px]
            group-data-[collapsible=icon]:inline-flex
            group-data-[collapsible=icon]:flex-nowrap
            group-data-[collapsible=icon]:flex-col
            group-data-[collapsible=icon]:justify-center
          `}
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-md transition-colors
            group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:h-full group-data-[collapsible=icon]:pt-[11px]
          `}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="font-medium transition-all duration-300 opacity-100 group-data-[collapsible=icon]:opacity-0 truncate">
            {label}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default MenuItem;