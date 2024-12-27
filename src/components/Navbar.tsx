import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, MessageSquare, PanelLeftOpen, PanelLeftClose, User } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const updateThemeColors = (isDark: boolean) => {
    const color = isDark ? '#1A1F2C' : '#FFFFFF';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
    document.querySelector('meta[name="msapplication-navbutton-color"]')?.setAttribute('content', color);
    document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')?.setAttribute('content', color);
  };

  const toggleDarkMode = () => {
    const newTheme = isDark ? "light" : "dark";
    if (newTheme === "dark") {
      document.documentElement.classList.add('dark');
      updateThemeColors(true);
    } else {
      document.documentElement.classList.remove('dark');
      updateThemeColors(false);
    }
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  const navItems = [
    { name: "Products", path: "/products" },
    { name: "Functions", path: "/functions" },
    { name: "Buyers", path: "/buyers" },
    { name: "Suppliers", path: "/suppliers" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-background border-b border-border z-[51] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]`}>
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
            <Toggle
              variant="outline"
              size="sm"
              pressed={isDark}
              onPressedChange={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Toggle>
            {userInitials && (
              <Link to="/dashboard/settings">
                <Avatar className="h-9 w-9 bg-primary hover:bg-primary/90 transition-colors">
                  <AvatarFallback className="text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
            {!isDashboard && !userInitials && (
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
            <Toggle
              variant="outline"
              size="sm"
              pressed={isDark}
              onPressedChange={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Toggle>
            {userInitials && (
              <Link to="/dashboard/settings">
                <Avatar className="h-9 w-9 bg-primary hover:bg-primary/90 transition-colors">
                  <AvatarFallback className="text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
            {!isDashboard && !userInitials && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {!isDashboard && isOpen && (
        <div className="md:hidden animate-slide-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/signin"
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;