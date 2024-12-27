import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { mainMenuItems, bottomMenuItems } from "../layouts/sidebar/menu-items";
import { MobileMenuLanguage } from "./MobileMenuLanguage";
import { MobileMenuCurrency } from "./MobileMenuCurrency";
import { Separator } from "@/components/ui/separator";

interface MobileMenuContentProps {
  isDashboard: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const MobileMenuContent = ({ isDashboard, isDark, onToggleTheme }: MobileMenuContentProps) => {
  if (!isDashboard) return null;

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="space-y-1">
        {mainMenuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary text-sm"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <Separator className="bg-border" />

      <div className="space-y-1">
        <MobileMenuLanguage />
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
        {bottomMenuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary text-sm"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};