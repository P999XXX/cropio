import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ResetPasswordThankYouDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
}

const ResetPasswordThankYouDialog = ({ open, onOpenChange, userEmail }: ResetPasswordThankYouDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-content sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">Email Sent!</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1.5">
            <p>
              We've sent password reset instructions to <span className="font-medium text-foreground">{userEmail}</span>.
            </p>
            <p className="mt-2">
              Please check your inbox and spam folder.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => navigate("/")}
            variant="primary"
            className="w-fit"
          >
            Back to Homepage
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordThankYouDialog;