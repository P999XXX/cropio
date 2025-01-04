import { TeamMember } from "@/types/team";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Mail } from "lucide-react";

interface TeamMemberActionsProps {
  member: TeamMember;
  onInvite: () => void;
}

export const TeamMemberActions = ({ member, onInvite }: TeamMemberActionsProps) => {
  return (
    <>
      {member.status === "pending" && (
        <DropdownMenuItem onClick={onInvite} className="gap-2">
          <Mail className="h-4 w-4" />
          <span>Resend Invite</span>
        </DropdownMenuItem>
      )}
    </>
  );
};