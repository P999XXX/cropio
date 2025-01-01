import { Badge } from "@/components/ui/badge";
import { TeamMemberStatus } from "@/types/team";
import { getStatusBadgeVariant } from "../utils/badge-variants";

interface StatusBadgeProps {
  status: TeamMemberStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variant = getStatusBadgeVariant(status);
  
  return (
    <Badge 
      variant="outline"
      className={`rounded-[5px] py-0.5 px-2 font-medium text-[0.7rem] ${
        status === 'accepted' ? 'bg-success text-success-foreground border-success-foreground/20' :
        status === 'pending' ? 'bg-warning text-warning-foreground border-warning-foreground/20' :
        'bg-destructive text-destructive-foreground border-destructive-foreground/20'
      }`}
    >
      {status}
    </Badge>
  );
};