import { Badge } from "@/components/ui/badge";
import { getRoleBadgeVariant } from "../utils/badge-variants";

interface RoleBadgeProps {
  role: string;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  return (
    <Badge 
      variant={getRoleBadgeVariant(role)} 
      className="rounded-[5px] py-0 px-2"
    >
      {role}
    </Badge>
  );
};