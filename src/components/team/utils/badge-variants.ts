import { TeamMemberStatus } from "@/types/team";

export const getStatusBadgeVariant = (status: TeamMemberStatus) => {
  switch (status) {
    case "accepted":
      return "success" as const;
    case "pending":
      return "warning" as const;
    default:
      return "destructive" as const;
  }
};

export const getRoleBadgeVariant = (role: string) => {
  // All roles now use the same neutral style
  return "role-neutral" as const;
};