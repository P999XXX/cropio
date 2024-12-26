import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import TeamMembersList from "@/components/team/TeamMembersList";
import InviteMemberDialog from "@/components/team/InviteMemberDialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useTeamData } from "@/hooks/useTeamData";

const TeamManagement = () => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const { isLoading, teamMembers, userTeam, refreshData } = useTeamData();

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
      await refreshData();
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
            onRemoveMember={refreshData}
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