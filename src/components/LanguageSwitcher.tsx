import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import ReactCountryFlag from "react-country-flag";
import { useLanguage } from "@/contexts/LanguageContext";

const languages = [
  { code: "en", name: "English", countryCode: "GB" },
  { code: "de", name: "Deutsch", countryCode: "DE" },
  { code: "es", name: "Español", countryCode: "ES" },
];

export const LanguageSwitcher = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const { toast } = useToast();
  const { setLanguage } = useLanguage();

  const handleLanguageChange = async (langCode: string) => {
    try {
      setSelectedLang(langCode);
      setLanguage(langCode);
      localStorage.setItem("preferredLanguage", langCode);
      
      toast({
        title: "Language Changed",
        description: `Successfully switched to ${languages.find(l => l.code === langCode)?.name}`,
      });
    } catch (error) {
      console.error("Error changing language:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change language. Please try again.",
      });
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setSelectedLang(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  const selectedLanguage = languages.find(l => l.code === selectedLang);

  return (
    <div className="language-switcher">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 hover:bg-secondary hover:text-secondary-foreground transition-colors"
          >
            <ReactCountryFlag
              countryCode={selectedLanguage?.countryCode || "GB"}
              svg
              style={{
                width: '1.4em',
                height: '1.4em',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
              title={selectedLanguage?.name}
            />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-[200px] bg-popover"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer ${
                selectedLang === lang.code 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                  : 'hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              <ReactCountryFlag
                countryCode={lang.countryCode}
                svg
                style={{
                  width: '1.4em',
                  height: '1.4em',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid rgba(0,0,0,0.1)',
                }}
                title={lang.name}
              />
              <span>{lang.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;