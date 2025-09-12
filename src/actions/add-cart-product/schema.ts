import z from "zod";

export const addProductToCartSchema = z.object({
  productVariantId: z.string().uuid(),
  quantity: z.number().int().min(1),
});

export type AddProductToCartSchema = z.infer<typeof addProductToCartSchema>;
