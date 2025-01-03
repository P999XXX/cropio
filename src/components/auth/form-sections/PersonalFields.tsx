import { UseFormReturn } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import { StepTwoFormData } from "../schemas/stepTwoSchema";
import { AlertCircle } from "lucide-react";

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
          <div className="text-destructive-foreground bg-destructive/20 text-[11px] mt-1 flex items-center gap-1 px-2 py-1 rounded">
            <AlertCircle className="h-3.5 w-3.5 text-destructive-foreground" />
            This email is already registered
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalFields;