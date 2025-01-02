import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StepThreeFormData } from "../StepThreeForm";
import { countries } from "../phone/countries";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import CountryDisplay from "../phone/CountryDisplay";

interface CountrySelectProps {
  form: UseFormReturn<StepThreeFormData>;
}

const CountrySelect = ({ form }: CountrySelectProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countries.filter(country => 
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country: string) => {
    form.setValue("companyCountry", country);
    setIsOpen(false);
  };

  if (isMobile) {
    const selectedCountry = countries.find(c => c.country === form.watch("companyCountry"));

    return (
      <FormField
        control={form.control}
        name="companyCountry"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[0.775rem]">Country</FormLabel>
            <div
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer auth-input"
              onClick={() => setIsOpen(true)}
            >
              {selectedCountry ? (
                <CountryDisplay country={selectedCountry} />
              ) : (
                <span>Select a country</span>
              )}
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="h-[100dvh] max-w-full p-0 gap-0 border-none">
                <DialogHeader className="px-4 py-2 border-b sticky top-0 bg-background z-10">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-base">Select Country</DialogTitle>
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
                      className="pl-8 auth-input"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </DialogHeader>
                <ScrollArea className="flex-1 h-[calc(100dvh-120px)]">
                  <div className="p-2">
                    {filteredCountries.map((country) => (
                      <div
                        key={country.country}
                        className={`flex items-center px-2 py-3 cursor-pointer rounded-md text-sm text-foreground
                          ${field.value === country.country ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                        onClick={() => handleCountrySelect(country.country)}
                      >
                        <CountryDisplay country={country} />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={form.control}
      name="companyCountry"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[0.775rem]">Country</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="text-[0.875rem]">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem 
                  key={country.country} 
                  value={country.country}
                  className="text-[0.875rem]"
                >
                  <CountryDisplay country={country} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default CountrySelect;