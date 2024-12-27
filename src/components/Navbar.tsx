import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MessageSquare, Sun, Moon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { mainMenuItems, bottomMenuItems } from "./layouts/sidebar/menu-items";
import { Logo } from "./navbar/Logo";
import { NavActions } from "./navbar/NavActions";
import { UserMenu } from "./navbar/UserMenu";
import { MobileMenuButton } from "./navbar/MobileMenuButton";
import { MobileMenuHeader } from "./navbar/MobileMenuHeader";
import { MobileMenuLanguage } from "./navbar/MobileMenuLanguage";
import { MobileMenuCurrency } from "./navbar/MobileMenuCurrency";
import { CartButton } from "./navbar/CartButton";

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

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border z-[51] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
      <div className={`w-full ${isDashboard ? 'px-4 md:px-8' : 'px-4 sm:px-6 lg:px-8'}`}>
        <div className="flex justify-between h-header">
          <div className="flex items-center gap-1">
            {isDashboard ? (
              <>
                <SidebarTrigger 
                  icon={sidebarState === 'expanded' ? PanelLeftClose : PanelLeftOpen}
                  className="hidden md:block" 
                />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="md:hidden p-0 hover:bg-transparent"
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent 
                    side="left" 
                    className="w-[300px] sm:w-[400px] z-[200] p-0 overflow-y-auto"
                  >
                    <MobileMenuHeader />
                    <div className="px-4 py-6 space-y-6">
                      {isDashboard && (
                        <>
                          <div className="space-y-1">
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
                          </div>

                          <div className="space-y-1">
                            <MobileMenuLanguage />
                            <MobileMenuCurrency />
                            <button
                              onClick={toggleDarkMode}
                              className="flex items-center gap-2 px-2 py-1.5 w-full rounded-md hover:bg-secondary"
                            >
                              {isDark ? (
                                <Moon className="h-4 w-4" />
                              ) : (
                                <Sun className="h-4 w-4" />
                              )}
                              <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                            </button>
                          </div>

                          <div className="space-y-1">
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
                          </div>
                        </>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden p-0 hover:bg-transparent"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="left" 
                  className="w-[300px] sm:w-[400px] z-[200] p-0 overflow-y-auto"
                >
                  <MobileMenuHeader />
                  <div className="px-4 py-6 space-y-6">
                    {/* Non-dashboard menu content */}
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <Logo />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9">
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Open chat</span>
            </Button>
            <CartButton />
            <NavActions 
              isDark={isDark} 
              onToggleTheme={toggleDarkMode} 
              userInitials={userInitials} 
            />
            <div className="md:hidden">
              <UserMenu userInitials={userInitials} className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;