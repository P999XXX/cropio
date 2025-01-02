import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../StepTwoForm";
import PasswordInput from "../PasswordInput";

interface PasswordFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
}

const PasswordFields = ({ form }: PasswordFieldsProps) => {
  return (
    <div className="space-y-3">
      <PasswordInput
        form={form}
        name="password"
        label="Password"
        description="Password must be at least 8 characters and contain uppercase, lowercase, and numbers"
      />
      <PasswordInput
        form={form}
        name="confirmPassword"
        label="Confirm Password"
      />
    </div>
  );
};

export default PasswordFields;