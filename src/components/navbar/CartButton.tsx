import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CartButton = () => {
  return (
    <Button variant="ghost" size="icon" className="h-9 w-9">
      <ShoppingCart className="h-4 w-4" />
      <span className="sr-only">Shopping cart</span>
    </Button>
  );
};