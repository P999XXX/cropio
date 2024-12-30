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
  userEmail?: string;  // Made optional
}

const ResetPasswordThankYouDialog = ({ 
  open, 
  onOpenChange, 
  userEmail = "your email" // Default fallback
}: ResetPasswordThankYouDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-[1.3rem] font-semibold">Password Updated!</DialogTitle>
          <DialogDescription className="pt-4 space-y-3">
            <p>
              Your password has been successfully updated for <span className="font-medium">{userEmail}</span>.
            </p>
            <p>
              You can now sign in with your new password.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            onClick={() => navigate("/signin")}
            className="w-full sm:w-auto"
          >
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordThankYouDialog;