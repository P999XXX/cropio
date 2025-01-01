import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";

interface MobileNavButtonProps {
  className?: string;
}

export const MobileNavButton = ({ className }: MobileNavButtonProps) => {
  return (
    <SheetTrigger asChild>
      <Button 
        variant="secondary" 
        size="icon"
        className={`h-8 w-8 md:h-9 md:w-9 lg:hidden text-foreground hover:text-foreground ${className}`}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </SheetTrigger>
  );
};