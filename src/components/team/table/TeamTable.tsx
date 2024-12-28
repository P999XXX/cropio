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

interface TeamTableProps {
  members: TeamMember[];
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof TeamMember) => void;
}

export const TeamTable = ({ members, sortConfig, onSort }: TeamTableProps) => {
  return (
    <div className="rounded-lg border bg-card w-full">
      <Table>
        <TableHeader>
          <TeamTableHeaderRow sortConfig={sortConfig} onSort={onSort} />
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className="hover:bg-muted/50">
              <TableCell className="py-2">
                <div className="flex flex-col gap-0.5">
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