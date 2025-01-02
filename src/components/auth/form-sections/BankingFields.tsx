import FormInput from "@/components/forms/FormInput";
import { UseFormReturn } from "react-hook-form";
import { StepFourFormData } from "../StepFourForm";

interface BankingFieldsProps {
  form: UseFormReturn<StepFourFormData>;
}

const BankingFields = ({ form }: BankingFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormInput
        form={form}
        name="bankName"
        label="Bank Name"
        placeholder="Enter bank name"
        className="w-full"
      />
      <FormInput
        form={form}
        name="bankAddress"
        label="Bank Address"
        placeholder="Enter bank address"
        className="w-full"
      />
      <FormInput
        form={form}
        name="bankAccountHolder"
        label="Account Holder"
        placeholder="Enter account holder name"
      />
      <FormInput
        form={form}
        name="iban"
        label="IBAN"
        placeholder="Enter IBAN number"
        className="w-full"
      />
      <FormInput
        form={form}
        name="bic"
        label="BIC/SWIFT"
        placeholder="Enter BIC/SWIFT code"
        className="w-full"
      />
    </div>
  );
};

export default BankingFields;