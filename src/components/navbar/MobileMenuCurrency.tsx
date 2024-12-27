import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DollarSign, EuroIcon } from "lucide-react";

const currencies = [
  { code: "USD", name: "US Dollar", icon: DollarSign },
  { code: "EUR", name: "Euro", icon: EuroIcon },
];

export const MobileMenuCurrency = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("preferredCurrency");
    if (savedCurrency) setSelectedCurrency(savedCurrency);
  }, []);

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    localStorage.setItem("preferredCurrency", currencyCode);
  };

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);
  const CurrencyIcon = selectedCurrencyData?.icon || DollarSign;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-1.5 w-full text-left hover:bg-secondary rounded-md text-sm">
          <CurrencyIcon className="h-4 w-4" />
          <span>{selectedCurrencyData?.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {currencies.map((currency) => {
          const Icon = currency.icon;
          return (
            <DropdownMenuItem
              key={currency.code}
              onClick={() => handleCurrencyChange(currency.code)}
              className="text-sm"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{currency.name}</span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};