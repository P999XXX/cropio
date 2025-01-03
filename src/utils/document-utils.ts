import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { errorToastStyle } from "@/utils/toast-styles";

export interface UploadedDocument {
  name: string;
  path: string;
  type: string;
  size: number;
}

export const uploadDocuments = async (userId: string, files: File[]): Promise<UploadedDocument[]> => {
  const uploadedFiles: UploadedDocument[] = [];
  
  for (const file of files) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('company_documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error("File upload error:", uploadError);
        toast.error(`Failed to upload ${file.name}`, errorToastStyle);
        continue;
      }

      uploadedFiles.push({
        name: file.name,
        path: fileName,
        type: file.type,
        size: file.size
      });
    } catch (error) {
      console.error("File upload error:", error);
      toast.error(`Error uploading ${file.name}`, errorToastStyle);
    }
  }

  return uploadedFiles;
};

export const updateProfileWithDocuments = async (
  userId: string, 
  vatNumber: string, 
  taxNumber: string, 
  documents: UploadedDocument[]
) => {
  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      vat_number: vatNumber,
      tax_number: taxNumber,
      company_documents: documents
    })
    .eq('id', userId);

  if (updateError) {
    console.error("Profile update error:", updateError);
    throw new Error("Failed to update profile with documents");
  }
};