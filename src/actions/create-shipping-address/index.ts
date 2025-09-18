"use server";

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
  // Validar os dados de entrada
  createShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Inserir o endereço no banco de dados
  const [newAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: data.recipientName,
      city: data.city,
      state: data.state,
      street: data.street,
      number: data.number,
      complement: data.complement || null,
      zipCode: data.zipCode,
      country: data.country,
      cpfOrCnpj: data.cpfOrCnpj,
      neighborhood: data.neighborhood,
      email: data.email,
      phone: data.phone,
    })
    .returning();

  return newAddress;
};
