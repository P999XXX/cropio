import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSignupStore } from "@/store/signupStore";
import TaxFields from "./form-sections/TaxFields";
import DocumentUpload from "./form-sections/DocumentUpload";
import { useState } from "react";
import { toast } from "sonner";
import { checkEmailExists } from "@/utils/validation";
import { errorToastStyle } from "@/utils/toast-styles";

const stepFiveSchema = z.object({
  vatNumber: z.string().min(1, "VAT number is required"),
  taxNumber: z.string().min(1, "Tax number is required"),
  documents: z.any(),
});

export type StepFiveFormData = z.infer<typeof stepFiveSchema>;

interface StepFiveFormProps {
  onSubmit: (values: StepFiveFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const StepFiveForm = ({ onSubmit, onBack, isLoading }: StepFiveFormProps) => {
  const { formData, updateFormData } = useSignupStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<StepFiveFormData>({
    resolver: zodResolver(stepFiveSchema),
    defaultValues: {
      vatNumber: formData.vatNumber || "",
      taxNumber: formData.taxNumber || "",
    },
  });

  const handleSubmit = async (values: StepFiveFormData) => {
    try {
      // Check if email exists before proceeding
      const emailExists = await checkEmailExists(formData.email || '');
      
      if (emailExists) {
        toast.error("This email is already registered", errorToastStyle);
        return;
      }

      updateFormData({ ...values, documents: selectedFiles });
      onSubmit({ ...values, documents: selectedFiles });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred during registration", errorToastStyle);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    form.setValue('documents', files);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    form.setValue('documents', newFiles);
  };

  return (
    <div className="space-y-6 pt-8 md:bg-card md:p-6 md:rounded-lg md:border md:border-border md:max-w-2xl md:mx-auto md:mt-8">
      <h3 className="text-lg font-semibold text-left md:text-center">Tax & Company Verification</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <TaxFields form={form} />
          
          <DocumentUpload
            form={form}
            selectedFiles={selectedFiles}
            onFileChange={handleFileChange}
            onRemoveFile={removeFile}
          />

          <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3 pt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="w-full text-[0.775rem]"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              className="w-full text-[0.775rem]"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Complete Registration"}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepFiveForm;