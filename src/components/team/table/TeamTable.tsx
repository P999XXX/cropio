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
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeamTableProps {
  members: TeamMember[];
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof TeamMember) => void;
}

export const TeamTable = ({ members, sortConfig, onSort }: TeamTableProps) => {
  const getInitials = (firstName?: string | null, lastName?: string | null) => {
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
            const firstName = member.status === "accepted" ? member.profile?.first_name : member.first_name;
            const lastName = member.status === "accepted" ? member.profile?.last_name : member.last_name;
            const email = member.status === "accepted" ? member.profile?.email : member.email;
            
            const displayName = firstName && lastName 
              ? `${firstName} ${lastName}`
              : member.first_name && member.last_name 
              ? `${member.first_name} ${member.last_name}`
              : "Unnamed User";

            return (
              <TableRow key={member.id} className="hover:bg-primary/5 border-primary/10">
                <TableCell className="py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-secondary">
                      <AvatarFallback className="text-[0.775rem] text-foreground">
                        {getInitials(firstName || member.first_name, lastName || member.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {displayName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {email}
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <TeamMemberActions 
                        member={member} 
                        onInvite={() => {}} // Pass empty function since it's required
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};