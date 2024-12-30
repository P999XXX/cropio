import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InviteForm } from "./InviteForm";
import { useInviteMember } from "./useInviteMember";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteMemberDialog = ({
  open,
  onOpenChange,
}: InviteMemberDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const inviteMutation = useInviteMember(() => onOpenChange(false));

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await inviteMutation.mutateAsync(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-content sm:max-w-[500px] p-6 gap-6 bg-background border border-border">
        <DialogHeader className="space-y-3">
          <DialogTitle className="dialog-title">
            Invite Team Member
          </DialogTitle>
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