import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: Array<{ name: string; path: string; }>;
  userInitials: string;
}

export const MobileMenu = ({ isOpen, setIsOpen, navItems, userInitials }: MobileMenuProps) => {
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="icon"
        className="h-9 w-9"
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(false)}
        variant="ghost"
        size="icon"
        className="h-9 w-9"
      >
        <X className="h-5 w-5" />
      </Button>
      <div className="absolute top-[calc(100%+1px)] left-0 right-0 bg-background border-b border-border animate-slide-in">
        <div className="p-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block w-full px-4 py-2 text-sm rounded-md text-foreground hover:text-primary hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {!userInitials && (
            <Link
              to="/signin"
              className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
};