import { FormLabel as BaseFormLabel } from "@/components/ui/form";

interface FormLabelProps {
  children: React.ReactNode;
}

const FormLabel = ({ children }: FormLabelProps) => {
  return (
    <BaseFormLabel>
      {children}
    </BaseFormLabel>
  );
};

export default FormLabel;