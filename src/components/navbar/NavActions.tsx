import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";
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
    <div className="hidden lg:flex items-center space-x-2">
      <LanguageSwitcher />
      <CurrencySwitcher />
      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      <UserMenu userInitials={userInitials} />
    </div>
  );
};