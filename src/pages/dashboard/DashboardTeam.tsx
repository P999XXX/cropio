import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeamMembersTable } from "@/components/team/TeamMembersTable";
import { InviteMemberDialog } from "@/components/team/InviteMemberDialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { TeamMember } from "@/types/team";
import { toast } from "sonner";

const DashboardTeam = () => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) {
        throw new Error("Authentication error: " + authError.message);
      }
      if (!authData.user) {
        throw new Error("No authenticated user found");
      }

      const { data, error: queryError } = await supabase
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
        .order('created_at', { ascending: false })
        .throwOnError();

      if (queryError) {
        throw new Error("Failed to fetch team members: " + queryError.message);
      }

      return data as TeamMember[];
    },
    retry: 1, // Allow one retry
    retryDelay: 1000, // Wait 1 second before retrying
    staleTime: 1000 * 60, // Cache for 1 minute
    meta: {
      onError: (error: Error) => {
        console.error("Team members fetch error:", error);
        toast.error("Failed to load team members. Please try again.");
      }
    }
  });

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
        teamMembers={teamMembers || []} 
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