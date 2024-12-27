import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const UserMenu = () => {
  const [isHoverCardOpen, setIsHoverCardOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Logged out successfully");
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div className="relative">
      <HoverCard open={isHoverCardOpen} onOpenChange={setIsHoverCardOpen}>
        <HoverCardTrigger asChild>
          <Button
            onClick={() => setIsHoverCardOpen(!isHoverCardOpen)}
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 rounded-full bg-primary/10"
          >
            <User className="h-4 w-4 text-primary" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent align="end" className="w-64 pt-2">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <div className="rounded-full bg-primary/10 p-1">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-medium">Company</span>
                <span className="text-xs text-muted-foreground">
                  Acme Corp
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-medium">Role</span>
                <span className="text-xs text-muted-foreground">
                  Administrator
                </span>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs w-fit justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 dark:hover:text-destructive dark:text-muted-foreground dark:hover:bg-destructive/10 bg-secondary/50 h-7"
                >
                  Log out
                  <LogOut className="h-3 w-3 ml-2" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be logged out of your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default UserMenu;