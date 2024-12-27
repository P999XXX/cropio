import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UserMenuProps {
  userInitials: string;
  className?: string;
}

interface UserProfile {
  first_name: string | null;
  last_name: string | null;
  email: string;
}

export const UserMenu = ({ userInitials, className }: UserMenuProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('first_name, last_name, email')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setProfile(data);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!userInitials) return null;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className={className || "h-9 w-9 bg-[#9b87f5] hover:opacity-90 transition-opacity border border-border"}>
          <AvatarFallback className="text-primary-foreground text-[11px] bg-transparent">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">
              {profile?.first_name} {profile?.last_name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {profile?.email}
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-between text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200"
              >
                Log out
                <LogOut className="h-4 w-4 ml-2" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to log in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleLogout}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Log out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};