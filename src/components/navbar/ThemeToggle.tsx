import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface ThemeToggleProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const ThemeToggle = ({ isDark, onToggleTheme }: ThemeToggleProps) => {
  return (
    <Toggle
      variant="outline"
      size="sm"
      pressed={isDark}
      onPressedChange={onToggleTheme}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Toggle>
  );
};