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
import { useState, useEffect } from "react";
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
  const [countdown, setCountdown] = useState(0);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => setCountdown(0);
  }, []);

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
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });

      if (resetError) {
        // Parse error body to check for rate limit
        let errorBody;
        try {
          errorBody = JSON.parse(resetError.message);
        } catch {
          try {
            errorBody = JSON.parse((resetError as any)?.body || '{}');
          } catch {
            errorBody = {};
          }
        }

        // Check if it's a rate limit error
        if (errorBody.code === 'over_email_send_rate_limit' || resetError.status === 429) {
          // Extract wait time from error message if available
          const waitTimeMatch = errorBody.message?.match(/(\d+)\s*seconds/);
          const waitTime = waitTimeMatch ? parseInt(waitTimeMatch[1]) : 60;
          
          setCountdown(waitTime);
          
          // Start countdown timer
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          setError(`Too many attempts. Please wait ${waitTime} seconds before trying again.`);
          return;
        }

        setError(resetError.message);
        return;
      }

      await onSubmit();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Reset password error:", error);
      setError(error.message || "An unexpected error occurred");
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
              }}
              className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {error && (
              <Alert variant="destructive" className="border-2 border-destructive/20 bg-destructive/10 dark:bg-destructive/20 shadow-sm">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="ml-2 text-destructive font-medium">
                  {error}
                  {countdown > 0 && (
                    <span className="block mt-1">
                      Time remaining: {countdown} seconds
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3 sm:flex-row sm:justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isResetting || countdown > 0}
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