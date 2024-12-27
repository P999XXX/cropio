import { useState, createContext, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "@/components/ui/use-toast";

export const LanguageContext = createContext({
  currentLanguage: "en",
  setLanguage: (lang: string) => {},
});

export const useLanguage = () => useContext(LanguageContext);

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export const LanguageSwitcher = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const { toast } = useToast();

  const handleLanguageChange = async (langCode: string) => {
    try {
      setSelectedLang(langCode);
      localStorage.setItem("preferredLanguage", langCode);
      
      toast({
        title: "Language Changed",
        description: `Successfully switched to ${languages.find(l => l.code === langCode)?.name}`,
      });

      window.location.reload();
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
    }
  }, []);

  return (
    <div className="relative inline-block">
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 font-medium uppercase">
            {selectedLang}
            <span className="sr-only">Toggle language</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent 
          align="end" 
          className="w-[200px] p-2 bg-muted animate-in zoom-in-95 duration-100"
          sideOffset={4}
          side="bottom"
          avoidCollisions={false}
        >
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex w-full items-center px-2 py-1.5 text-sm rounded-md ${
                  selectedLang === lang.code 
                    ? 'bg-accent text-accent-foreground' 
                    : ''
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
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