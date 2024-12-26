import { useState } from "react";
import { Link } from "react-router-dom";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Products", path: "/products" },
    { name: "Functions", path: "/functions" },
    { name: "Buyers", path: "/buyers" },
    { name: "Suppliers", path: "/suppliers" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-6 h-6">
                {/* Leaf shape */}
                <div className="absolute inset-0 bg-primary rounded-tl-full rounded-br-full transform -rotate-45">
                  {/* Inner vein */}
                  <div className="absolute top-1/2 left-1/2 h-[1px] w-2/3 bg-background transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                </div>
                {/* Small circle representing a seed or dewdrop */}
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-background rounded-full"></div>
              </div>
              <span className="text-lg font-geologica font-semibold">
                cropio<span className="text-primary">.app</span>
              </span>
            </Link>
          </div>

          <DesktopNav navItems={navItems} />
          <MobileNav 
            navItems={navItems}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;