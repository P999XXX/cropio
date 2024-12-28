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
      <div className="relative flex-1 max-w-[333px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-background/50 border-muted [&::placeholder]:text-[0.775rem]"
        />
      </div>
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