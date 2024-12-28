export type TeamMemberRole = "administrator" | "editor" | "readonly";
export type TeamMemberStatus = "pending" | "accepted" | "declined";

export interface TeamMember {
  id: string;
  profile_id: string;
  invited_by: string;
  role: TeamMemberRole;
  email: string;
  status: TeamMemberStatus;
  created_at: string;
  updated_at: string;
  profile: {
    first_name: string | null;
    last_name: string | null;
    email: string;
  };
  inviter: {
    first_name: string | null;
    last_name: string | null;
  };
}