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
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [error, setError] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleSubmit = async () => {
    setError("");
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    try {
      await onSubmit();
      setIsRateLimited(false);
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred while resetting password";
      setError(errorMessage);
      
      // Check if it's a rate limit error from the error message or body
      if (
        errorMessage.includes('Too many reset attempts') || 
        (error.body && error.body.includes('over_email_send_rate_limit'))
      ) {
        setIsRateLimited(true);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-content">
        <DialogHeader>
          <DialogTitle className="dialog-title">Reset Password</DialogTitle>
          <DialogDescription className="dialog-description mb-3">
            Enter your email address and we'll send you instructions to reset your password.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-foreground text-sm font-medium">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                onEmailChange(e.target.value);
                setError("");
                setIsRateLimited(false);
              }}
              className={`flex h-10 w-full rounded-md border bg-secondary px-3 py-2 text-[0.775rem] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-destructive' : 'border-input'}`}
            />
            {error && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isRateLimited && (
              <Alert className="mt-2">
                <AlertDescription>
                  Please wait a few minutes before requesting another reset email.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3 sm:flex-row sm:justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isResetting || isRateLimited}
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