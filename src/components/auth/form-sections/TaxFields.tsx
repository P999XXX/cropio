import FormInput from "@/components/forms/FormInput";
import { UseFormReturn } from "react-hook-form";
import { StepFourFormData } from "../StepFourForm";

interface TaxFieldsProps {
  form: UseFormReturn<StepFourFormData>;
}

const TaxFields = ({ form }: TaxFieldsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormInput
        form={form}
        name="vatNumber"
        label="VAT Number"
        placeholder="Enter VAT number"
      />
      <FormInput
        form={form}
        name="taxNumber"
        label="Tax Number"
        placeholder="Enter tax number"
      />
    </div>
  );
};

export default TaxFields;