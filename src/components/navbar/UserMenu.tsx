import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserMenuProps {
  userInitials: string;
}

export const UserMenu = ({ userInitials }: UserMenuProps) => {
  if (!userInitials) return null;
  
  return (
    <Link to="/dashboard/settings">
      <Avatar className="h-9 w-9 bg-background border border-border hover:bg-secondary transition-colors">
        <AvatarFallback className="text-foreground text-sm">
          {userInitials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};