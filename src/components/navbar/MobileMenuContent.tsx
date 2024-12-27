import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { mainMenuItems, bottomMenuItems } from "../layouts/sidebar/menu-items";
import { MobileMenuCurrency } from "./MobileMenuCurrency";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactCountryFlag from "react-country-flag";
import { useToast } from "@/components/ui/use-toast";

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
  
  const handleLanguageChange = (langCode: string) => {
    const selectedLang = languages.find(l => l.code === langCode);
    localStorage.setItem("preferredLanguage", langCode);
    
    toast({
      title: "Language Changed",
      description: `Successfully switched to ${selectedLang?.name}`,
    });

    window.location.reload();
  };
  
  if (!isDashboard) return null;

  const currentLanguage = languages.find(l => l.code === (localStorage.getItem("preferredLanguage") || "en"));

  return (
    <div className="px-4 py-6 space-y-6">
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
        <Select onValueChange={handleLanguageChange} defaultValue={localStorage.getItem("preferredLanguage") || "en"}>
          <SelectTrigger className="w-full p-0 border-0 h-[34px] hover:bg-secondary rounded-md focus:ring-0">
            <div className="flex items-center gap-2 px-2 py-1.5 w-full text-sm">
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
            </div>
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
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
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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