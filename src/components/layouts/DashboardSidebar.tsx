import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Award,
  Package,
  ShoppingCart,
  List,
  ArrowLeftRight,
  CreditCard,
  Settings,
  Headset,
  MoreVertical,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Team", path: "/dashboard/team" },
  { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
  { icon: Package, label: "Products", path: "/dashboard/products" },
  { icon: ShoppingCart, label: "Trading", path: "/dashboard/trading" },
  { icon: List, label: "Orders", path: "/dashboard/orders" },
  { icon: ArrowLeftRight, label: "Returns", path: "/dashboard/returns" },
  { icon: CreditCard, label: "Payments", path: "/dashboard/payments" },
];

const bottomMenuItems = [
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  { icon: Headset, label: "Support", path: "/dashboard/support" },
];

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <Sidebar 
      variant="inset" 
      collapsible="icon"
      className="absolute top-0 h-full pt-[2px] shadow-md border-r border-border bg-background z-50"
    >
      <SidebarHeader className="px-2 mb-6">
        <SidebarTrigger 
          icon={isExpanded ? MoreHorizontal : MoreVertical} 
          className="h-8 w-8 flex items-center justify-center bg-muted hover:bg-muted/80 text-muted-foreground hover:text-muted-foreground"
        />
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.label}
                    className="hover:bg-muted group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center"
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 transition-all duration-300 ease-in-out opacity-100" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto mb-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.label}
                    className="hover:bg-muted group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center"
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 transition-all duration-300 ease-in-out opacity-100" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;