import { supabase } from "@/integrations/supabase/client";

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') {
      console.error("Email check error:", error);
      return false;
    }
    return !!data;
  } catch (error) {
    console.error("Email validation error:", error);
    return false;
  }
};