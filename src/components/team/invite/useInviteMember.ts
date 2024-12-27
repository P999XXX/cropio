import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InviteFormData } from "./InviteForm";

export const useInviteMember = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: InviteFormData) => {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) {
        throw new Error("Authentication error: " + authError.message);
      }

      if (!authData.user) {
        throw new Error("No authenticated user found");
      }

      // Check if this is the first team member
      const { data: existingMembers, error: checkError } = await supabase
        .from("team_members")
        .select("id")
        .eq("status", "accepted")
        .limit(1);

      if (checkError) {
        throw new Error("Failed to check existing members: " + checkError.message);
      }

      const isFirstMember = !existingMembers || existingMembers.length === 0;

      const { error: insertError } = await supabase.from("team_members").insert({
        email: values.email,
        role: isFirstMember ? "administrator" : values.role,
        invited_by: authData.user.id,
        profile_id: authData.user.id,
        status: isFirstMember ? "accepted" : "pending",
      });

      if (insertError) {
        console.error("Insert error:", insertError);
        if (insertError.code === "42501") {
          throw new Error("You don't have permission to invite team members.");
        }
        throw new Error("Failed to create team member: " + insertError.message);
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Team member invited successfully");
      onSuccess();
    },
    onError: (error: Error) => {
      console.error("Error inviting team member:", error);
      toast.error(error.message);
    },
  });
};