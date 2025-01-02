import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReactCountryFlag from "react-country-flag";

const languages = [
  { code: "en", name: "English", countryCode: "GB" },
  { code: "de", name: "Deutsch", countryCode: "DE" },
  { code: "es", name: "Español", countryCode: "ES" },
];

export const MobileMenuLanguage = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) setSelectedLang(savedLanguage);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode);
    localStorage.setItem("preferredLanguage", langCode);
    window.location.reload();
  };

  const selectedLanguage = languages.find(l => l.code === selectedLang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-secondary rounded-md text-sm">
          <ReactCountryFlag
            countryCode={selectedLanguage?.countryCode || "GB"}
            svg
            style={{
              width: '1.2em',
              height: '1.2em',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
          <span>{selectedLanguage?.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="text-sm"
          >
            <div className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode={lang.countryCode}
                svg
                style={{
                  width: '1.2em',
                  height: '1.2em',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid rgba(0,0,0,0.1)',
                }}
              />
              <span>{lang.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};