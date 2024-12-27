import { useState, useEffect } from "react";
import { DollarSign, EuroIcon, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const currencies = [
  { code: "USD", name: "US Dollar", icon: DollarSign },
  { code: "EUR", name: "Euro", icon: EuroIcon },
];

interface MobileMenuCurrencyProps {
  onClose?: () => void;
}

export const MobileMenuCurrency = ({ onClose }: MobileMenuCurrencyProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const { toast } = useToast();

  useEffect(() => {
    const savedCurrency = localStorage.getItem("preferredCurrency");
    if (savedCurrency) setSelectedCurrency(savedCurrency);
  }, []);

  const handleCurrencySwitch = () => {
    const newCurrency = selectedCurrency === "USD" ? "EUR" : "USD";
    setSelectedCurrency(newCurrency);
    localStorage.setItem("preferredCurrency", newCurrency);
    
    toast({
      title: "Currency Changed",
      description: `Successfully switched to ${currencies.find(c => c.code === newCurrency)?.name}`,
    });

    // Call the onClose prop to close the menu
    if (onClose) {
      onClose();
    }
  };

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);
  const CurrencyIcon = selectedCurrencyData?.icon || DollarSign;

  return (
    <button 
      onClick={handleCurrencySwitch}
      className="flex items-center justify-between gap-2 px-2 py-1.5 w-full text-left hover:bg-secondary rounded-md text-sm"
    >
      <div className="flex items-center gap-2">
        <CurrencyIcon className="h-4 w-4" />
        <span>{selectedCurrencyData?.name}</span>
      </div>
      <RefreshCw className="h-3 w-3" />
    </button>
  );
};