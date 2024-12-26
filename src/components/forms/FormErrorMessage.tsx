import { AlertTriangle } from "lucide-react";

interface FormErrorMessageProps {
  message?: string;
}

const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  if (!message) return null;
  
  return (
    <div className="form-error">
      <AlertTriangle className="h-3 w-3" />
      {message}
    </div>
  );
};

export default FormErrorMessage;