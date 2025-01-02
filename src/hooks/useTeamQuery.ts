import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeamMember } from "@/types/team";

export const useTeamQuery = () => {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select(`
          *,
          profile:profiles!team_members_profile_id_fkey(
            first_name,
            last_name,
            email
          ),
          inviter:profiles!team_members_invited_by_fkey(
            first_name,
            last_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as TeamMember[];
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    gcTime: 1000 * 60 * 10,   // Keep unused data for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
};