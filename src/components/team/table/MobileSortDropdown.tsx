import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { TeamMember } from "@/types/team";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="mobile-sort-dropdown w-full flex items-center justify-between text-[0.775rem] bg-background border-primary/20 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
        >
          <span>Sort by: {getSortLabel(sortConfig.key)}</span>
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[200px] p-0 bg-background">
        <div className="mobile-sort-options">
          {[
            { key: "email", label: "Name/Email" },
            { key: "role", label: "Role" },
            { key: "status", label: "Status" },
            { key: "created_at", label: "Join Date" },
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant="ghost"
              className="w-full justify-start text-[0.775rem] h-9 hover:bg-primary/5 hover:text-foreground"
              onClick={() => onSort(key as keyof TeamMember)}
            >
              {label} {sortConfig.key === key && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};