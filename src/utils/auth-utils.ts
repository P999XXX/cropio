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

export const uploadDocuments = async (email: string, files: File[]): Promise<File[]> => {
  const uploadedFiles: File[] = [];

  for (const file of files) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${email}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('company_documents')
        .upload(fileName, file);
      
      if (uploadError) {
        console.error("Upload error:", uploadError);
        continue;
      }
      
      uploadedFiles.push(file);
    } catch (error) {
      console.error("File upload error:", error);
    }
  }

  return uploadedFiles;
};

export const createUserAccount = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  role: string;
}) => {
  const { error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        company_name: userData.companyName,
        role: userData.role,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return true;
};