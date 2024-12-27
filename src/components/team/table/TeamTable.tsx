import { TeamMember } from "@/types/team";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { StatusBadge } from "../badges/StatusBadge";
import { RoleBadge } from "../badges/RoleBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TeamTableProps {
  members: TeamMember[];
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof TeamMember) => void;
}

export const TeamTable = ({ members, sortConfig, onSort }: TeamTableProps) => {
  const renderTableHeader = (
    label: string,
    key: keyof TeamMember,
    className?: string
  ) => (
    <TableHead
      className={cn(
        "cursor-pointer hover:text-primary transition-colors",
        className
      )}
      onClick={() => onSort(key)}
    >
      <div className="flex items-center gap-2">
        {label}
        {sortConfig.key === key && (
          <span className="text-xs">
            {sortConfig.direction === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <div className="rounded-lg border bg-card w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {renderTableHeader("Member", "email")}
            {renderTableHeader("Role", "role")}
            {renderTableHeader("Status", "status")}
            {renderTableHeader("Joined", "created_at")}
            {renderTableHeader("Invited By", "invited_by", "text-right")}
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="flex flex-col">
                  {member.status === "accepted" ? (
                    <>
                      <span className="font-medium">
                        {member.profile?.first_name} {member.profile?.last_name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {member.profile?.email}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Invited User</span>
                      <span className="text-sm text-muted-foreground">
                        {member.email}
                      </span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <RoleBadge role={member.role} />
              </TableCell>
              <TableCell>
                <StatusBadge status={member.status} />
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(member.created_at), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell className="text-right">
                {member.inviter?.first_name} {member.inviter?.last_name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};