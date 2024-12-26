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
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [userTeam, setUserTeam] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/signin');
      return;
    }
    fetchTeamData(session.user.id);
  };

  const fetchTeamData = async (userId: string) => {
    try {
      setIsLoading(true);
      
      // Fetch user's team
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('created_by', userId)
        .single();

      if (teamError) {
        console.error('Error fetching team:', teamError);
        toast.error('Fehler beim Laden des Teams');
        return;
      }

      if (!teamData) {
        toast.error('Kein Team gefunden');
        return;
      }

      setUserTeam(teamData);

      // Fetch team members with their profiles
      const { data: members, error: membersError } = await supabase
        .from('team_members')
        .select(`
          *,
          profile:profiles(first_name, last_name, email)
        `)
        .eq('team_id', teamData.id);

      if (membersError) {
        console.error('Error fetching members:', membersError);
        toast.error('Fehler beim Laden der Teammitglieder');
        return;
      }

      setTeamMembers(members || []);
    } catch (error: any) {
      console.error('Error fetching team data:', error);
      toast.error('Ein Fehler ist aufgetreten');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteMember = async (email: string, role: 'admin' | 'member') => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Bitte melden Sie sich an');
        return;
      }

      if (!userTeam) {
        toast.error('Kein Team gefunden');
        return;
      }

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
        toast.error('Fehler beim Einladen des Mitglieds');
        return;
      }

      toast.success('Einladung erfolgreich gesendet');
      setShowInviteDialog(false);
      fetchTeamData(session.user.id);
    } catch (error: any) {
      console.error('Error inviting member:', error);
      toast.error('Fehler beim Einladen des Mitglieds');
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
              Verwalten Sie Ihre Teammitglieder und Einladungen
            </p>
          </div>
          <Button
            onClick={() => setShowInviteDialog(true)}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Mitglied einladen
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