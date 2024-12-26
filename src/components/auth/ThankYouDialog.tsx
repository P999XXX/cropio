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
import { ArrowLeft } from "lucide-react";

interface ThankYouDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
}

const ThankYouDialog = ({ open, onOpenChange, userEmail }: ThankYouDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-[1.3rem] font-semibold">Thank you for signing up!</DialogTitle>
          <DialogDescription className="pt-4 space-y-3">
            <p>
              We've sent a confirmation email to <span className="font-medium">{userEmail}</span>.
            </p>
            <p>
              Please check your inbox and click the verification link to activate your account.
              If you don't see the email, please check your spam folder.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/signin")}
            className="w-full sm:w-auto"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto"
          >
            Back to Homepage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouDialog;