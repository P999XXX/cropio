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
import { AlertCircle, Timer } from "lucide-react";
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
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          const newCount = prev - 1;
          if (newCount === 0) {
            setIsRateLimited(false);
          }
          return newCount;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

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

    if (isRateLimited) {
      setError(`Please wait ${countdown} seconds before requesting another reset email.`);
      return;
    }
    
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback#type=recovery`,
      });

      if (resetError) {
        console.error("Reset error:", resetError);
        
        // Check for rate limit errors in different formats
        const isRateLimit = 
          resetError.message.includes('rate limit') || 
          resetError.message.toLowerCase().includes('after') ||
          (resetError as any)?.status === 429 ||
          (resetError as any)?.body?.includes('over_email_send_rate_limit');

        if (isRateLimit) {
          // Extract wait time from error message if available
          const waitTimeMatch = resetError.message.match(/after (\d+) seconds/);
          const waitTime = waitTimeMatch ? parseInt(waitTimeMatch[1]) : 60;
          
          setCountdown(waitTime);
          setIsRateLimited(true);
          setError(`Please wait ${waitTime} seconds before requesting another reset email.`);
          return;
        }
        
        setError(resetError.message);
        return;
      }
      
      await onSubmit();
      setIsRateLimited(false);
      
    } catch (error: any) {
      console.error("Reset password error:", error);
      
      // Additional rate limit check for caught errors
      if (
        error.message?.includes('rate limit') || 
        error.status === 429 ||
        error.body?.includes('over_email_send_rate_limit')
      ) {
        setIsRateLimited(true);
        setCountdown(60); // Default to 60 seconds if no specific time is provided
        setError("Please wait before requesting another reset email.");
        return;
      }
      
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
              className={`h-10 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            />
            {error && (
              <Alert variant="destructive" className="border-2 border-destructive/20 bg-destructive/10 dark:bg-destructive/20 shadow-sm">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="ml-2 text-destructive font-medium">{error}</AlertDescription>
              </Alert>
            )}
            {isRateLimited && countdown > 0 && (
              <Alert className="border-2 border-warning/20 bg-warning/10 dark:bg-warning/20 shadow-sm">
                <Timer className="h-4 w-4 text-warning" />
                <AlertDescription className="ml-2 text-warning font-medium">
                  Please wait {countdown} seconds before requesting another reset email.
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