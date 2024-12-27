import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { UserMenuTrigger } from "./user-menu/UserMenuTrigger";
import { UserProfileContent } from "./user-menu/UserProfileContent";

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

export const UserMenu = ({ userInitials, className }: UserMenuProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      navigate('/');
    }
  };

  if (!userInitials) return null;
  
  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <Popover>
        <HoverCardTrigger asChild>
          <PopoverTrigger asChild>
            <UserMenuTrigger userInitials={userInitials} className={className} />
          </PopoverTrigger>
        </HoverCardTrigger>
        <HoverCardContent className="w-80" align="end" side="bottom">
          <UserProfileContent profile={profile} onLogout={handleLogout} />
        </HoverCardContent>
        <PopoverContent className="w-80" align="end">
          <UserProfileContent profile={profile} onLogout={handleLogout} />
        </PopoverContent>
      </Popover>
    </HoverCard>
  );
};