import { useState, createContext, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "@/components/ui/use-toast";
import ReactCountryFlag from "react-country-flag";

export const LanguageContext = createContext({
  currentLanguage: "en",
  setLanguage: (lang: string) => {},
});

export const useLanguage = () => useContext(LanguageContext);

const languages = [
  { code: "en", name: "English", countryCode: "GB" },
  { code: "de", name: "Deutsch", countryCode: "DE" },
  { code: "es", name: "Español", countryCode: "ES" },
];

export const LanguageSwitcher = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const { toast } = useToast();

  const handleLanguageChange = async (langCode: string) => {
    if (langCode === selectedLang) return; // Don't reload if same language

    try {
      setSelectedLang(langCode);
      localStorage.setItem("preferredLanguage", langCode);
      
      const langName = languages.find(l => l.code === langCode)?.name;
      toast({
        title: "Language Changed",
        description: `Successfully switched to ${langName}`,
        duration: 2000,
      });

      // Add a small delay before reload to show the toast
      setTimeout(() => {
        window.location.reload();
      }, 500);
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
    if (savedLanguage && languages.some(l => l.code === savedLanguage)) {
      setSelectedLang(savedLanguage);
    }
  }, []);

  const selectedCountry = languages.find(l => l.code === selectedLang)?.countryCode || "GB";

  return (
    <div className="relative inline-block language-switcher">
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 hover:bg-secondary hover:text-secondary-foreground transition-colors"
          >
            <ReactCountryFlag
              countryCode={selectedCountry}
              svg
              style={{
                width: '1.4em',
                height: '1.4em',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
              title={languages.find(l => l.code === selectedLang)?.name}
            />
            <span className="sr-only">Toggle language</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent 
          align="end" 
          className="w-[200px] p-2 bg-background border border-border shadow-lg dark:shadow-none animate-in zoom-in-95 duration-100"
          sideOffset={4}
          side="bottom"
        >
          <div className="space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex w-full items-center px-2 py-1.5 text-sm rounded-md transition-colors ${
                  selectedLang === lang.code 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-secondary hover:text-secondary-foreground'
                }`}
              >
                <span className="mr-2">
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
                </span>
                {lang.name}
              </button>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default LanguageSwitcher;