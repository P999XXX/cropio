import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserMenuProps {
  userInitials: string;
  className?: string;
}

export const UserMenu = ({ userInitials, className }: UserMenuProps) => {
  if (!userInitials) return null;
  
  return (
    <Link to="/dashboard/settings">
      <Avatar className={className || "h-9 w-9 bg-[#9b87f5] hover:opacity-90 transition-opacity border border-border"}>
        <AvatarFallback className="text-primary-foreground text-xs bg-transparent">
          {userInitials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};