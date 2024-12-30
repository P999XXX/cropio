import { TableHead, TableRow } from "@/components/ui/table";
import { TeamMember } from "@/types/team";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

interface TeamTableHeaderRowProps {
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof TeamMember) => void;
  sizes: number[];
}

export const TeamTableHeaderRow = ({ sortConfig, onSort, sizes }: TeamTableHeaderRowProps) => {
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
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel defaultSize={sizes[0]} minSize={20}>
          {renderTableHeader("Member", "email")}
        </ResizablePanel>
        <ResizablePanel defaultSize={sizes[1]} minSize={10}>
          {renderTableHeader("Role", "role")}
        </ResizablePanel>
        <ResizablePanel defaultSize={sizes[2]} minSize={10}>
          {renderTableHeader("Status", "status")}
        </ResizablePanel>
        <ResizablePanel defaultSize={sizes[3]} minSize={10}>
          {renderTableHeader("Joined", "created_at")}
        </ResizablePanel>
        <ResizablePanel defaultSize={sizes[4]} minSize={10}>
          {renderTableHeader("Invited By", "invited_by")}
        </ResizablePanel>
        <ResizablePanel defaultSize={sizes[5]} minSize={5}>
          <TableHead className="w-[50px] py-3 bg-primary/10"></TableHead>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TableRow>
  );
};