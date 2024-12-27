import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { UserMenuTrigger } from "./user-menu/UserMenuTrigger";
import { UserProfileContent } from "./user-menu/UserProfileContent";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
    <div className="relative">
      <HoverCard 
        open={isOpen} 
        onOpenChange={setIsOpen}
        openDelay={0} 
        closeDelay={200}
      >
        <HoverCardTrigger asChild>
          <div 
            onClick={() => isMobile && setIsOpen(!isOpen)}
            className="cursor-pointer"
          >
            <UserMenuTrigger userInitials={userInitials} className={className} />
          </div>
        </HoverCardTrigger>
        <HoverCardContent 
          className="w-80 p-4" 
          align="end" 
          side="bottom" 
          sideOffset={5}
        >
          <UserProfileContent profile={profile} onLogout={handleLogout} />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};