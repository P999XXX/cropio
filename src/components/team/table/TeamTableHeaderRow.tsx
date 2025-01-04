import { TableHead, TableRow } from "@/components/ui/table";
import { TeamMember } from "@/types/team";
import { cn } from "@/lib/utils";
import { 
  ArrowDownUp,
  ArrowDownAZ,
  ArrowDownZA,
  CalendarArrowDown,
  CalendarArrowUp,
  ArrowDown01,
  ArrowUp10
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
      return <ArrowDownUp className="h-4 w-4 text-black/60 group-hover:text-black/30" />;
    }

    // Text-based columns
    if (key === "email" || key === "role" || key === "status") {
      return isAsc ? (
        <ArrowDownAZ className="h-4 w-4 text-black" />
      ) : (
        <ArrowDownZA className="h-4 w-4 text-black" />
      );
    }

    // Date-based columns
    if (key === "created_at") {
      return isAsc ? (
        <CalendarArrowUp className="h-4 w-4 text-black" />
      ) : (
        <CalendarArrowDown className="h-4 w-4 text-black" />
      );
    }

    // Numeric columns (if any in the future)
    return isAsc ? (
      <ArrowDown01 className="h-4 w-4 text-black" />
    ) : (
      <ArrowUp10 className="h-4 w-4 text-black" />
    );
  };

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