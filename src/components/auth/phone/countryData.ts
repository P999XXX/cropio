export interface CountryDigits {
  [key: string]: number;
}

export interface CountryExamples {
  [key: string]: string;
}

export const countryToDigits: CountryDigits = {
  "DE": 12, // Germany (including prefix 0) - can be up to 12 digits
  "AT": 13, // Austria (including prefix 0) - can be up to 13 digits
  "CH": 12, // Switzerland (including prefix 0) - can be up to 12 digits
  "GB": 12, // Great Britain (including prefix 0) - can be up to 12 digits
  "US": 11, // USA (including area code) - fixed at 11 digits
  "FR": 12, // France (including prefix 0) - can be up to 12 digits
  "IT": 13, // Italy (including prefix 0) - can be up to 13 digits
  "ES": 12, // Spain (including prefix 0) - can be up to 12 digits
  "NL": 12, // Netherlands (including prefix 0) - can be up to 12 digits
  "BE": 12, // Belgium (including prefix 0) - can be up to 12 digits
  "DK": 11, // Denmark (including prefix 0) - can be up to 11 digits
  "SE": 12, // Sweden (including prefix 0) - can be up to 12 digits
  "NO": 11, // Norway (including prefix 0) - can be up to 11 digits
  "FI": 12, // Finland (including prefix 0) - can be up to 12 digits
  "PL": 12, // Poland (including prefix 0) - can be up to 12 digits
  "CZ": 12, // Czech Republic (including prefix 0) - can be up to 12 digits
  "HU": 12, // Hungary (including prefix 0) - can be up to 12 digits
  "GR": 12, // Greece (including prefix 0) - can be up to 12 digits
  "PT": 12, // Portugal (including prefix 0) - can be up to 12 digits
  "IE": 12, // Ireland (including prefix 0) - can be up to 12 digits
  "LU": 12, // Luxembourg (including prefix 0) - can be up to 12 digits
  "RO": 12, // Romania (including prefix 0) - can be up to 12 digits
  "SK": 12, // Slovakia (including prefix 0) - can be up to 12 digits
  "SI": 12, // Slovenia (including prefix 0) - can be up to 12 digits
  "HR": 12, // Croatia (including prefix 0) - can be up to 12 digits
  "BG": 12, // Bulgaria (including prefix 0) - can be up to 12 digits
  "IS": 11, // Iceland (including prefix 0) - can be up to 11 digits
  "MT": 11, // Malta (including prefix 0) - can be up to 11 digits
  "CY": 11, // Cyprus (including prefix 0) - can be up to 11 digits
  "EE": 11, // Estonia (including prefix 0) - can be up to 11 digits
  "LV": 11, // Latvia (including prefix 0) - can be up to 11 digits
  "LT": 12, // Lithuania (including prefix 0) - can be up to 12 digits
};

export const countryToExample: CountryExamples = {
  "DE": "015123456789", // Germany
  "AT": "0664123456789", // Austria
  "CH": "079123456789", // Switzerland
  "GB": "079112345678", // Great Britain
  "US": "12125550123", // USA
  "FR": "061234567890", // France
  "IT": "0345123456789", // Italy
  "ES": "061234567890", // Spain
  "NL": "061234567890", // Netherlands
  "BE": "047012345678", // Belgium
  "DK": "02012345678", // Denmark
  "SE": "070123456789", // Sweden
  "NO": "04123456789", // Norway
  "FI": "040123456789", // Finland
  "PL": "051234567890", // Poland
  "CZ": "060123456789", // Czech Republic
  "HU": "020123456789", // Hungary
  "GR": "069123456789", // Greece
  "PT": "091234567890", // Portugal
  "IE": "087123456789", // Ireland
  "LU": "062123456789", // Luxembourg
  "RO": "071234567890", // Romania
  "SK": "091234567890", // Slovakia
  "SI": "031234567890", // Slovenia
  "HR": "091234567890", // Croatia
  "BG": "089712345678", // Bulgaria
  "IS": "06123456789", // Iceland
  "MT": "02123456789", // Malta
  "CY": "09612345678", // Cyprus
  "EE": "05123456789", // Estonia
  "LV": "02123456789", // Latvia
  "LT": "061234567890", // Lithuania
};