import { ButtonsSection } from "@/components/design-system/ButtonsSection";
import { TypographySection } from "@/components/design-system/TypographySection";
import { ColorsSection } from "@/components/design-system/ColorsSection";
import { BadgesSection } from "@/components/design-system/BadgesSection";
import { CardsSection } from "@/components/design-system/CardsSection";
import { FormSection } from "@/components/design-system/FormSection";
import { AvatarsSection } from "@/components/design-system/AvatarsSection";
import { TableSection } from "@/components/design-system/TableSection";

const Components = () => {
  return (
    <div className="container py-8 space-y-12 mb-12">
      <div className="space-y-4">
        <h1>Design System</h1>
        <p className="text-muted-foreground">
          This page showcases all the components available in our design system.
        </p>
      </div>

      <ColorsSection />
      <TypographySection />
      <ButtonsSection />
      <BadgesSection />
      <CardsSection />
      <FormSection />
      <AvatarsSection />
      <TableSection />
    </div>
  );
};

export default Components;