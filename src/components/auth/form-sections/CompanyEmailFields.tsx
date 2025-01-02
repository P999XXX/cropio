import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../schemas/stepTwoSchema";
import FormInput from "@/components/forms/FormInput";

interface CompanyEmailFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
}

const CompanyEmailFields = ({ form }: CompanyEmailFieldsProps) => {
  return (
    <div className="space-y-3">
      <FormInput
        form={form}
        name="companyName"
        label="Company Name"
        placeholder="Enter your company name"
      />

      <FormInput
        form={form}
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
    </div>
  );
};

export default CompanyEmailFields;