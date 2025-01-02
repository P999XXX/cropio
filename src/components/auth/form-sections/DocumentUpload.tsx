import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { StepFourFormData } from "../StepFourForm";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface DocumentUploadProps {
  form: UseFormReturn<StepFourFormData>;
  selectedFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

const DocumentUpload = ({ form, selectedFiles, onFileChange, onRemoveFile }: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 1) {
      alert("Please upload only one file");
      return;
    }

    const file = files[0];
    if (file.type !== "application/pdf") {
      alert("Please upload only PDF files");
      return;
    }

    const event = {
      target: {
        files: [file]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onFileChange(event);
  }, [onFileChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 1) {
      alert("Please upload only one file");
      return;
    }

    const file = files[0];
    if (file && file.type !== "application/pdf") {
      alert("Please upload only PDF files");
      return;
    }

    onFileChange(e);
  };

  return (
    <div className="space-y-2">
      <Label className="text-[0.775rem]">Company Documents</Label>
      <div
        className={cn(
          "border-2 border-dashed border-border rounded-lg p-4 transition-colors",
          isDragging && "border-primary bg-primary/5",
          "document-upload-container"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          accept=".pdf"
          className="hidden"
          id="company-documents"
          onChange={handleInputChange}
        />
        <label
          htmlFor="company-documents"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload className={cn(
            "h-8 w-8 mb-2",
            isDragging ? "text-primary" : "text-muted-foreground"
          )} />
          <span className={cn(
            "text-[0.875rem]",
            isDragging ? "text-primary" : "text-muted-foreground"
          )}>
            {isDragging 
              ? "Drop your PDF file here"
              : "Upload company document (VAT & Tax verification)"
            }
          </span>
          <span className="text-[0.775rem] text-muted-foreground mt-1">
            PDF only, up to 10MB
          </span>
        </label>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <Label className="text-[0.775rem]">Selected File:</Label>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span className="text-[0.875rem] truncate">{file.name}</span>
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