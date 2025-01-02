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

interface CountrySelectProps {
  form: UseFormReturn<any>;
}

const CountrySelect = ({ form }: CountrySelectProps) => {
  return (
    <FormField
      control={form.control}
      name="companyCountry"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <ScrollArea className="h-[200px]">
                {countries.map((country) => (
                  <SelectItem key={country.country} value={country.country}>
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