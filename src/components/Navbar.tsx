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
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primary transform rotate-45">
                    <div className="w-2 h-2 bg-primary absolute -top-1 left-1/2 transform -translate-x-1/2 rounded-full"></div>
                  </div>
                </div>
              </div>
              <span className="text-xl font-geologica font-extrabold">
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