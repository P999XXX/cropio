import { Badge } from "@/components/ui/badge";
import { getRoleBadgeVariant } from "../utils/badge-variants";

interface RoleBadgeProps {
  role: string;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  return (
    <Badge 
      variant="outline"
      className="rounded-[5px] py-0.5 px-2 font-medium text-[0.7rem] bg-primary/5 text-primary border-primary/20"
    >
      {role}
    </Badge>
  );
};