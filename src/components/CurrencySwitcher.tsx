import { useState, createContext, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DollarSign, EuroIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const CurrencyContext = createContext({
  currentCurrency: "USD",
  setCurrency: (currency: string) => {},
});

export const useCurrency = () => useContext(CurrencyContext);

const currencies = [
  { code: "USD", name: "US Dollar", icon: DollarSign },
  { code: "EUR", name: "Euro", icon: EuroIcon },
];

export const CurrencySwitcher = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const { toast } = useToast();

  const handleCurrencyChange = async (currencyCode: string) => {
    try {
      setSelectedCurrency(currencyCode);
      localStorage.setItem("preferredCurrency", currencyCode);
      
      toast({
        title: "Currency Changed",
        description: `Successfully switched to ${currencies.find(c => c.code === currencyCode)?.name}`,
      });
    } catch (error) {
      console.error("Error changing currency:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change currency. Please try again.",
      });
    }
  };

  useEffect(() => {
    const savedCurrency = localStorage.getItem("preferredCurrency");
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  const CurrentIcon = currencies.find(c => c.code === selectedCurrency)?.icon || DollarSign;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only">Toggle currency</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-background border shadow-lg"
        sideOffset={8}
        style={{ 
          position: 'absolute',
          zIndex: 100,
          marginTop: '0.5rem'
        }}
      >
        {currencies.map((currency) => {
          const Icon = currency.icon;
          return (
            <DropdownMenuItem
              key={currency.code}
              onClick={() => handleCurrencyChange(currency.code)}
              className="cursor-pointer hover:bg-muted"
            >
              <Icon className="mr-2 h-4 w-4" />
              {currency.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySwitcher;