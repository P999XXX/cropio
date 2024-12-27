import { FormLabel as BaseFormLabel } from "@/components/ui/form";

interface FormLabelProps {
  children: React.ReactNode;
}

const FormLabel = ({ children }: FormLabelProps) => {
  return (
    <BaseFormLabel className="!text-foreground">
      {children}
    </BaseFormLabel>
  );
};

export default FormLabel;