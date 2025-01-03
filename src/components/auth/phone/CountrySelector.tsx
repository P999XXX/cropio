import {
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StepThreeFormData } from "../StepThreeForm";
import { countries } from "./countries";
import { CountryCode } from 'libphonenumber-js';
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import CountryDisplay from "./CountryDisplay";
import MobileCountryDialog from "./MobileCountryDialog";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

interface CountrySelectorProps {
  form: UseFormReturn<StepThreeFormData>;
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
              className={`flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer auth-input ${
                form.formState.errors.countryCode ? 'border-destructive' : 'border-input'
              }`}
              onClick={() => setIsOpen(true)}
            >
              {selectedCountry ? (
                <CountryDisplay country={selectedCountry} showLabel={false} />
              ) : (
                <span>Select</span>
              )}
            </div>
            <FormErrorMessage message={form.formState.errors.countryCode?.message} />
            <MobileCountryDialog
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredCountries={filteredCountries}
              selectedValue={field.value}
              onSelect={handleCountrySelect}
              title="Select Country Code"
            />
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
            <SelectTrigger className={`h-10 auth-input ${form.formState.errors.countryCode ? 'border-destructive' : ''}`}>
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
              {countries.map((country) => (
                <SelectItem 
                  key={`${country.country}-${country.value}`}
                  value={country.value}
                  className="cursor-pointer text-sm text-foreground data-[highlighted]:text-foreground data-[highlighted]:bg-secondary"
                >
                  <CountryDisplay country={country} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormErrorMessage message={form.formState.errors.countryCode?.message} />
        </FormItem>
      )}
    />
  );
};

export default CountrySelector;