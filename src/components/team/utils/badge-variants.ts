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
  switch (role) {
    case "administrator":
      return "role-primary" as const;
    case "editor":
      return "role-secondary" as const;
    default:
      return "role-default" as const;
  }
};