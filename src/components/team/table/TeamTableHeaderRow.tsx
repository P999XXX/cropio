import { TableHead, TableRow } from "@/components/ui/table";
import { TeamMember } from "@/types/team";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TeamTableHeaderRowProps {
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof TeamMember) => void;
}

export const TeamTableHeaderRow = ({ sortConfig, onSort }: TeamTableHeaderRowProps) => {
  const renderTableHeader = (
    label: string,
    key: keyof TeamMember,
    className?: string
  ) => (
    <TableHead
      className={cn(
        "cursor-pointer hover:bg-primary/5 transition-colors py-3 text-[0.775rem] font-medium bg-secondary text-[#222222] dark:text-gray-200 group",
        className
      )}
      onClick={() => onSort(key)}
    >
      <div className="flex items-center gap-[5px] justify-between">
        <span>{label}</span>
        <div className="flex flex-col">
          <ArrowUp 
            className={cn(
              "h-4 w-4 -mb-2",
              sortConfig.key === key && sortConfig.direction === "asc" 
                ? "text-primary" 
                : "text-primary/40 group-hover:text-primary/60"
            )} 
          />
          <ArrowDown 
            className={cn(
              "h-4 w-4",
              sortConfig.key === key && sortConfig.direction === "desc" 
                ? "text-primary" 
                : "text-primary/40 group-hover:text-primary/60"
            )} 
          />
        </div>
      </div>
    </TableHead>
  );

  return (
    <TableRow>
      {renderTableHeader("Member", "email")}
      {renderTableHeader("Role", "role")}
      {renderTableHeader("Status", "status")}
      {renderTableHeader("Joined", "created_at")}
      {renderTableHeader("Invited By", "invited_by")}
      <TableHead className="w-[50px] py-3 bg-secondary"></TableHead>
    </TableRow>
  );
};