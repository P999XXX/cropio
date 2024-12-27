import { Badge } from "@/components/ui/badge";
import { TeamMemberRole } from "@/types/team";
import { getRoleBadgeVariant } from "../utils/badge-variants";

interface RoleBadgeProps {
  role: TeamMemberRole;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  return (
    <Badge 
      variant={getRoleBadgeVariant(role)} 
      className="rounded-full"
    >
      {role}
    </Badge>
  );
};