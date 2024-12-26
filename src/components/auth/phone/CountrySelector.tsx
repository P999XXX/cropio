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

interface CountrySelectorProps {
  form: UseFormReturn<StepTwoFormData>;
  onCountryChange: (countryCode: CountryCode) => void;
  selectedCountry: typeof countries[0] | undefined;
}

const CountrySelector = ({ form, onCountryChange, selectedCountry }: CountrySelectorProps) => {
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