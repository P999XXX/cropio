import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <Toggle
      variant="outline"
      size="sm"
      pressed={isDark}
      onPressedChange={onToggle}
      aria-label="Toggle dark mode"
      className="border-border"
    >
      {isDark ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Toggle>
  );
};