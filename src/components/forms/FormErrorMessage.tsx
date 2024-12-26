import { AlertTriangle } from "lucide-react";

interface FormErrorMessageProps {
  message?: string;
}

const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  if (!message) return null;
  
  return (
    <div className="text-[11px] text-destructive flex items-center gap-1">
      <AlertTriangle className="h-3 w-3" />
      <span>{message}</span>
    </div>
  );
};

export default FormErrorMessage;