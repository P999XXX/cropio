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
            hover:bg-secondary hover:text-secondary-foreground
            group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:mx-2
            ${isActive ? 'bg-secondary text-secondary-foreground' : 'text-foreground'}
          `}
        >
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
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