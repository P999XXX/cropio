import { ButtonsSection } from "@/components/design-system/ButtonsSection";
import { TypographySection } from "@/components/design-system/TypographySection";
import { ColorsSection } from "@/components/design-system/ColorsSection";

const Components = () => {
  return (
    <div className="container py-8 space-y-12">
      <h1 className="text-3xl font-bold">Components</h1>
      <ColorsSection />
      <TypographySection />
      <ButtonsSection />
    </div>
  );
};

export default Components;