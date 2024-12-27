import { useState, createContext, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
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
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Globe className="h-4 w-4" />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="bg-background border shadow-lg fixed"
          sideOffset={8}
          style={{ 
            position: 'fixed',
            zIndex: 999,
            marginTop: '0.5rem',
            right: 'auto'
          }}
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="cursor-pointer hover:bg-muted"
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;