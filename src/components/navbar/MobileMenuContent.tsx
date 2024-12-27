import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { mainMenuItems, bottomMenuItems } from "../layouts/sidebar/menu-items";
import { MobileMenuCurrency } from "./MobileMenuCurrency";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReactCountryFlag from "react-country-flag";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

const languages = [
  { code: "en", name: "English", countryCode: "GB" },
  { code: "de", name: "Deutsch", countryCode: "DE" },
  { code: "es", name: "Español", countryCode: "ES" },
];

interface MobileMenuContentProps {
  isDashboard: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  onClose?: () => void;
}

export const MobileMenuContent = ({ isDashboard, isDark, onToggleTheme, onClose }: MobileMenuContentProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedLang, setSelectedLang] = useState("en");
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) setSelectedLang(savedLanguage);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode);
    localStorage.setItem("preferredLanguage", langCode);
    
    const selectedLang = languages.find(l => l.code === langCode);
    toast({
      title: "Language Changed",
      description: `Successfully switched to ${selectedLang?.name}`,
    });
    window.location.reload();
  };
  
  if (!isDashboard) return null;

  const currentLanguage = languages.find(l => l.code === selectedLang);

  return (
    <div className="px-4 py-6 space-y-6 lg:hidden">
      <div className="space-y-1">
        {mainMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm
                ${isActive ? 'bg-secondary' : 'hover:bg-secondary'}`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <Separator className="bg-border" />

      <div className="space-y-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-secondary rounded-md text-sm">
            <ReactCountryFlag
              countryCode={currentLanguage?.countryCode || "GB"}
              svg
              style={{
                width: '1.2em',
                height: '1.2em',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            />
            <span>{currentLanguage?.name}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="text-sm cursor-pointer"
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
        <MobileMenuCurrency />
        <button
          onClick={onToggleTheme}
          className="flex items-center gap-2 px-2 py-1.5 w-full rounded-md hover:bg-secondary text-sm"
        >
          {isDark ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>

      <Separator className="bg-border" />

      <div className="space-y-1">
        {bottomMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm
                ${isActive ? 'bg-secondary' : 'hover:bg-secondary'}`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};