import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserMenuTriggerProps {
  userInitials: string;
  className?: string;
}

export const UserMenuTrigger = ({ userInitials, className }: UserMenuTriggerProps) => (
  <Avatar className={className || "h-9 w-9 bg-[#9b87f5] hover:opacity-90 transition-opacity border border-border cursor-pointer"}>
    <AvatarFallback className="text-white text-[11px] bg-transparent">
      {userInitials}
    </AvatarFallback>
  </Avatar>
);