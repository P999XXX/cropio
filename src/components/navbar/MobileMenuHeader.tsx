import { Logo } from "./Logo";
import { X } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const MobileMenuHeader = () => {
  return (
    <div className="sticky top-0 z-50 bg-background border-b border-border px-4 flex items-center justify-between h-header">
      <Logo />
      <SheetClose asChild>
        <Button 
          variant="ghost" 
          className="shadow-none !p-0 !w-auto !h-auto hover:bg-transparent hover:text-[#000000]"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </SheetClose>
    </div>
  );
};