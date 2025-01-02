import { UseFormReturn } from "react-hook-form";
import AgreementCheckbox from "../AgreementCheckbox";
import { StepTwoFormData } from "../validation/stepTwoSchema";

interface AgreementSectionProps {
  form: UseFormReturn<StepTwoFormData>;
}

const AgreementSection = ({ form }: AgreementSectionProps) => {
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

export default AgreementSection;