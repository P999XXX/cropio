import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
            <p>
              Please check your inbox and spam folder.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            onClick={() => navigate("/")}
            className="dialog-button-primary w-full sm:w-auto"
          >
            Back to Homepage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordThankYouDialog;