import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  company_name: string;
  role: string;
}

const UserMenuContent = ({ profile, onLogout }: { profile: UserProfile | null, onLogout: () => void }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">
        {profile?.first_name} {profile?.last_name}
      </h4>
      <p className="text-sm text-muted-foreground">
        {profile?.email}
      </p>
      <div className="text-sm text-muted-foreground">
        <p>{profile?.company_name}</p>
        <p className="capitalize">{profile?.role}</p>
      </div>
    </div>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="w-full justify-between text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 dark:hover:text-destructive dark:text-muted-foreground dark:hover:bg-destructive/10"
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
            onClick={onLogout}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
);

export default function UserMenu({ userInitials, className }: UserMenuProps) {
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
        .select('first_name, last_name, email, company_name, role')
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
      <Popover>
        <HoverCardTrigger asChild>
          <PopoverTrigger asChild>
            <Avatar className={className || "h-9 w-9 bg-[#9b87f5] hover:opacity-90 transition-opacity border border-border cursor-pointer"}>
              <AvatarFallback className="text-primary-foreground text-[11px] bg-transparent">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <UserMenuContent profile={profile} onLogout={handleLogout} />
        </HoverCardContent>
        <PopoverContent className="w-80">
          <UserMenuContent profile={profile} onLogout={handleLogout} />
        </PopoverContent>
      </Popover>
    </HoverCard>
  );
}