import { TeamMemberStatus } from "@/types/team";

export const getStatusBadgeVariant = (status: TeamMemberStatus) => {
  switch (status) {
    case "accepted":
      return "default" as const;
    case "pending":
      return "secondary" as const;
    default:
      return "destructive" as const;
  }
};

export const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "administrator":
      return "default" as const;
    case "editor":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
};