import FormInput from "@/components/forms/FormInput";
import { UseFormReturn } from "react-hook-form";
import { StepFiveFormData } from "../StepFiveForm";

interface TaxFieldsProps {
  form: UseFormReturn<StepFiveFormData>;
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