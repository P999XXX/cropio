export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

export interface TeamMember {
  id: string;
  role: string;
  profile: Profile;
}

export interface Team {
  id: string;
  name: string;
  created_at: string;
}