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
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError) throw new Error("Authentication error: " + authError.message);
        if (!authData.user) throw new Error("No authenticated user found");

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
          console.error("Error fetching team members:", fetchError);
          throw new Error(fetchError.message);
        }

        return data as TeamMember[];
      } catch (error) {
        console.error("Error in team members query:", error);
        throw error;
      }
    },
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch team members:", error);
        toast.error("Failed to load team members. Please try again later.");
      }
    }
  });

  return (
    <div className="team-management space-y-6 w-full px-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 w-full h-auto">
        <div className="space-y-1">
          <h1 className="text-xl lg:text-2xl font-bold">Team Management</h1>
          <p className="text-muted-foreground text-[0.775rem]">
            Manage your team members and their permissions
          </p>
        </div>
        <Button 
          variant="primary"
          onClick={() => setIsInviteDialogOpen(true)}
          className="flex items-center gap-2 w-full lg:w-auto text-[0.775rem] lg:h-fit lg:py-2"
        >
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <TeamMembersTable 
        teamMembers={teamMembers} 
        isLoading={isLoading}
        onInvite={() => setIsInviteDialogOpen(true)}
      />

      <InviteMemberDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
      />
    </div>
  );
};

export default DashboardTeam;