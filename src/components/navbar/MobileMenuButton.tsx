import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";

export const MobileMenuButton = () => {
  return (
    <SheetTrigger asChild>
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden p-0 hover:bg-transparent"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </SheetTrigger>
  );
};