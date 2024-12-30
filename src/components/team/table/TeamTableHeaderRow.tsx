import { TableHead, TableRow } from "@/components/ui/table";
import { TeamMember } from "@/types/team";
import { cn } from "@/lib/utils";
import { Users, UserCheck, Clock, UserPlus } from "lucide-react";

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
    icon: React.ReactNode,
    className?: string
  ) => (
    <TableHead
      className={cn(
        "cursor-pointer hover:bg-primary/5 transition-colors py-3 text-[0.775rem] font-medium bg-primary/10 text-primary/85",
        className
      )}
      onClick={() => onSort(key)}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
        {sortConfig.key === key && (
          <span className="text-[0.775rem] ml-1">
            {sortConfig.direction === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <TableRow>
      {renderTableHeader("Member", "email", <Users className="h-4 w-4" />)}
      {renderTableHeader("Role", "role", <UserCheck className="h-4 w-4" />)}
      {renderTableHeader("Status", "status", <UserCheck className="h-4 w-4" />)}
      {renderTableHeader("Joined", "created_at", <Clock className="h-4 w-4" />)}
      {renderTableHeader("Invited By", "invited_by", <UserPlus className="h-4 w-4" />)}
      <TableHead className="w-[50px] py-3 bg-primary/10"></TableHead>
    </TableRow>
  );
};