import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowRight } from "lucide-react";
import FormInput from "@/components/forms/FormInput";
import { useSignupStore } from "@/store/signupStore";
import DocumentUpload from "./form-sections/DocumentUpload";
import { toast } from "sonner";
import { checkEmailExists } from "@/utils/validation";
import { errorToastStyle } from "@/utils/toast-styles";
import { supabase } from "@/integrations/supabase/client";

const stepFiveSchema = z.object({
  vatNumber: z.string().min(1, "VAT number is required"),
  taxNumber: z.string().min(1, "Tax number is required"),
  documents: z.array(z.any()).optional(),
});

export type StepFiveFormData = z.infer<typeof stepFiveSchema>;

interface StepFiveFormProps {
  onSubmit: (values: StepFiveFormData) => void;
  onBack: () => void;
  isLoading: boolean;
}

const StepFiveForm = ({ onSubmit, onBack, isLoading }: StepFiveFormProps) => {
  const { formData, updateFormData } = useSignupStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<StepFiveFormData>({
    resolver: zodResolver(stepFiveSchema),
    defaultValues: {
      vatNumber: formData.vatNumber || "",
      taxNumber: formData.taxNumber || "",
      documents: [],
    },
  });

  const handleSubmit = async (values: StepFiveFormData) => {
    try {
      setIsUploading(true);
      
      // Check if email exists before proceeding
      const emailExists = await checkEmailExists(formData.email || '');
      
      if (emailExists) {
        toast.error("This email is already registered", {
          ...errorToastStyle,
          position: "top-center",
        });
        return;
      }

      // Upload files if present
      const uploadedFiles = [];
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${formData.email}/${crypto.randomUUID()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('company_documents')
            .upload(fileName, file);
          
          if (uploadError) {
            console.error("Upload error:", uploadError);
            toast.error("Failed to upload document", {
              ...errorToastStyle,
              position: "top-center",
            });
            return;
          }
          
          uploadedFiles.push(fileName);
        }
      }

      updateFormData({ ...values, documents: uploadedFiles });
      onSubmit({ ...values, documents: uploadedFiles });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred during registration", {
        ...errorToastStyle,
        position: "top-center",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="space-y-4">
          <FormInput
            form={form}
            name="vatNumber"
            label="VAT Number"
            placeholder="Enter VAT number"
          />

          <FormInput
            form={form}
            name="taxNumber"
            label="Tax Number"
            placeholder="Enter tax number"
          />

          <DocumentUpload
            form={form}
            selectedFiles={selectedFiles}
            onFileChange={(e) => {
              const files = Array.from(e.target.files || []);
              setSelectedFiles(files);
              form.setValue('documents', files);
            }}
            onRemoveFile={(index) => {
              const newFiles = selectedFiles.filter((_, i) => i !== index);
              setSelectedFiles(newFiles);
              form.setValue('documents', newFiles);
            }}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row-reverse sm:gap-3 mt-6">
          <Button 
            type="submit" 
            variant="primary"
            className="w-full text-[0.775rem]"
            disabled={isLoading || isUploading}
          >
            {isLoading || isUploading ? "Creating account..." : "Complete Registration"}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full text-[0.775rem]"
            onClick={onBack}
            disabled={isLoading}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepFiveForm;