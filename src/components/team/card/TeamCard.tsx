import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { RoleBadge } from "../badges/RoleBadge";
import { StatusBadge } from "../badges/StatusBadge";
import { MoreVertical } from "lucide-react";
import { TeamMemberActions } from "../table/TeamMemberActions";
import { TeamMember } from "@/types/team";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface TeamCardProps {
  member: TeamMember;
  onInvite: () => void;
}

const getInitials = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) return "?";
  return `${(firstName?.[0] || "").toUpperCase()}${(lastName?.[0] || "").toUpperCase()}`;
};

export const TeamCard = ({ member, onInvite }: TeamCardProps) => {
  const displayName = member.first_name && member.last_name 
    ? `${member.first_name} ${member.last_name}`
    : member.profile?.first_name && member.profile?.last_name 
    ? `${member.profile.first_name} ${member.profile.last_name}`
    : "Unnamed User";

  const email = member.status === "accepted" ? member.profile?.email : member.email;

  return (
    <Card className="team-card p-4 bg-background border border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarFallback className="text-[0.775rem]">
              {getInitials(member.first_name || member.profile?.first_name, member.last_name || member.profile?.last_name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h3 className="text-[0.875rem] font-medium truncate">
              {displayName}
            </h3>
            <p className="text-[0.775rem] text-muted-foreground truncate">
              {email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={member.status} />
          <RoleBadge role={member.role} />
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
              <TeamMemberActions member={member} onInvite={onInvite} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};