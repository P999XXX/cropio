import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageSquare, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import { ThemeToggle } from "./navbar/ThemeToggle";
import { UserMenu } from "./navbar/UserMenu";
import { mainMenuItems, bottomMenuItems } from "./layouts/sidebar/menu-items";

const navItems = [
  { name: "Products", path: "/products" },
  { name: "Functions", path: "/functions" },
  { name: "Buyers", path: "/buyers" },
  { name: "Suppliers", path: "/suppliers" },
  { name: "FAQ", path: "/faq" },
];

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 pt-4">
            {isDashboard ? (
              <>
                {mainMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary"
                    onClick={() => setIsMobileMenuOpen(false)}
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
                    onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))
            )}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between px-2">
              <span>Theme</span>
              <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
            </div>
            <div className="flex items-center justify-between px-2">
              <span>Language</span>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-between px-2">
              <span>Currency</span>
              <CurrencySwitcher />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border z-[51] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
      <div className={`w-full ${isDashboard ? 'px-4 md:px-8' : 'px-4 sm:px-6 lg:px-8'}`}>
        <div className="flex justify-between h-header">
          <div className="flex items-center gap-4">
            {isDashboard && (
              <SidebarTrigger 
                icon={sidebarState === 'expanded' ? PanelLeftClose : PanelLeftOpen}
                className="hidden md:block" 
              />
            )}
            <Link 
              to="/" 
              className="text-left"
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
            <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
            <UserMenu userInitials={userInitials} />
            {!isDashboard && !userInitials && (
              <Link
                to="/signin"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <UserMenu userInitials={userInitials} />
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;