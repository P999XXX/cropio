import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { SidebarHeader as Header, SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

const SidebarHeader = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <Header className="h-header px-4 flex items-center">
      <div className="flex justify-between items-center w-full">
        <SidebarTrigger 
          icon={!isExpanded ? PanelLeftOpen : undefined}
          className={`flex items-center justify-center text-foreground transition-all duration-300 ${isExpanded ? 'opacity-0 hidden' : 'opacity-100'}`}
        />
        {isExpanded && (
          <div className="flex items-center justify-between w-full transition-all duration-300">
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
    </Header>
  );
};

export default SidebarHeader;