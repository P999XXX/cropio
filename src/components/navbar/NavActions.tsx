import { MessageSquare } from "lucide-react";
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
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <MessageSquare className="h-4 w-4" />
        <span className="sr-only">Open chat</span>
      </Button>
      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      <UserMenu userInitials={userInitials} />
    </div>
  );
};