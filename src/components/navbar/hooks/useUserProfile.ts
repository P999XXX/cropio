import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useUserProfile = () => {
  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();

        if (profile) {
          const initials = `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`.toUpperCase();
          setUserInitials(initials || 'U');
        }
      } else {
        setUserInitials("");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserInitials("");
    }
  };

  return { userInitials };
};