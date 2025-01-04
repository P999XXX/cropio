import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
      <DialogContent className="invite-member-dialog fixed right-0 top-0 h-full w-[375px] rounded-none border-l border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:right-0 sm:h-full sm:rounded-none md:right-0 lg:right-0 xl:right-0 2xl:right-0 max-sm:w-full max-sm:h-full translate-x-0">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold">
            Invite Team Member
          </DialogTitle>
          <DialogDescription className="text-[0.925rem] text-muted-foreground">
            Send an invitation to join your team. They'll receive an email with
            instructions.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <InviteForm 
            onSubmit={onSubmit}
            isLoading={isLoading}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};