import { UseFormReturn } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import { StepTwoFormData } from "../StepTwoForm";

interface PersonalFieldsProps {
  form: UseFormReturn<StepTwoFormData>;
  emailExists: boolean;
}

const PersonalFields = ({ form, emailExists }: PersonalFieldsProps) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          form={form}
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          className="text-[0.875rem]"
        />
        <FormInput
          form={form}
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          className="text-[0.875rem]"
        />
      </div>

      <div className="space-y-1">
        <FormInput
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          className="text-[0.875rem]"
        />
        {emailExists && (
          <p className="text-destructive-foreground text-[0.775rem] mt-1">
            This email is already registered
          </p>
        )}
      </div>
    </>
  );
};

export default PersonalFields;