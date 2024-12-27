import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeamMembersTable } from "@/components/team/TeamMembersTable";
import { InviteMemberDialog } from "@/components/team/invite/InviteMemberDialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { TeamMember } from "@/types/team";
import { toast } from "sonner";

const DashboardTeam = () => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const { data: teamMembers = [], isLoading, error } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("team_members")
          .select(`
            id,
            profile_id,
            invited_by,
            role,
            email,
            status,
            created_at,
            profile:profiles!team_members_profile_id_fkey (
              first_name,
              last_name,
              email
            ),
            inviter:profiles!team_members_invited_by_fkey (
              first_name,
              last_name
            )
          `)
          .order('created_at', { ascending: false });

        if (fetchError) {
          console.error("Team members fetch error:", fetchError);
          throw new Error(fetchError.message);
        }

        return data as TeamMember[];
      } catch (err) {
        console.error("Team members fetch error:", err);
        throw err;
      }
    },
    retry: 1,
    retryDelay: 1000,
  });

  if (error) {
    toast.error("Failed to load team members");
  }

  return (
    <div className="team-management space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and their permissions
          </p>
        </div>
        <Button 
          onClick={() => setIsInviteDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <TeamMembersTable 
        teamMembers={teamMembers} 
        isLoading={isLoading} 
      />

      <InviteMemberDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
      />
    </div>
  );
};

export default DashboardTeam;