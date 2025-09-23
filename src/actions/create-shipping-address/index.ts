"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "./schema";

export const createShippingAddress = async (
  data: CreateShippingAddressSchema,
) => {
  createShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [shippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: data.fullName,
      city: data.city,
      state: data.state,
      street: data.street,
      number: data.number,
      complement: data.complement || null,
      zipCode: data.zipCode,
      cpfOrCnpj: data.cpfOrCnpj,
      neighborhood: data.neighborhood,
      email: data.email,
      phone: data.phone,
    })
    .returning();

  revalidatePath("/cart/identification");

  return shippingAddress;
};
