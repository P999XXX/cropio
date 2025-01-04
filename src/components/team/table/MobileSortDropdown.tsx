import { Button } from "@/components/ui/button";
import { 
  ArrowDownUp,
  ArrowDownAZ,
  ArrowDownZA,
  CalendarArrowDown,
  CalendarArrowUp,
  ArrowDown01,
  ArrowUp10
} from "lucide-react";
import { TeamMember } from "@/types/team";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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

  const getSortIcon = (key: keyof TeamMember) => {
    const isCurrentSort = sortConfig.key === key;
    const isAsc = sortConfig.direction === "asc";
    const baseClass = "h-3 w-3";

    // If not the current sort column
    if (!isCurrentSort) {
      return <ArrowDownUp className={cn(baseClass, "text-foreground hover:text-foreground hover:bg-secondary/80 rounded-sm p-0.5 transition-colors")} />;
    }

    // Text-based columns
    if (key === "email" || key === "role" || key === "status") {
      return isAsc ? (
        <ArrowDownAZ className={cn(baseClass, "text-black")} />
      ) : (
        <ArrowDownZA className={cn(baseClass, "text-black")} />
      );
    }

    // Date-based columns
    if (key === "created_at") {
      return isAsc ? (
        <CalendarArrowUp className={cn(baseClass, "text-black")} />
      ) : (
        <CalendarArrowDown className={cn(baseClass, "text-black")} />
      );
    }

    // Numeric columns (if any in the future)
    return isAsc ? (
      <ArrowDown01 className={cn(baseClass, "text-black")} />
    ) : (
      <ArrowUp10 className={cn(baseClass, "text-black")} />
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="mobile-sort-dropdown w-full lg:w-[180px] flex items-center justify-between text-[0.775rem] bg-background border-primary/20 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
        >
          <span>Sort by: {getSortLabel(sortConfig.key)}</span>
          {getSortIcon(sortConfig.key)}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[180px] p-0 bg-background">
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
              className="w-full justify-between text-[0.775rem] h-9 hover:bg-primary/5 hover:text-foreground group"
              onClick={() => onSort(key as keyof TeamMember)}
            >
              <span>{label}</span>
              {getSortIcon(key as keyof TeamMember)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};