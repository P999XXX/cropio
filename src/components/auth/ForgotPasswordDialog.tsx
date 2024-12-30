import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-[1.3rem] font-semibold">Reset Password</DialogTitle>
          <DialogDescription className="pt-4">
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
              className="h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:justify-end">
          <Button 
            onClick={onSubmit}
            disabled={isResetting}
            variant="primary"
            className="order-1 sm:order-2 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isResetting ? "Sending..." : "Send Instructions"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isResetting}
            className="order-2 sm:order-1 w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;