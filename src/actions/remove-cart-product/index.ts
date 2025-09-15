"use server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { removeCartProductSchema } from "./schema";

export const removeProductFromCart = async (
  data: z.infer<typeof removeCartProductSchema>,
) => {
  // Validar os dados de entrada
  removeCartProductSchema.parse(data);
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Validar se o produto já está no carrinho
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  });

  const cartBelongsToUser = cartItem?.cart.userId !== session.user.id;

  if (cartBelongsToUser) {
    throw new Error("Unauthorized");
  }

  if (!cartItem) {
    throw new Error("cart item not found in cart");
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
};
