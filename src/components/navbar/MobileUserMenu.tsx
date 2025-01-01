import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";

interface MobileUserMenuProps {
  userInitials: string;
}

export const MobileUserMenu = ({ userInitials }: MobileUserMenuProps) => {
  return (
    <div className="lg:hidden">
      {userInitials ? (
        <UserMenu 
          userInitials={userInitials} 
          className="h-8 w-8 bg-[#9b87f5] hover:opacity-90 transition-opacity border border-border text-white" 
        />
      ) : (
        <Button asChild variant="primary" size="sm" className="h-8">
          <Link to="/signin">Sign In</Link>
        </Button>
      )}
    </div>
  );
};