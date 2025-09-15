"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasket, ShoppingCart } from "lucide-react";

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
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
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

        <div className="flex h-full flex-col px-5 pb-5">
          {cart?.items && cart?.items.length === 0 && (
            <div className="flex flex-col items-center text-center">
              <ShoppingCart />
              <p className="text-lg font-medium">Seu carrinho está vazio.</p>
              <p className="text-muted-foreground text-sm">
                Adicione itens ao carrinho para continuar a compra.
              </p>
            </div>
          )}
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-8">
                {cart?.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productVariantId={item.productVariant.id}
                    productName={item.productVariant.product.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantName={item.productVariant.name}
                    quantity={item.quantity}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {cart?.items && cart?.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Total</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Button className="mt-5 rounded-full">Finalizar Compra</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
