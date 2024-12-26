import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import TeamMembersList from "@/components/team/TeamMembersList";
import InviteMemberDialog from "@/components/team/InviteMemberDialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const TeamManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [pendingInvites, setPendingInvites] = useState<any[]>([]);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [userTeam, setUserTeam] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/signin');
        return;
      }
      fetchTeamData();
    };

    checkAuth();
  }, [navigate]);

  const fetchTeamData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch user's team
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .single();

      if (teamError) throw teamError;
      setUserTeam(teamData);

      // Fetch team members with their profiles
      const { data: members, error: membersError } = await supabase
        .from('team_members')
        .select(`
          *,
          profile:profiles(first_name, last_name, email)
        `)
        .eq('team_id', teamData.id);

      if (membersError) throw membersError;
      setTeamMembers(members);

      // Fetch pending invites
      const { data: invites, error: invitesError } = await supabase
        .from('team_invites')
        .select('*')
        .eq('team_id', teamData.id)
        .eq('status', 'pending');

      if (invitesError) throw invitesError;
      setPendingInvites(invites);

    } catch (error: any) {
      console.error('Error fetching team data:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteMember = async (email: string, role: 'admin' | 'member') => {
    try {
      const { error } = await supabase
        .from('team_invites')
        .insert({
          team_id: userTeam.id,
          email,
          role,
        });

      if (error) throw error;

      toast.success('Invitation sent successfully!');
      setShowInviteDialog(false);
      fetchTeamData(); // Refresh the data
    } catch (error: any) {
      console.error('Error inviting member:', error);
      toast.error(error.message);
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
      <div className="container mx-auto px-4 py-8">
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
            onRemoveMember={fetchTeamData}
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