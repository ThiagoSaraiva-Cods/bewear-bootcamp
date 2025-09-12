"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasket } from "lucide-react";

import { getCart } from "@/actions/get-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "../ui/button";
import { CartItem } from "./cart-item";

export const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasket />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 px-5">
          {cartIsLoading ? (
            <p>Carregando...</p>
          ) : (
            cart?.items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                productName={item.productVariant.product.name}
                productVariantImageUrl={item.productVariant.imageUrl}
                productVariantName={item.productVariant.name}
                quantity={item.quantity}
                productVariantPriceInCents={item.productVariant.priceInCents}
              />
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
