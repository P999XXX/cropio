import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { UserMenu } from "./UserMenu";

interface MobileUserMenuProps {
  userInitials: string;
}

export const MobileUserMenu = ({ userInitials }: MobileUserMenuProps) => {
  const location = useLocation();
  const isSignInPage = location.pathname === '/signin';

  return (
    <div className="lg:hidden">
      {userInitials ? (
        <UserMenu 
          userInitials={userInitials} 
          className="h-8 w-8 bg-[#9b87f5] hover:opacity-90 transition-opacity border border-border text-white" 
        />
      ) : (
        <Button 
          asChild 
          variant={isSignInPage ? "outline" : "primary"} 
          size="sm" 
          className={`h-8 ${isSignInPage ? 'bg-white text-primary border-primary hover:bg-white hover:text-primary/90' : ''}`}
        >
          <Link to={isSignInPage ? "/signup" : "/signin"}>
            {isSignInPage ? "Sign Up" : "Sign In"}
          </Link>
        </Button>
      )}
    </div>
  );
};