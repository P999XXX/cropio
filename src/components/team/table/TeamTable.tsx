import { TeamMember } from "@/types/team";
import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../badges/StatusBadge";
import { RoleBadge } from "../badges/RoleBadge";
import { TeamTableHeaderRow } from "./TeamTableHeaderRow";
import { TeamMemberActions } from "./TeamMemberActions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TeamTableProps {
  members: TeamMember[];
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof TeamMember) => void;
}

export const TeamTable = ({ members, sortConfig, onSort }: TeamTableProps) => {
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return '??';
    return `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}`;
  };

  return (
    <div className="rounded-lg bg-card w-full overflow-hidden team-table-container">
      <Table>
        <TableHeader>
          <TeamTableHeaderRow sortConfig={sortConfig} onSort={onSort} />
        </TableHeader>
        <TableBody>
          {members.map((member) => {
            const displayName = member.status === "accepted" 
              ? `${member.profile?.first_name || ''} ${member.profile?.last_name || ''}`
              : `${member.first_name || ''} ${member.last_name || ''}`;

            const displayEmail = member.status === "accepted" 
              ? member.profile?.email 
              : member.email;

            const initials = member.status === "accepted"
              ? getInitials(member.profile?.first_name, member.profile?.last_name)
              : getInitials(member.first_name, member.last_name);

            return (
              <TableRow key={member.id} className="hover:bg-primary/5 border-primary/10">
                <TableCell className="py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-secondary">
                      <AvatarFallback className="text-[0.775rem] text-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {displayName || "Invited User"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {displayEmail}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <RoleBadge role={member.role} />
                </TableCell>
                <TableCell className="py-2">
                  <StatusBadge status={member.status} />
                </TableCell>
                <TableCell className="py-2 text-[0.75rem] text-foreground">
                  {formatDistanceToNow(new Date(member.created_at), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="py-2 text-[0.75rem] text-foreground">
                  {member.inviter?.first_name} {member.inviter?.last_name}
                </TableCell>
                <TableCell className="py-2">
                  <TeamMemberActions />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};