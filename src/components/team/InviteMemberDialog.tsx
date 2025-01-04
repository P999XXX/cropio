import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { InviteForm, InviteFormData } from "./invite/InviteForm";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteMemberDialog = ({
  open,
  onOpenChange,
}: InviteMemberDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: InviteFormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw new Error("Authentication error: " + authError.message);
      if (!authData.user) throw new Error("No authenticated user found");

      const { error: insertError } = await supabase.from("team_members").insert({
        email: values.email,
        role: values.role,
        invited_by: authData.user.id,
        profile_id: authData.user.id,
        status: "pending",
        first_name: values.firstName,
        last_name: values.lastName,
      });

      if (insertError) {
        if (insertError.code === "42501") {
          throw new Error("You don't have permission to invite team members.");
        }
        throw new Error("Failed to create team member: " + insertError.message);
      }

      toast.success("Team member invited successfully");
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error inviting team member:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to join your team. They'll receive an email with
            instructions.
          </DialogDescription>
        </DialogHeader>

        <InviteForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};