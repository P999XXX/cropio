import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Logo } from "./navbar/Logo";
import { NavActions } from "./navbar/NavActions";
import { MobileMenuHeader } from "./navbar/MobileMenuHeader";
import { CartButton } from "./navbar/CartButton";
import { DashboardSidebarTrigger } from "./navbar/DashboardSidebarTrigger";
import { MobileMenuContent } from "./navbar/MobileMenuContent";
import { ChatButton } from "./navbar/ChatButton";
import { MobileNavButton } from "./navbar/MobileNavButton";
import { MobileUserMenu } from "./navbar/MobileUserMenu";
import { useUserProfile } from "./navbar/hooks/useUserProfile";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const { userInitials } = useUserProfile();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDark(theme === "dark");

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
                <DashboardSidebarTrigger />
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <MobileNavButton />
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
            <ChatButton />
            <CartButton />
            <NavActions 
              isDark={isDark} 
              onToggleTheme={toggleDarkMode} 
              userInitials={userInitials} 
            />
            <MobileUserMenu userInitials={userInitials} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;