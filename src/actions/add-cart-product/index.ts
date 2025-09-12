import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddProductToCartSchema, addProductToCartSchema } from "./schema";

export const addProductToCart = async (data: AddProductToCartSchema) => {
  // Validar os dados de entrada
  addProductToCartSchema.parse(data);
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Validar se existe produto com esse id
  const productVariant = db.query.productVariantTable.findFirst({
    where: (productVariantTable, { eq }) =>
      eq(productVariantTable.id, data.productVariantId),
  });

  if (!productVariant) {
    throw new Error("Product variant not found");
  }

  // Validar se existe carrinho criado para o usuário
  const cart = await db.query.cartTable.findFirst({
    where: (cartTable, { eq }) => eq(cartTable.userId, session.user.id),
  });

  // Se não existir carrinho, criar um novo
  let cartId = cart?.id;
  if (!cartId) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();

    cartId = newCart.id;
  }

  // Validar se o produto já está no carrinho
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItemTable, { eq }) =>
      eq(cartItemTable.cartId, cartId) &&
      eq(cartItemTable.productVariantId, data.productVariantId),
  });

  // Se estiver, incrementar a quantidade do produto
  if (cartItem) {
    await db
      .update(cartItemTable)
      .set({
        quantity: cartItem.quantity + data.quantity,
      })
      .where(eq(cartItemTable.id, cartItem.id));
  }

  // Se não estiver, adicionar produto ao carrinho
  await db.insert(cartItemTable).values({
    cartId,
    productVariantId: data.productVariantId,
    quantity: data.quantity,
  });
};
