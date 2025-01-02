import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CountryOption } from "./countries";
import CountryDisplay from "./CountryDisplay";

interface MobileCountryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCountries: CountryOption[];
  selectedValue?: string;
  onSelect: (country: string) => void;
  title?: string;
}

const MobileCountryDialog = ({
  isOpen,
  onOpenChange,
  searchQuery,
  onSearchChange,
  filteredCountries,
  selectedValue,
  onSelect,
  title = "Select Country"
}: MobileCountryDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="h-[100dvh] max-w-full p-0 gap-0 border-none">
        <DialogHeader className="px-4 py-2 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base">{title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Input
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 auth-input"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 h-[calc(100dvh-120px)]">
          <div className="p-2">
            {filteredCountries.map((country) => (
              <div
                key={`${country.country}-${country.value}`}
                className={`flex items-center px-2 py-3 cursor-pointer rounded-md text-sm text-foreground
                  ${selectedValue === country.country ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                onClick={() => onSelect(country.country)}
              >
                <CountryDisplay country={country} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MobileCountryDialog;