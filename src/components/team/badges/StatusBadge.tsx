import { Badge } from "@/components/ui/badge";
import { TeamMemberStatus } from "@/types/team";
import { getStatusBadgeVariant } from "../utils/badge-variants";

interface StatusBadgeProps {
  status: TeamMemberStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge 
      variant={getStatusBadgeVariant(status)} 
      className="rounded-full"
    >
      {status}
    </Badge>
  );
};