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
    <div className="rounded-lg border bg-card w-full">
      <Table>
        <TableHeader>
          <TeamTableHeaderRow sortConfig={sortConfig} onSort={onSort} />
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className="hover:bg-[hsl(210deg_40%_98.04%)]">
              <TableCell className="py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <AvatarFallback className="text-[0.775rem]">
                      {member.status === "accepted" 
                        ? getInitials(member.profile?.first_name, member.profile?.last_name)
                        : '??'
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    {member.status === "accepted" ? (
                      <>
                        <span className="font-medium">
                          {member.profile?.first_name} {member.profile?.last_name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {member.profile?.email}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-semibold">Invited User</span>
                        <span className="text-xs text-muted-foreground">
                          {member.email}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-2">
                <RoleBadge role={member.role} />
              </TableCell>
              <TableCell className="py-2">
                <StatusBadge status={member.status} />
              </TableCell>
              <TableCell className="py-2 text-[0.75rem]">
                {formatDistanceToNow(new Date(member.created_at), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell className="py-2 text-[0.75rem]">
                {member.inviter?.first_name} {member.inviter?.last_name}
              </TableCell>
              <TableCell className="py-2">
                <TeamMemberActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};