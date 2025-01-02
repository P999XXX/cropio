import { ButtonsSection } from "@/components/design-system/ButtonsSection";
import { TypographySection } from "@/components/design-system/TypographySection";
import { ColorsSection } from "@/components/design-system/ColorsSection";
import { BadgesSection } from "@/components/design-system/BadgesSection";
import { CardsSection } from "@/components/design-system/CardsSection";
import { FormSection } from "@/components/design-system/FormSection";
import { AvatarsSection } from "@/components/design-system/AvatarsSection";
import { TableSection } from "@/components/design-system/TableSection";
import { AlertsSection } from "@/components/design-system/AlertsSection";
import { DialogsSection } from "@/components/design-system/DialogsSection";
import { TooltipsSection } from "@/components/design-system/TooltipsSection";
import { DropdownSection } from "@/components/design-system/DropdownSection";
import { TabsSection } from "@/components/design-system/TabsSection";
import { AccordionSection } from "@/components/design-system/AccordionSection";
import { PopoverSection } from "@/components/design-system/PopoverSection";
import { ScrollAreaSection } from "@/components/design-system/ScrollAreaSection";

const Components = () => {
  return (
    <div className="container py-8 space-y-12 mb-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Design System</h1>
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
      <AlertsSection />
      <DialogsSection />
      <TooltipsSection />
      <DropdownSection />
      <TabsSection />
      <AccordionSection />
      <PopoverSection />
      <ScrollAreaSection />
    </div>
  );
};

export default Components;