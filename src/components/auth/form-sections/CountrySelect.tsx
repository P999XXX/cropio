import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StepThreeFormData } from "../StepThreeForm";
import { countries } from "../phone/countries";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import CountryDisplay from "../phone/CountryDisplay";
import { supabase } from "@/integrations/supabase/client";
import MobileCountryDialog from "../phone/MobileCountryDialog";

interface CountrySelectProps {
  form: UseFormReturn<StepThreeFormData>;
}

const CountrySelect = ({ form }: CountrySelectProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('detect-country');
        
        if (error) throw error;
        
        if (data?.country && !form.getValues("companyCountry")) {
          const countryCode = data.country;
          form.setValue("companyCountry", countryCode);
        }
      } catch (error) {
        console.debug('Could not detect country, using default:', error);
      }
    };

    detectCountry();
  }, [form]);

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
                <CountryDisplay country={selectedCountry} showPrefix={false} />
              ) : (
                <span>Select a country</span>
              )}
            </div>
            <MobileCountryDialog
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredCountries={filteredCountries}
              selectedValue={field.value}
              onSelect={handleCountrySelect}
            />
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
                  key={`${country.country}-${country.value}`}
                  value={country.country}
                  className="text-[0.875rem]"
                >
                  <CountryDisplay country={country} showPrefix={false} />
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