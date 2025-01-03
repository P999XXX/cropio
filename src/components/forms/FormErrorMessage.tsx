import { AlertCircle } from "lucide-react";

interface FormErrorMessageProps {
  message?: string;
}

const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  if (!message) return null;
  
  return (
    <div className="text-destructive-foreground bg-destructive/20 text-[11px] mt-1 flex items-center gap-1 px-2 py-1 rounded">
      <AlertCircle className="h-3.5 w-3.5 text-destructive-foreground" />
      {message}
    </div>
  );
};

export default FormErrorMessage;