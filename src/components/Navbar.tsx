import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MessageSquare, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Logo } from "./navbar/Logo";
import { NavActions } from "./navbar/NavActions";
import { UserMenu } from "./navbar/UserMenu";
import { MobileMenuHeader } from "./navbar/MobileMenuHeader";
import { CartButton } from "./navbar/CartButton";
import { DashboardSidebarTrigger } from "./navbar/DashboardSidebarTrigger";
import { MobileMenuContent } from "./navbar/MobileMenuContent";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const { state } = useSidebar();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDark(theme === "dark");
    fetchUserProfile();

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleMediaQueryChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setIsOpen(false);
      }
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  const fetchUserProfile = async () => {
    try {
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
      } else {
        setUserInitials("");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserInitials("");
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

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border z-[49] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)]">
      <div className={`w-full ${isDashboard ? 'px-4 md:px-8' : 'px-4 sm:px-6 lg:px-8'}`}>
        <div className="flex justify-between h-header">
          <div className="flex items-center gap-3">
            {isDashboard && (
              <>
                <DashboardSidebarTrigger isExpanded={state === 'expanded'} />
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="h-8 w-8 md:h-9 md:w-9 lg:hidden text-foreground hover:text-foreground"
                    >
                      <Menu className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent 
                    side="left" 
                    className="w-[300px] sm:w-[400px] z-[200] p-0 overflow-y-auto custom-scrollbar fixed"
                  >
                    <MobileMenuHeader />
                    <MobileMenuContent 
                      isDashboard={isDashboard}
                      isDark={isDark}
                      onToggleTheme={toggleDarkMode}
                      onClose={handleClose}
                    />
                  </SheetContent>
                </Sheet>
              </>
            )}
            <Logo />
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-8 w-8 md:h-9 md:w-9 text-foreground hover:text-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Open chat</span>
            </Button>
            <CartButton />
            <NavActions 
              isDark={isDark} 
              onToggleTheme={toggleDarkMode} 
              userInitials={userInitials} 
            />
            <div className="lg:hidden">
              {userInitials ? (
                <UserMenu 
                  userInitials={userInitials} 
                  className="h-8 w-8 bg-[#9b87f5] hover:opacity-90 transition-opacity border border-border text-white" 
                />
              ) : (
                <Button asChild variant="default" size="sm" className="h-8">
                  <Link to="/signin">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;