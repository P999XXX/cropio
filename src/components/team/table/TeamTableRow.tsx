import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { TeamMember, TeamMemberStatus } from "@/types/team";
import { formatDistanceToNow } from "date-fns";
import { MoreVertical, UserX, UserCog } from "lucide-react";

interface TeamTableRowProps {
  member: TeamMember;
}

export const TeamTableRow = ({ member }: TeamTableRowProps) => {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "administrator":
        return "default";
      case "editor":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: TeamMemberStatus) => {
    switch (status) {
      case "accepted":
        return "default";
      case "pending":
        return "secondary";
      default:
        return "destructive";
    }
  };

  return (
    <TableRow key={member.id}>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">
            {member.profile.first_name} {member.profile.last_name}
          </span>
          <span className="text-sm text-muted-foreground">
            {member.profile.email}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getRoleBadgeVariant(member.role)}>
          {member.role}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(member.status)}>
          {member.status}
        </Badge>
      </TableCell>
      <TableCell>
        {formatDistanceToNow(new Date(member.created_at), {
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        {member.inviter.first_name} {member.inviter.last_name}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              Change Role
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive">
              <UserX className="h-4 w-4" />
              Remove Member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};