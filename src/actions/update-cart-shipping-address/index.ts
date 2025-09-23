"use server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "./schema";

export const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  updateCartShippingAddressSchema.parse(data);
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cartTable, { eq }) => eq(cartTable.userId, session.user.id),
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: (shippingAddressTable, { eq }) =>
      eq(shippingAddressTable.id, data.shippingAddressId) &&
      eq(shippingAddressTable.userId, session.user.id),
  });

  if (!shippingAddress) {
    throw new Error("Shipping address not found");
  }

  await db
    .update(cartTable)
    .set({
      shippingAddressId: data.shippingAddressId,
    })
    .where(eq(cartTable.id, cart.id));
};
