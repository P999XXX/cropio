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
      
      // First, get the user's team membership
      const { data: membershipData, error: membershipError } = await supabase
        .from('team_members')
        .select('team_id, role')
        .eq('user_id', userId)
        .maybeSingle();

      if (membershipError) {
        console.error('Error fetching team membership:', membershipError);
        toast.error('Error loading team data');
        return;
      }

      if (!membershipData) {
        console.log('No team membership found');
        toast.error('No team found');
        return;
      }

      // Then fetch the team details
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('id', membershipData.team_id)
        .maybeSingle();

      if (teamError) {
        console.error('Error fetching team:', teamError);
        toast.error('Error loading team data');
        return;
      }

      setUserTeam(teamData);

      // Finally fetch all team members with their profiles
      const { data: members, error: membersError } = await supabase
        .from('team_members')
        .select(`
          id,
          role,
          profile:profiles(
            id,
            first_name,
            last_name
          )
        `)
        .eq('team_id', membershipData.team_id);

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
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
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