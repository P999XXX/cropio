import { Link } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  name: string;
  path: string;
}

interface DesktopNavProps {
  navItems: NavItem[];
}

const DesktopNav = ({ navItems }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="text-foreground hover:text-primary transition-colors duration-200"
        >
          {item.name}
        </Link>
      ))}
      <LanguageSwitcher />
      <ThemeToggle />
      <Link
        to="/signin"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors duration-200"
      >
        Sign In
      </Link>
    </div>
  );
};

export default DesktopNav;