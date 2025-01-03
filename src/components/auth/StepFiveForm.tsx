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
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";
import { checkEmailExists, createUserAccount } from "@/utils/auth-utils";
import { uploadDocuments, updateProfileWithDocuments } from "@/utils/document-utils";

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
    if (!formData.email || !formData.password) {
      toast.error("Missing email or password", errorToastStyle);
      return;
    }

    setIsUploading(true);

    try {
      // Check if email exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        toast.error("This email is already registered", errorToastStyle);
        setIsUploading(false);
        return;
      }

      // Create user account first
      const { user } = await createUserAccount({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        companyName: formData.companyName || '',
        role: formData.role || 'buyer',
      });

      if (!user?.id) {
        throw new Error('Failed to create user account');
      }

      // Upload documents if any are selected
      let uploadedDocuments = [];
      if (selectedFiles.length > 0) {
        uploadedDocuments = await uploadDocuments(user.id, selectedFiles);
        
        if (uploadedDocuments.length === 0) {
          throw new Error('Failed to upload documents');
        }

        // Update profile with document references
        await updateProfileWithDocuments(
          user.id,
          values.vatNumber,
          values.taxNumber,
          uploadedDocuments
        );
      }

      // Update form data and submit
      const finalData = {
        ...values,
        documents: uploadedDocuments,
      };

      updateFormData(finalData);
      onSubmit(finalData);
      toast.success("Account created successfully!", successToastStyle);
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message || "An error occurred during registration", errorToastStyle);
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