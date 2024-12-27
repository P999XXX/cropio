import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher";
import CurrencySwitcher from "../CurrencySwitcher";

interface NavActionsProps {
  isDark: boolean;
  onToggleTheme: () => void;
  userInitials: string;
}

export const NavActions = ({ isDark, onToggleTheme, userInitials }: NavActionsProps) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <LanguageSwitcher />
      <CurrencySwitcher />
      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      <UserMenu userInitials={userInitials} />
    </div>
  );
};