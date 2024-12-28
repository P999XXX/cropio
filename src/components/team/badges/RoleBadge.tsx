import { Badge } from "@/components/ui/badge";
import { getRoleBadgeVariant } from "../utils/badge-variants";

interface RoleBadgeProps {
  role: string;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  return (
    <Badge 
      variant={getRoleBadgeVariant(role)} 
      className="rounded-full text-xs py-0.5 px-2"
    >
      {role}
    </Badge>
  );
};