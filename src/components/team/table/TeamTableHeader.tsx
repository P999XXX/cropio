import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RoleFilter } from "./RoleFilter";
import { SortConfig } from "../hooks/useTeamTable";
import { ArrowUpDown } from "lucide-react";

interface TeamTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  showSortButton?: boolean;
}

export const TeamTableHeader = ({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  sortConfig,
  onSort,
  showSortButton,
}: TeamTableHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center">
      <Input
        placeholder="Search team members..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full lg:w-64 bg-success text-success-foreground placeholder:text-success-foreground/60"
      />
      <div className="flex gap-2 w-full lg:w-auto">
        <RoleFilter
          value={roleFilter}
          onChange={onRoleFilterChange}
          className="bg-success text-success-foreground hover:bg-success-hover flex-1 lg:flex-none"
        />
        {showSortButton && (
          <Button
            variant="ghost"
            onClick={() => onSort("name")}
            className="bg-success text-success-foreground hover:bg-success-hover"
          >
            Sort
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};