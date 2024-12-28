import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TeamTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
}

export const TeamTableHeader = ({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
}: TeamTableHeaderProps) => {
  const roles = [
    { value: "all", label: "All roles" },
    { value: "administrator", label: "Administrator" },
    { value: "editor", label: "Editor" },
    { value: "readonly", label: "Read Only" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="search-button w-full sm:w-[300px] flex items-center justify-between text-[0.775rem] bg-background"
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{searchTerm || "Search members..."}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[300px] p-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Search Members</h4>
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-background/50 border-muted [&::placeholder]:text-[0.775rem]"
            />
          </div>
        </PopoverContent>
      </Popover>
      
      <div className="flex gap-2 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="filter-dropdown-button w-[180px] justify-between text-[0.775rem] bg-background"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span>{roles.find(r => r.value === roleFilter)?.label || "Filter by role"}</span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[180px] p-0">
            <div className="filter-role-options">
              {roles.map(({ value, label }) => (
                <Button
                  key={value}
                  variant="ghost"
                  className="w-full justify-start text-[0.775rem] h-9"
                  onClick={() => onRoleFilterChange(value)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};