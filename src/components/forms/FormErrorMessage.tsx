import { AlertTriangle } from "lucide-react";

interface FormErrorMessageProps {
  message?: string;
}

const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  if (!message) return null;
  
  return (
    <div className="form-error">
      <div className="bg-[#f9ef16] rounded-full p-0.5">
        <AlertTriangle className="h-3.5 w-3.5 text-foreground" />
      </div>
      {message}
    </div>
  );
};

export default FormErrorMessage;