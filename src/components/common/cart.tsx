"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/actions/get-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

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

        <div>
          {cartIsLoading ? (
            <p>Carregando...</p>
          ) : (
            cart?.items.map((item) => (
              <div key={item.id}>
                <Image
                  src={item.productVariant.imageUrl}
                  alt={item.productVariant.name}
                  width={100}
                  height={100}
                />
                <p>{item.productVariant.name}</p>
                <p>{formatCentsToBRL(item.productVariant.priceInCents)}</p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
