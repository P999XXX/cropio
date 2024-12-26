import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import TeamMembersList from "@/components/team/TeamMembersList";
import InviteMemberDialog from "@/components/team/InviteMemberDialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface TeamMember {
  id: string;
  role: string;
  profile: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
  };
}

interface Team {
  id: string;
  name: string;
  created_at: string;
}

const TeamManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

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

  const fetchTeamData = async (userId: string) => {
    try {
      setIsLoading(true);
      console.log('Fetching team data for user:', userId);
      
      // First, get the user's team membership
      const { data: membershipData, error: membershipError } = await supabase
        .from('team_members')
        .select(`
          team_id,
          role,
          team:teams(*)
        `)
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

      setUserTeam(membershipData.team);
      const teamId = membershipData.team_id;
      console.log('Found team ID:', teamId);

      // Then fetch all team members with their profiles
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
        .eq('team_id', teamId);

      if (membersError) {
        console.error('Error fetching members:', membersError);
        toast.error('Error loading team members');
        return;
      }

      console.log('Team members loaded:', members);
      setTeamMembers(members || []);
    } catch (error: any) {
      console.error('Error in fetchTeamData:', error);
      toast.error('An error occurred while loading team data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteMember = async (email: string, role: 'admin' | 'member') => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please sign in to invite team members');
        return;
      }

      if (!userTeam) {
        toast.error('No team found');
        return;
      }

      console.log('Sending invite:', { email, role, teamId: userTeam.id });

      const { error } = await supabase
        .from('team_invites')
        .insert({
          team_id: userTeam.id,
          email,
          role,
          invited_by: session.user.id,
          status: 'pending'
        });

      if (error) {
        console.error('Error inviting member:', error);
        toast.error('Error sending invitation');
        return;
      }

      toast.success('Invitation sent successfully');
      setShowInviteDialog(false);
      await fetchTeamData(session.user.id);
    } catch (error: any) {
      console.error('Error in handleInviteMember:', error);
      toast.error('Error sending invitation');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">
              Manage your team members and invitations
            </p>
          </div>
          <Button
            onClick={() => setShowInviteDialog(true)}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>

        <div className="space-y-6">
          <TeamMembersList
            members={teamMembers}
            onRemoveMember={() => checkAuthAndFetchData()}
          />
        </div>

        <InviteMemberDialog
          open={showInviteDialog}
          onOpenChange={setShowInviteDialog}
          onInvite={handleInviteMember}
        />
      </div>
    </div>
  );
};

export default TeamManagement;