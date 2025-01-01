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
      <DialogContent className="dialog-content">
        <DialogHeader>
          <DialogTitle className="dialog-title">Email Sent!</DialogTitle>
          <DialogDescription className="dialog-description">
            <p>
              We've sent password reset instructions to <span className="font-medium">{userEmail}</span>.
            </p>
            <p className="mt-2">
              Please check your inbox and spam folder.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:justify-end">
          <Button
            onClick={() => navigate("/")}
            className="dialog-button-primary"
          >
            Back to Homepage
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordThankYouDialog;