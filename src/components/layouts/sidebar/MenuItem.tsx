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
            group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0
            ${!isActive && 'hover:bg-secondary hover:text-primary group-data-[collapsible=icon]:hover:bg-transparent'}
            ${isActive ? 'bg-secondary text-primary group-data-[collapsible=icon]:bg-transparent' : 'text-foreground'}
          `}
        >
          <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md transition-colors
            group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:h-full
            ${isActive ? 'group-data-[collapsible=icon]:bg-secondary group-data-[collapsible=icon]:text-primary' : 'group-data-[collapsible=icon]:hover:bg-secondary group-data-[collapsible=icon]:hover:text-primary'}
            ${!isActive && 'group-data-[collapsible=icon]:bg-secondary'}
          `}>
            <Icon className="h-4 w-4 flex-shrink-0" />
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