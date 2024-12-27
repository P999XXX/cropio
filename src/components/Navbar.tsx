import { Link, useLocation } from "react-router-dom";
import { MessageSquare, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import { ThemeToggle } from "./navbar/ThemeToggle";
import { UserMenu } from "./navbar/UserMenu";
import { MobileMenu } from "./navbar/MobileMenu";

const navItems = [
  { name: "Products", path: "/products" },
  { name: "Functions", path: "/functions" },
  { name: "Buyers", path: "/buyers" },
  { name: "Suppliers", path: "/suppliers" },
  { name: "FAQ", path: "/faq" },
];

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  let sidebarState;
  try {
    const { state } = useSidebar();
    sidebarState = state;
  } catch {
    sidebarState = null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border z-[51] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
      <div className={`w-full ${isDashboard ? 'px-4 md:px-8' : 'px-4 sm:px-6 lg:px-8'}`}>
        <div className="flex justify-between h-header">
          <div className="flex items-center gap-4">
            {isDashboard && (
              <SidebarTrigger 
                icon={sidebarState === 'expanded' ? PanelLeftClose : PanelLeftOpen}
                className="block md:hidden" 
              />
            )}
            <Link 
              to="/" 
              className={`flex-shrink-0 ${isDashboard && sidebarState === 'collapsed' ? 'md:pl-16' : ''} ${isDashboard && sidebarState === 'expanded' ? 'md:hidden' : ''}`}
            >
              <span className="text-2xl font-geologica font-extrabold">
                cropio<span className="text-primary">.app</span>
              </span>
            </Link>
            {!isDashboard && (
              <div className="hidden md:flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <CurrencySwitcher />
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Open chat</span>
            </Button>
            <ThemeToggle />
            <UserMenu />
            {!isDashboard && (
              <Link
                to="/signin"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <CurrencySwitcher />
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <UserMenu />
            {!isDashboard && (
              <MobileMenu 
                isOpen={false}
                setIsOpen={() => {}}
                navItems={navItems}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;