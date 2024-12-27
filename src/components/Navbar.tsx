import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, PanelLeftOpen, PanelLeftClose, MessageSquare, Globe, DollarSign } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "./navbar/Logo";
import { NavActions } from "./navbar/NavActions";
import { UserMenu } from "./navbar/UserMenu";
import { mainMenuItems, bottomMenuItems } from "./layouts/sidebar/menu-items";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Products", path: "/products" },
  { name: "Functions", path: "/functions" },
  { name: "Buyers", path: "/buyers" },
  { name: "Suppliers", path: "/suppliers" },
  { name: "FAQ", path: "/faq" },
];

const additionalMenuItems = [
  { name: "Language", icon: Globe, path: "#" },
  { name: "Currency", icon: DollarSign, path: "#" },
  { name: "Messages", icon: MessageSquare, path: "#" },
];

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  let sidebarState;
  try {
    const { state } = useSidebar();
    sidebarState = state;
  } catch {
    sidebarState = null;
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDark(theme === "dark");
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single();

      if (profile) {
        const initials = `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`.toUpperCase();
        setUserInitials(initials || 'U');
      }
    }
  };

  const toggleDarkMode = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
    if (newTheme === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] z-[200] overflow-y-auto">
        <nav className="flex flex-col gap-4 min-h-0">
          <div className="h-header flex items-center">
            <span className="text-2xl font-geologica font-extrabold">
              cropio<span className="text-primary">.app</span>
            </span>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {isDashboard ? (
              <>
                {mainMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="my-4 border-t" />
                {bottomMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </>
            ) : (
              navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-2 py-1.5 rounded-md hover:bg-secondary"
                >
                  {item.name}
                </Link>
              ))
            )}
            <div className="my-4 border-t" />
            {additionalMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border z-[51] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
      <div className={`w-full ${isDashboard ? 'px-4 md:px-8' : 'px-4 sm:px-6 lg:px-8'}`}>
        <div className="flex justify-between h-header">
          <div className="flex items-center gap-2">
            {isDashboard ? (
              <>
                <SidebarTrigger 
                  icon={sidebarState === 'expanded' ? PanelLeftClose : PanelLeftOpen}
                  className="hidden md:block" 
                />
                <MobileMenu />
              </>
            ) : (
              <MobileMenu />
            )}
            <Logo />
          </div>

          <div className="flex items-center gap-4">
            <NavActions 
              isDark={isDark} 
              onToggleTheme={toggleDarkMode} 
              userInitials={userInitials} 
            />
            <div className="md:hidden">
              <UserMenu userInitials={userInitials} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;