import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { TeamMember } from "@/types/team";

interface MobileSortDropdownProps {
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof TeamMember) => void;
}

export const MobileSortDropdown = ({ sortConfig, onSort }: MobileSortDropdownProps) => {
  const getSortLabel = (key: keyof TeamMember) => {
    switch (key) {
      case "created_at":
        return "Join Date";
      case "email":
        return "Name/Email";
      case "role":
        return "Role";
      case "status":
        return "Status";
      default:
        return key;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="mobile-sort-dropdown w-full flex items-center justify-between text-[0.775rem]"
        >
          <span>Sort by: {getSortLabel(sortConfig.key)}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={() => onSort("email")} className="text-[0.775rem]">
          Name/Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("role")} className="text-[0.775rem]">
          Role {sortConfig.key === "role" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("status")} className="text-[0.775rem]">
          Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort("created_at")} className="text-[0.775rem]">
          Join Date {sortConfig.key === "created_at" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};