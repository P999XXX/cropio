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
          className={`flex items-center justify-center text-foreground opacity-75 hover:opacity-100 hover:text-black active:text-black hover:bg-transparent active:bg-transparent hover:shadow-none transition-all duration-500 pl-[3px] ${isExpanded ? 'opacity-0 hidden' : ''}`}
        />
        <div className={`flex items-center justify-between w-full transition-all duration-500 ${!isExpanded ? 'opacity-0 hidden' : 'opacity-100'}`}>
          <span className="text-2xl font-geologica font-extrabold animate-[fade-in_0.5s_ease-in-out]">
            cropio<span className="text-primary">.app</span>
          </span>
          <SidebarTrigger 
            icon={PanelLeftClose}
            className="flex items-center justify-center text-foreground opacity-75 hover:opacity-100 hover:text-black active:text-black hover:bg-transparent active:bg-transparent hover:shadow-none transition-all duration-500 pl-[3px]"
          />
        </div>
      </div>
    </Header>
  );
};

export default SidebarHeader;