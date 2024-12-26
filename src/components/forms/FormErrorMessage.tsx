import { AlertCircle } from "lucide-react";

interface FormErrorMessageProps {
  message?: string;
}

const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  if (!message) return null;
  
  return (
    <div className="form-error">
      <AlertCircle className="h-4 w-4 text-destructive" />
      {message}
    </div>
  );
};

export default FormErrorMessage;