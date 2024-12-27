import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: Array<{ name: string; path: string; }>;
  userInitials: string;
}

export const MobileMenu = ({ isOpen, setIsOpen, navItems, userInitials }: MobileMenuProps) => {
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary focus:outline-none"
      >
        <Menu className="h-6 w-6" />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(false)}
        className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary focus:outline-none"
      >
        <X className="h-6 w-6" />
      </button>
      <div className="md:hidden animate-slide-in">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {!userInitials && (
            <Link
              to="/signin"
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90"
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