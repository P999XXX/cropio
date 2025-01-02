import metadata from 'libphonenumber-js/metadata.min.json';

export interface CountryOption {
  value: string;
  label: string;
  country: string;
}

// Get all country codes from the metadata
const allCountries = Object.keys(metadata.countries);

// Create a map of country codes to their dial codes
const getCountryCallingCode = (country: string) => {
  try {
    return `+${metadata.countries[country][0]}`;
  } catch (error) {
    return '';
  }
};

// Generate the full list of countries
export const countries: CountryOption[] = allCountries.map(country => ({
  value: getCountryCallingCode(country),
  label: new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country,
  country: country,
})).filter(country => country.value !== '').sort((a, b) => a.label.localeCompare(b.label));