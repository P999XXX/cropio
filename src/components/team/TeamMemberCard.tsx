import { formatDistanceToNow } from "date-fns";
import { MoreVertical, UserCog, UserX } from "lucide-react";
import { TeamMember } from "@/types/team";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
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

  const getStatusBadgeVariant = (status: string) => {
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
    <Card className="team-member-card">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            {member.status === "accepted" ? (
              <>
                <h3 className="font-medium">
                  {member.profile.first_name} {member.profile.last_name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {member.profile.email}
                </p>
              </>
            ) : (
              <>
                <h3 className="font-medium">Invited User</h3>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </>
            )}
          </div>
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Role</p>
            <Badge variant={getRoleBadgeVariant(member.role)}>
              {member.role}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge variant={getStatusBadgeVariant(member.status)}>
              {member.status}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Joined</p>
            <p className="text-sm">
              {formatDistanceToNow(new Date(member.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Invited By</p>
            <p className="text-sm">
              {member.inviter.first_name} {member.inviter.last_name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};