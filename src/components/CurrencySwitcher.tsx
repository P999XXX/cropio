import { useState, createContext, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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

const CurrencySwitcher = () => {
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
    <div className="relative inline-block">
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger asChild>
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-8 w-8 md:h-9 md:w-9 text-foreground hover:text-foreground"
          >
            <CurrentIcon className="h-4 w-4" />
            <span className="sr-only">Toggle currency</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent 
          align="end"
          className="w-[200px] p-2 bg-card text-card-foreground border-secondary shadow-lg dark:shadow-none"
          sideOffset={4}
          side="bottom"
          avoidCollisions={false}
        >
          <div className="space-y-2">
            {currencies.map((currency) => {
              const Icon = currency.icon;
              return (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency.code)}
                  className={`flex w-full items-center px-2 py-1.5 text-sm rounded-md transition-colors ${
                    selectedCurrency === currency.code 
                      ? 'bg-secondary text-foreground' 
                      : 'hover:bg-secondary/10 text-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {currency.name}
                </button>
              );
            })}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default CurrencySwitcher;