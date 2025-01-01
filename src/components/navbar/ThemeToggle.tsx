import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const ThemeToggle = ({ isDark, onToggleTheme }: ThemeToggleProps) => {
  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={onToggleTheme}
      className={`h-8 w-8 md:h-9 md:w-9 ${isDark ? 'dark:bg-background dark:text-white' : 'text-foreground hover:text-foreground'}`}
    >
      {isDark ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};