import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserMenuTriggerProps {
  userInitials: string;
  className?: string;
}

export const UserMenuTrigger = ({ userInitials, className }: UserMenuTriggerProps) => {
  return (
    <Avatar className={`h-8 w-8 bg-primary hover:bg-primary-hover transition-colors ${className}`}>
      <AvatarFallback className="text-[0.775rem] text-primary-foreground">
        {userInitials ? (
          userInitials
        ) : (
          <User className="h-4 w-4 text-primary-foreground" />
        )}
      </AvatarFallback>
    </Avatar>
  );
};