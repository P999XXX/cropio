import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="mobile-sort-dropdown w-full flex items-center justify-between text-[0.775rem] bg-background border-primary/20 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
        >
          <span>Sort by: {getSortLabel(sortConfig.key)}</span>
          <div className="flex flex-col ml-2">
            <ArrowUp className="h-3 w-3 -mb-1 text-primary/40" />
            <ArrowDown className="h-3 w-3 text-primary/40" />
          </div>
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
              className="w-full justify-between text-[0.775rem] h-9 hover:bg-primary/5 hover:text-foreground group"
              onClick={() => onSort(key as keyof TeamMember)}
            >
              <span>{label}</span>
              <div className="flex flex-col">
                <ArrowUp 
                  className={cn(
                    "h-3 w-3 -mb-1",
                    sortConfig.key === key && sortConfig.direction === "asc" 
                      ? "text-primary" 
                      : "text-primary/40 group-hover:text-primary/60"
                  )} 
                />
                <ArrowDown 
                  className={cn(
                    "h-3 w-3",
                    sortConfig.key === key && sortConfig.direction === "desc" 
                      ? "text-primary" 
                      : "text-primary/40 group-hover:text-primary/60"
                  )} 
                />
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};