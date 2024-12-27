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
  Nut,
  ChartCandlestick,
  ArrowLeftRight,
  List,
  RefreshCw,
  CreditCard,
  Star,
  Settings,
  HelpCircle,
  Headset,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { Link } from "react-router-dom";

const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Team", path: "/dashboard/team" },
  { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
  { icon: Nut, label: "Products", path: "/dashboard/products" },
  { icon: ChartCandlestick, label: "Market", path: "/dashboard/market" },
  { icon: ArrowLeftRight, label: "Trading", path: "/dashboard/trading" },
  { icon: List, label: "Orders", path: "/dashboard/orders" },
  { icon: RefreshCw, label: "Returns", path: "/dashboard/returns" },
  { icon: CreditCard, label: "Payments", path: "/dashboard/payments" },
  { icon: Star, label: "Reviews", path: "/dashboard/reviews" },
];

const bottomMenuItems = [
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  { icon: HelpCircle, label: "FAQ", path: "/dashboard/faq" },
  { icon: Headset, label: "Support", path: "/dashboard/support" },
];

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <Sidebar 
      variant="inset" 
      collapsible="icon"
      className="fixed top-0 h-screen border-r border-border bg-background z-[99] overflow-hidden transition-all duration-300 ease-in-out"
    >
      <SidebarHeader className="h-header px-4 flex items-center">
        <div className="flex justify-between items-center w-full">
          <SidebarTrigger 
            icon={!isExpanded ? PanelLeftOpen : undefined}
            className={`flex items-center justify-center text-foreground transition-opacity duration-300 ${isExpanded ? 'opacity-0 hidden' : 'opacity-100'}`}
          />
          {isExpanded && (
            <div className="flex items-center justify-between w-full transition-opacity duration-300">
              <span className="text-2xl font-geologica font-extrabold">
                cropio<span className="text-primary">.app</span>
              </span>
              <SidebarTrigger 
                icon={PanelLeftClose}
                className="flex items-center justify-center text-foreground"
              />
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.label}
                    className="group-data-[collapsible=icon]:justify-center p-0 transition-all duration-300"
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 transition-all duration-300 ease-in-out text-foreground" />
                      <span className="font-medium transition-all duration-300">{item.label}</span>
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
                    className="group-data-[collapsible=icon]:justify-center p-0 transition-all duration-300"
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 transition-all duration-300 ease-in-out text-foreground" />
                      <span className="font-medium transition-all duration-300">{item.label}</span>
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