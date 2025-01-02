import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../StepTwoForm";
import AgreementCheckbox from "../AgreementCheckbox";

interface AgreementFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
}

const AgreementFields = ({ form }: AgreementFieldsProps) => {
  return (
    <div className="space-y-2 mt-3">
      <AgreementCheckbox
        form={form}
        name="acceptTerms"
        linkText="Terms and Conditions"
        linkHref="/terms"
      />
      <AgreementCheckbox
        form={form}
        name="acceptPrivacy"
        linkText="Privacy Policy"
        linkHref="/privacy"
      />
    </div>
  );
};

export default AgreementFields;