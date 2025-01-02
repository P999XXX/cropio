import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StepThreeFormData } from "../StepThreeForm";
import { countries } from "../phone/countries";
import FormInput from "@/components/forms/FormInput";

interface CountrySelectProps {
  form: UseFormReturn<StepThreeFormData>;
}

const CountrySelect = ({ form }: CountrySelectProps) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          form={form}
          name="companyPostalCode"
          label="Postal Code"
          placeholder="Enter postal code"
          className="text-[0.875rem]"
        />
        <FormInput
          form={form}
          name="companyPlace"
          label="City/Place"
          placeholder="Enter city/place"
          className="text-[0.875rem]"
        />
      </div>

      <FormField
        control={form.control}
        name="companyCountry"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[0.775rem]">Country</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CountrySelect;