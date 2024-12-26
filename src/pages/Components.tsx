import { ButtonsSection } from "@/components/design-system/ButtonsSection";
import { CardsSection } from "@/components/design-system/CardsSection";
import { FormSection } from "@/components/design-system/FormSection";
import { BadgesSection } from "@/components/design-system/BadgesSection";
import { AvatarsSection } from "@/components/design-system/AvatarsSection";
import { TypographySection } from "@/components/design-system/TypographySection";
import { TableSection } from "@/components/design-system/TableSection";

const Components = () => {
  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Design System Components</h1>
        <p className="text-muted-foreground">A collection of all UI components used in the application.</p>
      </div>

      <TypographySection />
      <ButtonsSection />
      <CardsSection />
      <FormSection />
      <BadgesSection />
      <AvatarsSection />
      <TableSection />
    </div>
  );
};

export default Components;