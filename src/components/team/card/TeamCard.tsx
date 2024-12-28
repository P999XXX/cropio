import { formatDistanceToNow } from "date-fns";
import { MoreVertical, UserCog, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TeamMember } from "@/types/team";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "../badges/StatusBadge";
import { RoleBadge } from "../badges/RoleBadge";

interface TeamCardProps {
  member: TeamMember;
  viewMode: "grid" | "list";
  onSort: (key: keyof TeamMember) => void;
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
}

export const TeamCard = ({ member, viewMode }: TeamCardProps) => {
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return '??';
    return `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}`;
  };

  return (
    <Card className={`team-member-card transition-all duration-200 hover:shadow-md ${viewMode === "list" ? "list-mode" : ""}`}>
      <CardHeader className="relative pb-2">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-primary/10">
              <AvatarFallback>
                {member.status === "accepted" 
                  ? getInitials(member.profile?.first_name, member.profile?.last_name)
                  : '??'
                }
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              {member.status === "accepted" ? (
                <>
                  <h3 className="font-semibold">
                    {member.profile?.first_name} {member.profile?.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {member.profile?.email}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-semibold">Invited User</h3>
                  <p className="text-sm text-muted-foreground">
                    {member.email}
                  </p>
                </>
              )}
            </div>
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
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2">
          <RoleBadge role={member.role} />
          <StatusBadge status={member.status} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-[0.75rem] text-muted-foreground border-t pt-4">
        <span>
          Joined {formatDistanceToNow(new Date(member.created_at), {
            addSuffix: true,
          })}
        </span>
        <span className="text-right">
          Invited by {member.inviter?.first_name || 'Unknown'} {member.inviter?.last_name || ''}
        </span>
      </CardFooter>
    </Card>
  );
};