import { allCountries } from 'libphonenumber-js';

export interface CountryOption {
  value: string;
  label: string;
  country: string;
}

// Create a map of country codes to their dial codes
const getCountryCallingCode = (country: string) => {
  try {
    const metadata = require('libphonenumber-js/metadata.min.json');
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