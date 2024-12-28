import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={roleFilter} onValueChange={onRoleFilterChange}>
          <SelectTrigger className="w-[180px] bg-background/50 border-muted text-[0.775rem]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-[0.775rem]">All roles</SelectItem>
            <SelectItem value="administrator" className="text-[0.775rem]">Administrator</SelectItem>
            <SelectItem value="editor" className="text-[0.775rem]">Editor</SelectItem>
            <SelectItem value="readonly" className="text-[0.775rem]">Read Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};