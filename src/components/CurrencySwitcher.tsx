import { useState, createContext, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  { code: "USD", name: "US Dollar", icon: DollarSign, symbol: "$" },
  { code: "EUR", name: "Euro", icon: EuroIcon, symbol: "€" },
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

  const currentCurrency = currencies.find(c => c.code === selectedCurrency);
  const CurrentIcon = currentCurrency?.icon || DollarSign;

  return (
    <div className="relative inline-block">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <CurrentIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle currency</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                alignOffset={0}
                className="w-[200px] p-2 z-[100]"
                forceMount
                sideOffset={8}
              >
                {currencies.map((currency) => {
                  const Icon = currency.icon;
                  return (
                    <DropdownMenuItem
                      key={currency.code}
                      onClick={() => handleCurrencyChange(currency.code)}
                      className="cursor-pointer"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {currency.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Current Currency</p>
            <p className="text-sm text-muted-foreground">
              <CurrentIcon className="inline-block h-4 w-4 mr-1" />
              {currentCurrency?.name} ({currentCurrency?.symbol})
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default CurrencySwitcher;