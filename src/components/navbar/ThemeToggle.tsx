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
      className="h-8 w-8 md:h-9 md:w-9 hover:bg-secondary/80"
    >
      {isDark ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Toggle>
  );
};