import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMemo } from "react";

const backgroundColors = [
  'bg-[#8B5CF6]', // Vivid Purple
  'bg-[#D946EF]', // Magenta Pink
  'bg-[#F97316]', // Bright Orange
  'bg-[#0EA5E9]', // Ocean Blue
];

interface UserMenuProps {
  userInitials: string;
  className?: string;
}

export const UserMenu = ({ userInitials, className }: UserMenuProps) => {
  if (!userInitials) return null;

  // Use useMemo to keep the same color for the same user during re-renders
  const randomColor = useMemo(() => {
    // Use the userInitials string to generate a consistent index
    const index = userInitials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return backgroundColors[index % backgroundColors.length];
  }, [userInitials]);
  
  return (
    <Link to="/dashboard/settings">
      <Avatar 
        className={`${className || "h-9 w-9"} ${randomColor} hover:opacity-90 transition-opacity border-2 border-background`}
      >
        <AvatarFallback className="text-background text-xs font-medium">
          {userInitials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};
