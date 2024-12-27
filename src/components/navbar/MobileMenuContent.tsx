import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { mainMenuItems, bottomMenuItems } from "../layouts/sidebar/menu-items";
import { Separator } from "@/components/ui/separator";

interface MobileMenuContentProps {
  isDashboard: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  onClose?: () => void;
}

export const MobileMenuContent = ({ isDashboard, isDark, onToggleTheme, onClose }: MobileMenuContentProps) => {
  const location = useLocation();
  
  if (!isDashboard) return null;

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

      <div className="space-y-1">
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