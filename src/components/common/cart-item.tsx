import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

export type CartItemProps = {
  id: string;
  productVariantImageUrl: string;
  productVariantName: string;
  productName: string;
  quantity: number;
  productVariantPriceInCents: number;
};

export const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[70px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              size="icon"
              variant="ghost"
              onClick={() => {}}
            >
              <MinusIcon />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-4 w-4"
              size="icon"
              variant="ghost"
              onClick={() => {}}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-1">
        <Button variant="outline" size="icon">
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};
