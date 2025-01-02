import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { countries } from "../phone/countries";
import ReactCountryFlag from "react-country-flag";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CountryDisplay from "../phone/CountryDisplay";

interface CountrySelectProps {
  form: UseFormReturn<any>;
}

const CountrySelect = ({ form }: CountrySelectProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countries.filter(country => 
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('detect-country');
        
        if (error) throw error;
        
        if (data?.country) {
          const countryCode = data.country;
          const country = countries.find(c => c.country === countryCode);
          if (country) {
            form.setValue('companyCountry', countryCode);
            // Also set the phone country code when country is detected
            form.setValue('countryCode', country.value);
          }
        }
      } catch (error) {
        console.debug('Could not detect country, using default:', error);
        const defaultCountry = countries.find(c => c.country === 'DE');
        if (defaultCountry) {
          form.setValue('companyCountry', 'DE');
          form.setValue('countryCode', defaultCountry.value);
        }
      }
    };

    detectCountry();
  }, [form]);

  const handleCountrySelect = (countryCode: string) => {
    form.setValue('companyCountry', countryCode);
    // Also update the phone country code when country is selected
    const country = countries.find(c => c.country === countryCode);
    if (country) {
      form.setValue('countryCode', country.value);
    }
    setIsOpen(false);
  };

  const selectedCountry = countries.find(
    country => country.country === form.watch("companyCountry")
  );

  if (isMobile) {
    return (
      <FormField
        control={form.control}
        name="companyCountry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <div
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer auth-input"
              onClick={() => setIsOpen(true)}
            >
              {selectedCountry ? (
                <div className="flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode={selectedCountry.country}
                    svg
                    style={{
                      width: '1.2em',
                      height: '1.2em',
                    }}
                  />
                  {selectedCountry.label}
                </div>
              ) : (
                <span>Select country</span>
              )}
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="h-[100dvh] max-w-full p-0 gap-0">
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
                        <div className="flex items-center gap-2">
                          <ReactCountryFlag
                            countryCode={country.country}
                            svg
                            style={{
                              width: '1.2em',
                              height: '1.2em',
                            }}
                          />
                          {country.label}
                        </div>
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
          <FormLabel>Country</FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              const country = countries.find(c => c.country === value);
              if (country) {
                form.setValue('countryCode', country.value);
              }
            }}
            value={field.value}
          >
            <SelectTrigger className="auth-input">
              <SelectValue>
                {selectedCountry && (
                  <div className="flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={selectedCountry.country}
                      svg
                      style={{
                        width: '1.2em',
                        height: '1.2em',
                      }}
                    />
                    {selectedCountry.label}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-background min-w-[280px]">
              <ScrollArea className="h-[300px]">
                {countries.map((country) => (
                  <SelectItem 
                    key={country.country} 
                    value={country.country}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ReactCountryFlag
                        countryCode={country.country}
                        svg
                        style={{
                          width: '1.2em',
                          height: '1.2em',
                        }}
                      />
                      {country.label}
                    </div>
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default CountrySelect;