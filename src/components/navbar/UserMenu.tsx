import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
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
  <div className="flex flex-col space-y-4">
    <div className="flex items-start space-x-4">
      <Avatar className="h-10 w-10 bg-[#F1F0FB]">
        <AvatarFallback className="text-primary">
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">
          {profile?.first_name} {profile?.last_name}
        </h4>
        <p className="text-sm text-muted-foreground">
          {profile?.email}
        </p>
      </div>
    </div>
    <div className="border-t border-border pt-4 space-y-2">
      <div className="text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Company</span>
          <span className="font-medium">{profile?.company_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Role</span>
          <span className="font-medium capitalize">{profile?.role}</span>
        </div>
      </div>
    </div>
    <div className="flex justify-start">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onLogout}
        className="w-32 text-sm bg-[#F6F6F7] hover:bg-[#EAEAEB] text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <span className="flex-1 text-center">Sign out</span>
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

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
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
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
            <Avatar className={className || "h-9 w-9 bg-[#F1F0FB] hover:opacity-90 transition-opacity border border-border cursor-pointer"}>
              <AvatarFallback className="text-primary text-[11px] bg-transparent">
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
};