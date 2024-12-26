import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Team, TeamMember } from "@/types/team";

export const useTeamData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const navigate = useNavigate();

  const fetchTeamData = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // First get the user's team membership
      const { data: membership, error: membershipError } = await supabase
        .from('team_members')
        .select('team_id, role')
        .eq('user_id', userId)
        .maybeSingle();

      if (membershipError) {
        console.error('Error fetching user membership:', membershipError);
        toast.error('Error loading team data');
        return;
      }

      if (!membership) {
        console.log('No team membership found');
        toast.error('No team found');
        return;
      }

      // Then fetch the team details
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('id', membership.team_id)
        .maybeSingle();

      if (teamError) {
        console.error('Error fetching team:', teamError);
        toast.error('Error loading team data');
        return;
      }

      if (team) {
        setUserTeam(team);
      }

      // Finally fetch all team members
      const { data: members, error: membersError } = await supabase
        .from('team_members')
        .select(`
          id,
          role,
          profile:profiles(
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('team_id', membership.team_id);

      if (membersError) {
        console.error('Error fetching members:', membersError);
        toast.error('Error loading team members');
        return;
      }

      setTeamMembers(members || []);
    } catch (error: any) {
      console.error('Error in fetchTeamData:', error);
      toast.error('An error occurred while loading team data');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthAndFetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("No session found, redirecting to signin");
        navigate('/signin');
        return;
      }

      await fetchTeamData(session.user.id);
    } catch (error) {
      console.error('Auth check error:', error);
      toast.error('Authentication error. Please sign in again.');
      navigate('/signin');
    }
  };

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  return {
    isLoading,
    teamMembers,
    userTeam,
    refreshData: checkAuthAndFetchData
  };
};