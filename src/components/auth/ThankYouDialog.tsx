import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ThankYouDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
}

const ThankYouDialog = ({ open, onOpenChange, userEmail }: ThankYouDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-content">
        <DialogHeader>
          <DialogTitle className="dialog-title">Thank you for signing up!</DialogTitle>
          <DialogDescription className="dialog-description">
            <p>
              We've sent a confirmation email to <span className="font-medium">{userEmail}</span>.
            </p>
            <p className="mt-2">
              Please check your inbox and click the verification link to activate your account.
              If you don't see the email, please check your spam folder.
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

export default ThankYouDialog;