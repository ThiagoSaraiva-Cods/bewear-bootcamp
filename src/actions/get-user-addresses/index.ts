"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { auth } from "@/lib/auth";

export const getUserAddresses = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const addresses = await db.query.shippingAddressTable.findMany({
    where: (shippingAddressTable, { eq }) =>
      eq(shippingAddressTable.userId, session.user.id),
    orderBy: (shippingAddressTable, { desc }) => [
      desc(shippingAddressTable.createdAt),
    ],
  });

  return addresses;
};
