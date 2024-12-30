import { TableHead, TableRow } from "@/components/ui/table";
import { TeamMember } from "@/types/team";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

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
        "cursor-pointer hover:bg-primary/5 transition-colors py-3 text-[0.775rem] font-medium bg-primary/10 text-primary/85",
        className
      )}
      onClick={() => onSort(key)}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        {sortConfig.key === key && (
          <span className="text-[0.775rem]">
            {sortConfig.direction === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </span>
        )}
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
      <TableHead className="w-[50px] py-3 bg-primary/10"></TableHead>
    </TableRow>
  );
};