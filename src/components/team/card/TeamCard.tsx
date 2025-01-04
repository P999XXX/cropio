import { formatDistanceToNow } from "date-fns";
import { MoreVertical, UserCog, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
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

  const firstName = member.status === "accepted" ? member.profile?.first_name : member.first_name;
  const lastName = member.status === "accepted" ? member.profile?.last_name : member.last_name;
  const email = member.status === "accepted" ? member.profile?.email : member.email;

  return (
    <Card className="team-member-card p-4 hover:bg-accent/5 transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarFallback className="text-[0.775rem]">
              {getInitials(firstName, lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium truncate text-[0.775rem]">
                {firstName && lastName ? `${firstName} ${lastName}` : "Unnamed User"}
              </h3>
              <div className="flex gap-1.5">
                <RoleBadge role={member.role} />
                <StatusBadge status={member.status} />
              </div>
            </div>
            <p className="text-[0.775rem] text-muted-foreground truncate">
              {email}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-[0.775rem] text-muted-foreground shrink-0">
          <span className="hidden sm:block">
            {formatDistanceToNow(new Date(member.created_at), { addSuffix: true })}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2 text-[0.775rem]">
                <UserCog className="h-4 w-4" />
                Change Role
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-destructive text-[0.775rem]">
                <UserX className="h-4 w-4" />
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};