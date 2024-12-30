import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { InviteForm, InviteFormData } from "./InviteForm";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteMemberDialog = ({
  open,
  onOpenChange,
}: InviteMemberDialogProps) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const inviteMutation = useMutation({
    mutationFn: async (values: InviteFormData) => {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) {
        throw new Error("Authentication error: " + authError.message);
      }

      if (!authData.user) {
        throw new Error("No authenticated user found");
      }

      const { error: insertError } = await supabase.from("team_members").insert({
        email: values.email,
        role: values.role,
        invited_by: authData.user.id,
        profile_id: authData.user.id,
        status: "pending",
      });

      if (insertError) {
        throw new Error("Failed to create team member: " + insertError.message);
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Team member invited successfully");
      onOpenChange(false);
    },
    onError: (error: Error) => {
      console.error("Error inviting team member:", error);
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: InviteFormData) => {
    setIsLoading(true);
    try {
      await inviteMutation.mutateAsync(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-content">
        <DialogHeader>
          <DialogTitle className="dialog-title">Invite Team Member</DialogTitle>
          <DialogDescription className="dialog-description">
            Send an invitation to join your team. They'll receive an email with
            instructions.
          </DialogDescription>
        </DialogHeader>

        <InviteForm 
          onSubmit={onSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};