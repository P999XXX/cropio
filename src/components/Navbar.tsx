import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navItems = [
    { name: "Products", path: "/products" },
    { name: "Functions", path: "/functions" },
    { name: "Buyers", path: "/buyers" },
    { name: "Suppliers", path: "/suppliers" },
    { name: "FAQ", path: "/faq" },
  ];

  useEffect(() => {
    const generateLogo = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const response = await fetch('https://perkzwevnbmhbbdwwwaj.supabase.co/functions/v1/generate-logo', {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        
        const data = await response.json();
        if (data.data && data.data[0].url) {
          setLogoUrl(data.data[0].url);
        }
      } catch (error) {
        console.error('Error generating logo:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateLogo();
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-background border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              {isLoading ? (
                <Skeleton className="h-8 w-8 rounded-full" />
              ) : logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="Cropio Logo" 
                  className="h-8 w-8 object-contain"
                />
              ) : null}
              <span className="text-2xl font-geologica font-extrabold">
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