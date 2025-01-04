import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeamMembersTable } from "@/components/team/TeamMembersTable";
import { InviteMemberDialog } from "@/components/team/invite/InviteMemberDialog";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { TeamMember } from "@/types/team";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const DashboardTeam = () => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.error("Session error:", error);
        navigate('/signin');
        return;
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/signin');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const { data: teamMembers = [], isLoading, error } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
          throw new Error("No active session");
        }

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
          throw fetchError;
        }

        return data as TeamMember[];
      } catch (error) {
        console.error("Error in team members query:", error);
        throw error;
      }
    },
    retry: 1,
    meta: {
      onError: (error: Error) => {
        console.error("Failed to fetch team members:", error);
        toast.error("Failed to load team members. Please try again later.");
      }
    }
  });

  return (
    <div className="team-management space-y-2 w-full px-1 lg:px-1">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 w-full h-auto">
        <div className="space-y-1">
          <h1 className="text-xl lg:text-2xl font-bold">Team Management</h1>
          <p className="text-muted-foreground text-[0.875rem]">
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