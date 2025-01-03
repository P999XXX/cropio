import { supabase } from "@/integrations/supabase/client";

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      }
    });
    
    // If there's no error and data exists, the email is already registered
    return error ? false : true;
  } catch (error) {
    console.error("Error checking email:", error);
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