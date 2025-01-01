import { AlertCircle } from "lucide-react";

interface FormErrorMessageProps {
  message?: string;
  id?: string;
}

const FormErrorMessage = ({ message, id }: FormErrorMessageProps) => {
  if (!message) return null;
  
  return (
    <div 
      className="form-error" 
      role="alert"
      id={id}
    >
      <AlertCircle className="h-3.5 w-3.5 text-destructive" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};

export default FormErrorMessage;