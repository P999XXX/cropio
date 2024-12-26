import {
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../StepTwoForm";
import { countries } from "./countries";
import CountryDisplay from "./CountryDisplay";
import { CountryCode } from 'libphonenumber-js';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CountrySelectorProps {
  form: UseFormReturn<StepTwoFormData>;
  onCountryChange: (countryCode: CountryCode) => void;
  selectedCountry: typeof countries[0] | undefined;
}

const CountrySelector = ({ form, onCountryChange, selectedCountry }: CountrySelectorProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countries.filter(country => 
    country.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (value: string) => {
    form.setValue("countryCode", value);
    const country = countries.find(c => c.value === value);
    if (country) {
      onCountryChange(country.country as CountryCode);
    }
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <FormField
        control={form.control}
        name="countryCode"
        render={({ field }) => (
          <FormItem className="w-[110px] shrink-0">
            <div
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              {selectedCountry ? (
                <CountryDisplay country={selectedCountry} showLabel={false} />
              ) : (
                <span>Select</span>
              )}
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="h-[100dvh] max-w-full p-0 gap-0">
                <DialogHeader className="px-4 py-2 border-b sticky top-0 bg-background z-10">
                  <div className="flex items-center justify-between">
                    <DialogTitle>Select Country</DialogTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Search countries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </DialogHeader>
                <ScrollArea className="flex-1 h-[calc(100dvh-120px)]">
                  <div className="p-2">
                    {filteredCountries.map((country) => (
                      <div
                        key={country.value}
                        className="flex items-center px-2 py-3 cursor-pointer hover:bg-muted rounded-md"
                        onClick={() => handleCountrySelect(country.value)}
                      >
                        <CountryDisplay country={country} />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <FormMessage className="text-xs text-destructive" />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={form.control}
      name="countryCode"
      render={({ field }) => (
        <FormItem className="w-[110px] shrink-0">
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              const country = countries.find(c => c.value === value);
              if (country) {
                onCountryChange(country.country as CountryCode);
              }
            }} 
            value={field.value}
          >
            <SelectTrigger className="h-10">
              <SelectValue>
                {selectedCountry && (
                  <CountryDisplay 
                    country={selectedCountry} 
                    showLabel={false}
                  />
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-background min-w-[280px]">
              <ScrollArea className="h-[300px]">
                {countries.map((country) => (
                  <SelectItem 
                    key={country.value} 
                    value={country.value}
                    className="cursor-pointer"
                  >
                    <CountryDisplay country={country} />
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          <FormMessage className="text-xs text-destructive" />
        </FormItem>
      )}
    />
  );
};

export default CountrySelector;