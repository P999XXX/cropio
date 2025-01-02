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
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;
      
      await onSubmit();
      setIsRateLimited(false);
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred while resetting password";
      setError(errorMessage);
      
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
      <DialogContent className="dialog-content sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">Reset Password</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1.5">
            Enter your email address and we'll send you instructions to reset your password.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-2">
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-sm font-medium">Email</Label>
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
              className={`h-10 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            />
            {error && (
              <Alert variant="destructive" className="border-2 border-destructive/20 bg-destructive/10 dark:bg-destructive/20 shadow-sm">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="ml-2 text-destructive font-medium">{error}</AlertDescription>
              </Alert>
            )}
            {isRateLimited && (
              <Alert className="border-2 border-warning/20 bg-warning/10 dark:bg-warning/20 shadow-sm">
                <AlertCircle className="h-4 w-4 text-warning" />
                <AlertDescription className="ml-2 text-warning font-medium">
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