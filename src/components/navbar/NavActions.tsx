import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher";
import { Link, useLocation } from "react-router-dom";

interface NavActionsProps {
  isDark: boolean;
  onToggleTheme: () => void;
  userInitials: string;
}

export const NavActions = ({ isDark, onToggleTheme, userInitials }: NavActionsProps) => {
  const location = useLocation();
  const isSignInPage = location.pathname === '/signin';

  return (
    <div className="hidden lg:flex items-center space-x-2">
      <LanguageSwitcher />
      <ThemeToggle isDark={isDark} onToggleTheme={onToggleTheme} />
      {userInitials ? (
        <UserMenu userInitials={userInitials} />
      ) : (
        <Button 
          asChild 
          variant={isSignInPage ? "outline" : "primary"} 
          size="sm"
          className={`text-[0.775rem] ${isSignInPage ? 'text-primary border-primary hover:text-white hover:bg-primary' : ''}`}
        >
          <Link to={isSignInPage ? "/signup" : "/signin"}>
            {isSignInPage ? "Sign Up" : "Sign In"}
          </Link>
        </Button>
      )}
    </div>
  );
};