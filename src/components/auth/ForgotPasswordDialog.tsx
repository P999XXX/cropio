import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => Promise<void>;
  email: string;
  onEmailChange: (email: string) => void;
  isResetting: boolean;
}

const ForgotPasswordDialog = ({
  open,
  onOpenChange,
  onSubmit,
  email,
  onEmailChange,
  isResetting,
}: ForgotPasswordDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-content">
        <DialogHeader>
          <DialogTitle className="dialog-title">Reset Password</DialogTitle>
          <DialogDescription className="dialog-description">
            Enter your email address and we'll send you instructions to reset your password.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-foreground text-sm font-medium">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="dialog-input"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:justify-end">
          <Button 
            onClick={onSubmit}
            disabled={isResetting}
            variant="primary"
            className="order-1 sm:order-2 w-full sm:w-auto"
          >
            {isResetting ? "Sending..." : "Send Instructions"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isResetting}
            className="order-2 sm:order-1 w-full sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;