import { TableHead, TableRow } from "@/components/ui/table";
import { TeamMember } from "@/types/team";
import { cn } from "@/lib/utils";
import { 
  ArrowDownUp,
  ArrowDownAZ,
  ArrowUpZA,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";

interface TeamTableHeaderRowProps {
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof TeamMember) => void;
}

export const TeamTableHeaderRow = ({ sortConfig, onSort }: TeamTableHeaderRowProps) => {
  const getSortIcon = (key: keyof TeamMember) => {
    const isCurrentSort = sortConfig.key === key;
    const isAsc = sortConfig.direction === "asc";

    // If not the current sort column
    if (!isCurrentSort) {
      return <ArrowDownUp className="h-4 w-4 text-foreground hover:text-foreground hover:bg-secondary/80 rounded-sm p-0.5 transition-colors" />;
    }

    // Text-based columns (email, role, status)
    if (key === "email" || key === "role" || key === "status") {
      return isAsc ? (
        <ArrowDownAZ className="h-4 w-4 text-black dark:text-white" />
      ) : (
        <ArrowUpZA className="h-4 w-4 text-black dark:text-white" />
      );
    }

    // Date-based columns
    if (key === "created_at") {
      return isAsc ? (
        <CalendarArrowUp className="h-4 w-4 text-black dark:text-white" />
      ) : (
        <CalendarArrowDown className="h-4 w-4 text-black dark:text-white" />
      );
    }

    // Default to text-based sorting icons
    return isAsc ? (
      <ArrowDownAZ className="h-4 w-4 text-black dark:text-white" />
    ) : (
      <ArrowUpZA className="h-4 w-4 text-black dark:text-white" />
    );
  };

  const renderTableHeader = (
    label: string,
    key: keyof TeamMember,
    className?: string
  ) => (
    <TableHead
      className={cn(
        "cursor-pointer hover:bg-primary/5 transition-colors py-3 text-[0.775rem] font-medium bg-secondary text-foreground group",
        className
      )}
      onClick={() => onSort(key)}
    >
      <div className="flex items-center gap-[5px] justify-between">
        <span>{label}</span>
        {getSortIcon(key)}
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