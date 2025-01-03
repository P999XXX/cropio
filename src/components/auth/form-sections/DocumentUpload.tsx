import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, FileIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { StepFiveFormData } from "../StepFiveForm";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface DocumentUploadProps {
  form: UseFormReturn<StepFiveFormData>;
  selectedFiles: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

const DocumentUpload = ({ form, selectedFiles, onFileChange, onRemoveFile }: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pdfPreviews, setPdfPreviews] = useState<string[]>([]);

  useEffect(() => {
    // Create object URLs for PDF previews
    const previews = selectedFiles.map(file => URL.createObjectURL(file));
    setPdfPreviews(previews);

    // Cleanup
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [selectedFiles]);

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
    <div className="space-y-2 document-upload">
      <div className="space-y-1">
        <Label className="text-[0.775rem]">Company Verification</Label>
        <p className="text-[0.675rem] text-muted-foreground">
          Please upload max. 2 documents showing your VAT and TAX numbers. These can be official extracts, customer invoices, purchase invoices, or similar documents that clearly display these numbers for validte you company.
        </p>
      </div>
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
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-4 w-4 text-primary" />
                      <span className="text-[0.875rem] truncate">{file.name}</span>
                    </div>
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
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-0">
                  <object
                    data={pdfPreviews[index]}
                    type="application/pdf"
                    width="100%"
                    height="200px"
                    className="rounded-md"
                  >
                    <p>PDF preview not available</p>
                  </object>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;