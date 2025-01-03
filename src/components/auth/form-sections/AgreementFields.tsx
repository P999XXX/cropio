import { UseFormReturn } from "react-hook-form";
import AgreementCheckbox from "../AgreementCheckbox";
import { StepTwoFormData } from "../schemas/stepTwoSchema";

interface AgreementFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
}

const AgreementFields = ({ form }: AgreementFieldsProps) => {
  return (
    <div className="space-y-2 pt-[15px] pl-[5px]">
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