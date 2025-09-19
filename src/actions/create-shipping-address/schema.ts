import z from "zod";

export const createShippingAddressSchema = z.object({
  fullName: z.string().min(1, "Nome do destinatário é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  zipCode: z.string().min(8, "CEP deve ter 8 dígitos").max(9, "CEP inválido"),
  country: z.string().min(1, "País é obrigatório"),
  cpfOrCnpj: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(14, "CPF/CNPJ inválido"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  email: z.email("E-mail inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;