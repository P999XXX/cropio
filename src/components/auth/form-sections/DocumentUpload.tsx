import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { StepFourFormData } from "../StepFourForm";

interface DocumentUploadProps {
  form: UseFormReturn<StepFourFormData>;
  selectedFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

const DocumentUpload = ({ form, selectedFiles, onFileChange, onRemoveFile }: DocumentUploadProps) => {
  return (
    <div className="space-y-2">
      <Label>Company Documents</Label>
      <div className="border-2 border-dashed border-border rounded-lg p-4">
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          className="hidden"
          id="company-documents"
          onChange={onFileChange}
        />
        <label
          htmlFor="company-documents"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">
            Upload company documents (VAT & Tax verification)
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            PDF, DOC, DOCX up to 10MB each
          </span>
        </label>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <Label>Selected Files:</Label>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;