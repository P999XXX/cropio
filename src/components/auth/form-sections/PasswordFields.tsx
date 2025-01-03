import { UseFormReturn } from "react-hook-form";
import PasswordInput from "../PasswordInput";
import { StepTwoFormData } from "../schemas/stepTwoSchema";

interface PasswordFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
}

const PasswordFields = ({ form }: PasswordFieldsProps) => {
  return (
    <div className="space-y-4">
      <PasswordInput
        form={form}
        name="password"
        label="Password"
        description={<span className="text-[0.675rem]">Password must be at least 8 characters and contain uppercase, lowercase, and numbers</span>}
        className="text-[0.875rem]"
      />
      <div className="mt-[3px] mb-[5px]">
        <PasswordInput
          form={form}
          name="confirmPassword"
          label="Confirm Password"
          className="text-[0.875rem]"
        />
      </div>
    </div>
  );
};

export default PasswordFields;