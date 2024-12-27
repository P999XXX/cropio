import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import SidebarHeader from "./sidebar/SidebarHeader";
import MenuItem from "./sidebar/MenuItem";
import { mainMenuItems, bottomMenuItems } from "./sidebar/menu-items";

const DashboardSidebar = () => {
  return (
    <Sidebar 
      variant="inset" 
      collapsible="icon"
      className="fixed top-0 h-screen border-r border-border bg-background z-[99] overflow-hidden transition-all duration-300 ease-in-out"
    >
      <SidebarHeader />
      
      <SidebarContent className="px-2 pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="transition-all duration-300 ease-in-out">
              {mainMenuItems.map((item) => (
                <MenuItem key={item.label} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto mb-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="transition-all duration-300 ease-in-out">
              {bottomMenuItems.map((item) => (
                <MenuItem key={item.label} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;