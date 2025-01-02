import { UseFormReturn } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import { StepTwoFormData } from "../validation/stepTwoSchema";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
}

const PersonalInfoFields = ({ form }: PersonalInfoFieldsProps) => {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <FormInput
        form={form}
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
      />
      <FormInput
        form={form}
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
      />
    </div>
  );
};

export default PersonalInfoFields;